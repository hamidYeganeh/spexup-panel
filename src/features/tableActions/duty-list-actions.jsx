import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { TableMoreAction } from 'src/components/Table/TableMoreActions';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRemoveDutyMutation } from 'src/services/duty-api';
import { enqueueSnackbar } from 'notistack';

export const DutyListActions = (props) => {
  const { original } = props;
  const navigate = useNavigate();
  const [openRemoveDutyModal, setOpenRemoveDutyModal] = useState(false);

  const [removeDuty, { isLoading: isRemoveDutyLoading }] = useRemoveDutyMutation();

  function handleNavigateToDutyUpdate() {
    navigate(`/dashboard/duty/update/${original._id}`, { state: { original } });
  }

  function handleOpenRemoveDutyModal() {
    setOpenRemoveDutyModal(true);
  }
  function handleCloseRemoveDutyModal() {
    setOpenRemoveDutyModal(false);
  }
  async function handleRemoveDuty() {
    try {
      const body = { dutyID: original?._id };
      await removeDuty(body);
      enqueueSnackbar('Duty removed successfully', { variant: 'success' });
      handleCloseRemoveDutyModal();
    } catch (error) {
      console.log('REMOVE DUTY ERROR: ', error);
      enqueueSnackbar('failed to remove duty', { variant: 'error' });
    }
  }

  return (
    <>
      <TableMoreAction>
        <MenuList sx={{ p: 0 }}>
          <MenuItem onClick={handleNavigateToDutyUpdate}>
            <ListItemIcon>
              <FiEdit />
            </ListItemIcon>
            <ListItemText primary="Update" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleOpenRemoveDutyModal} sx={{ color: (theme) => theme.palette.error.main }}>
            <ListItemIcon>
              <FiTrash2 />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </MenuList>
      </TableMoreAction>

      <Dialog open={openRemoveDutyModal} onClose={handleCloseRemoveDutyModal}>
        <DialogTitle>Are you sure to remove ( {original?.title} ) duty?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You cant restore this duty later</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="medium" variant="outlined" onClick={handleCloseRemoveDutyModal} disabled={isRemoveDutyLoading}>
            No
          </Button>

          <LoadingButton variant="contained" size="medium" onClick={handleRemoveDuty} loading={isRemoveDutyLoading}>
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
