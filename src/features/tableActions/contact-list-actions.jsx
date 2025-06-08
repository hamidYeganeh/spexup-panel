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
import { useRemoveContactMutation } from 'src/services/contact-api';
import { enqueueSnackbar } from 'notistack';

export const ContactListActions = (props) => {
  const { original } = props;
  const navigate = useNavigate();
  const [openRemoveContactModal, setOpenRemoveContactModal] = useState(false);

  const [removeContact, { isLoading: isRemoveContactLoading }] = useRemoveContactMutation();

  function handleNavigateToContactUpdate() {
    navigate(`/dashboard/contact/update/${original._id}`, { state: { original } });
  }
  function handleOpenRemoveContactModal() {
    setOpenRemoveContactModal(true);
  }
  function handleCloseRemoveContactModal() {
    setOpenRemoveContactModal(false);
  }
  async function handleRemoveContact() {
    try {
      const body = { contactID: original?._id };
      await removeContact(body);
      enqueueSnackbar('Contact removed successfully', { variant: 'success' });
      handleCloseRemoveContactModal();
    } catch (error) {
      console.log('REMOVE CONTACT ERROR: ', error);
      enqueueSnackbar('failed to remove contact', { variant: 'error' });
    }
  }

  return (
    <>
      <TableMoreAction>
        <MenuList sx={{ p: 0 }}>
          <MenuItem onClick={handleNavigateToContactUpdate}>
            <ListItemIcon>
              <FiEdit />
            </ListItemIcon>
            <ListItemText primary="Update" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleOpenRemoveContactModal} sx={{ color: (theme) => theme.palette.error.main }}>
            <ListItemIcon>
              <FiTrash2 />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </MenuList>
      </TableMoreAction>

      <Dialog open={openRemoveContactModal} onClose={handleCloseRemoveContactModal}>
        <DialogTitle>Are you sure to remove ( {original?.name} ) contact?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You cant restore this contact later</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="medium"
            variant="outlined"
            onClick={handleCloseRemoveContactModal}
            disabled={isRemoveContactLoading}
          >
            No
          </Button>

          <LoadingButton
            variant="contained"
            size="medium"
            onClick={handleRemoveContact}
            loading={isRemoveContactLoading}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
