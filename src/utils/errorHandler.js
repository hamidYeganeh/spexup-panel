import { enqueueSnackbar } from 'notistack';

export const globalErrorHandler = (error) => {
  if (error?.data === 'Access Error!' && error?.originalStatus === 403) {
    enqueueSnackbar('Access error', { variant: 'error' });
  } else {
    enqueueSnackbar('Something went wrong', { variant: 'error' });
  }
};
