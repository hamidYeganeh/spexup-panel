import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useCreateCategoryMutation } from 'src/services/category-api';
import * as Yup from 'yup';

export const CategoryCreateForm = () => {
  const CategoryCreateSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const defaultValues = {
    title: '',
  };

  const navigate = useNavigate();
  const [createCategory, { isLoading: isCreateCategoryLoading }] = useCreateCategoryMutation();
  const methods = useForm({
    resolver: yupResolver(CategoryCreateSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  async function onSubmit(values) {
    try {
      await createCategory(values).unwrap();
      enqueueSnackbar('Category created successfully', { variant: 'success' });
      navigate('/dashboard/category/list');
    } catch (error) {
      console.log('CREATE CATEGORY ERROR: ', error);
      enqueueSnackbar('failed to create category', { variant: 'error' });
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Grid container>
              <Grid item xs={12}>
                <RHFTextField name={'title'} label="Title" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isCreateCategoryLoading}>
                Create
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
