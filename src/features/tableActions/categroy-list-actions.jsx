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
import { useRemoveCategoryMutation } from 'src/services/category-api';
import { enqueueSnackbar } from 'notistack';

export const CategoryListActions = (props) => {
  const { original } = props;
  const navigate = useNavigate();
  const [openRemoveCategoryModal, setOpenRemoveCategoryModal] = useState(false);

  const [
    removeCategory,
    {
      isLoading: isRemoveCategoryLoading,
      isSuccess: isRemoveCategorySuccess,
      isError: isRemoveCategoryError,
      error: removeCategoryError,
    },
  ] = useRemoveCategoryMutation();

  function handleNavigateToCategoryUpdate() {
    navigate(`/dashboard/category/update/${original._id}`, { state: { original } });
  }

  function handleOpenRemoveCategoryModal() {
    setOpenRemoveCategoryModal(true);
  }
  function handleCloseRemoveCategoryModal() {
    setOpenRemoveCategoryModal(false);
  }
  function handleRemoveCategory() {
    const body = { categoryID: original?._id };
    removeCategory(body);
  }

  useEffect(() => {
    if (isRemoveCategorySuccess) {
      enqueueSnackbar('Category removed successfully', { variant: 'success' });
      handleCloseRemoveCategoryModal();
    }
  }, [isRemoveCategorySuccess]);
  useEffect(() => {
    if (isRemoveCategoryError) {
      console.log({ removeCategoryError });
      enqueueSnackbar('failed to remove category', { variant: 'error' });
    }
  }, [isRemoveCategoryError]);

  return (
    <>
      <TableMoreAction>
        <MenuList sx={{ p: 0 }}>
          <MenuItem onClick={handleNavigateToCategoryUpdate}>
            <ListItemIcon>
              <FiEdit />
            </ListItemIcon>
            <ListItemText primary="Update" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleOpenRemoveCategoryModal} sx={{ color: (theme) => theme.palette.error.main }}>
            <ListItemIcon>
              <FiTrash2 />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </MenuList>
      </TableMoreAction>

      <Dialog open={openRemoveCategoryModal} onClose={handleCloseRemoveCategoryModal}>
        <DialogTitle>Are you sure to remove ( {original?.title} ) category?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You cant restore this category later</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          size="medium"
            variant="outlined"
            onClick={handleCloseRemoveCategoryModal}
            disabled={isRemoveCategoryLoading}
          >
            No
          </Button>

          <LoadingButton
            variant="contained"
            size="medium"
            onClick={handleRemoveCategory}
            loading={isRemoveCategoryLoading}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
