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
import { FaRegCommentDots } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRemoveBlogMutation } from 'src/services/blog-api';
import { enqueueSnackbar } from 'notistack';

export const BlogListActions = (props) => {
  const { original } = props;
  const navigate = useNavigate();
  const [openRemoveBlogModal, setOpenRemoveBlogModal] = useState(false);

  const [
    removeBlog,
    {
      isLoading: isRemoveBlogLoading,
      isSuccess: isRemoveBlogSuccess,
      isError: isRemoveBlogError,
      error: removeBlogError,
    },
  ] = useRemoveBlogMutation();

  function handleNavigateToBlogUpdate() {
    navigate(`/dashboard/blog/update/${original._id}`, { state: { original } });
  }
  function handleNavigateToBlogComments() {
    navigate(`/dashboard/blog-comment/list/${original._id}`, { state: { original } });
  }

  function handleOpenRemoveBlogModal() {
    setOpenRemoveBlogModal(true);
  }
  function handleCloseRemoveBlogModal() {
    setOpenRemoveBlogModal(false);
  }
  function handleRemoveBlog() {
    const body = { blogID: original?._id };
    removeBlog(body);
  }

  useEffect(() => {
    if (isRemoveBlogSuccess) {
      enqueueSnackbar('Blog removed successfully', { variant: 'success' });
      handleCloseRemoveBlogModal();
    }
  }, [isRemoveBlogSuccess]);
  useEffect(() => {
    if (isRemoveBlogError) {
      console.log({ removeBlogError });
      enqueueSnackbar('failed to remove blog', { variant: 'error' });
    }
  }, [isRemoveBlogError]);

  return (
    <>
      <TableMoreAction>
        <MenuList sx={{ p: 0 }}>
          <MenuItem onClick={handleNavigateToBlogComments}>
            <ListItemIcon>
              <FaRegCommentDots />
            </ListItemIcon>
            <ListItemText primary="Comments" />
          </MenuItem>
          <MenuItem onClick={handleNavigateToBlogUpdate}>
            <ListItemIcon>
              <FiEdit />
            </ListItemIcon>
            <ListItemText primary="Update" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleOpenRemoveBlogModal} sx={{ color: (theme) => theme.palette.error.main }}>
            <ListItemIcon>
              <FiTrash2 />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </MenuList>
      </TableMoreAction>

      <Dialog open={openRemoveBlogModal} onClose={handleCloseRemoveBlogModal}>
        <DialogTitle>Are you sure to remove ( {original?.title} ) blog?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You cant restore this blog later</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="medium" variant="outlined" onClick={handleCloseRemoveBlogModal} disabled={isRemoveBlogLoading}>
            No
          </Button>

          <LoadingButton variant="contained" size="medium" onClick={handleRemoveBlog} loading={isRemoveBlogLoading}>
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
