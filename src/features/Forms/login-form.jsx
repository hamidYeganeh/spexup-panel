import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useAuth } from 'src/hooks/useAuth';
import { useLoginRequestMutation } from 'src/services/auth-api';

export const LoginForm = () => {
  const defaultValues =
    process.env.NODE_ENV === 'development'
      ? { username: 'eesssn', password: 'aliREZA19139675' }
      : { username: '', password: '' };

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [login, { isLoading: isLoginLoading }] = useLoginRequestMutation();
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  async function onSubmit(values) {
    try {
      const response = await login(values).unwrap();
      await authLogin(response);
      navigate('/');
    } catch (error) {
      console.log({ error });
      if (error?.data?.key === 'err.user.authLoginWrongCredentials') {
        enqueueSnackbar(error?.data?.message, { variant: 'error' });
      } else if (error?.data?.key === 'err.badRequest') {
        enqueueSnackbar(error?.data?.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to login', { variant: 'error' });
      }
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RHFTextField name={'username'} label="Username" />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name={'password'} label="Password" password />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isLoginLoading}>
              Login
            </LoadingButton>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
};
