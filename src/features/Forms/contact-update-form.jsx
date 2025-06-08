import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, MenuItem, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import { parsePath } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useUpdateContactMutation } from 'src/services/contact-api';
import * as Yup from 'yup';

const STATUS_OPTIONS = [1, 2, 3];

export const ContactUpdateForm = () => {
  const { contactID } = useParams();
  const { state } = useLocation();

  const defaultValues = useMemo(
    () => ({
      status: state?.original?.status,
      name: state?.original?.name,
      phone: state?.original?.phone,
      email: state?.original?.email,
      message: state?.original?.message,
    }),
    [state]
  );

  const ContactUpdateSchema = Yup.object().shape({
    status: Yup.number().required(),
  });

  const navigate = useNavigate();
  const [updateContact, { isLoading: isUpdateContactLoading }] = useUpdateContactMutation();
  const methods = useForm({ defaultValues, resolver: yupResolver(ContactUpdateSchema) });
  const { handleSubmit } = methods;

  async function onSubmit(values) {
    try {
      const body = {
        status: values.status,
        contactID,
      };
      await updateContact(body);
      enqueueSnackbar('Contact  updated  successfully', { variant: 'success' });
      navigate('/dashboard/contact/list');
    } catch (error) {
      console.log('UPDATE CONTACT ERROR: ', error);
      enqueueSnackbar('Failed to update contact', { variant: 'error' });
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'name'} label={'Name'} disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'email'} label={'Email'} disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'phone'} label={'Phone'} disabled />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField name={'message'} label={'Message'} disabled multiline minRows={5} />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFSelect name="status" SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}>
                  {STATUS_OPTIONS.map((size) => (
                    <MenuItem
                      key={size}
                      value={size}
                      sx={{
                        mx: 1,
                        borderRadius: 0.75,
                        typography: 'body2',
                        color: 'text.secondary',
                      }}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack>
              <LoadingButton type="submit" variant="contained" size="large" loading={isUpdateContactLoading}>
                Update Contact
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
