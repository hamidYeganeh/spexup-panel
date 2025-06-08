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
import { useRemoveProjectMutation } from 'src/services/project-api';
import { enqueueSnackbar } from 'notistack';

export const ProjectListActions = (props) => {
  const { original } = props;
  const navigate = useNavigate();
  const [openRemoveProjectModal, setOpenRemoveProjectModal] = useState(false);

  const [
    removeProject,
    {
      isLoading: isRemoveProjectLoading,
      isSuccess: isRemoveProjectSuccess,
      isError: isRemoveProjectError,
      error: removeProjectError,
    },
  ] = useRemoveProjectMutation();

  function handleNavigateToProjectUpdate() {
    navigate(`/dashboard/project/update/${original._id}`, { state: { original } });
  }

  function handleOpenRemoveProjectModal() {
    setOpenRemoveProjectModal(true);
  }
  function handleCloseRemoveProjectModal() {
    setOpenRemoveProjectModal(false);
  }
  function handleRemoveProject() {
    const body = { projectID: original?._id };
    removeProject(body);
  }

  useEffect(() => {
    if (isRemoveProjectSuccess) {
      enqueueSnackbar('Project removed successfully', { variant: 'success' });
      handleCloseRemoveProjectModal();
    }
  }, [isRemoveProjectSuccess]);
  useEffect(() => {
    if (isRemoveProjectError) {
      console.log({ removeProjectError });
      enqueueSnackbar('failed to remove project', { variant: 'error' });
    }
  }, [isRemoveProjectError]);

  return (
    <>
      <TableMoreAction>
        <MenuList sx={{ p: 0 }}>
          <MenuItem onClick={handleNavigateToProjectUpdate}>
            <ListItemIcon>
              <FiEdit />
            </ListItemIcon>
            <ListItemText primary="Update" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleOpenRemoveProjectModal} sx={{ color: (theme) => theme.palette.error.main }}>
            <ListItemIcon>
              <FiTrash2 />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </MenuList>
      </TableMoreAction>

      <Dialog open={openRemoveProjectModal} onClose={handleCloseRemoveProjectModal}>
        <DialogTitle>Are you sure to remove ( {original?.name} ) project?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You cant restore this project later</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="medium"
            variant="outlined"
            onClick={handleCloseRemoveProjectModal}
            disabled={isRemoveProjectLoading}
          >
            No
          </Button>

          <LoadingButton
            variant="contained"
            size="medium"
            onClick={handleRemoveProject}
            loading={isRemoveProjectLoading}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
