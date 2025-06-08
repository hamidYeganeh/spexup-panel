import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useUpdateCategoryMutation } from 'src/services/category-api';
import * as Yup from 'yup';

const CategoryUpdateSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

export const CategoryUpdateForm = () => {
  const { categoryID } = useParams();
  const { state } = useLocation();

  const defaultValues = useMemo(
    () => ({
      title: state?.original?.title,
    }),
    [state]
  );

  const navigate = useNavigate();
  const [updateCategory, { isLoading: isUpdateCategoryLoading }] = useUpdateCategoryMutation();
  const methods = useForm({
    resolver: yupResolver(CategoryUpdateSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  async function onSubmit(values) {
    try {
      const body = {
        title: values.title,
        categoryID,
      };
      await updateCategory(body).unwrap();
      enqueueSnackbar('Category updated successfully', { variant: 'success' });
      navigate('/dashboard/category/list');
    } catch (error) {
      console.log('CATEGORY UPDATE ERROR: ', error);
      enqueueSnackbar('failed to update category', { variant: 'error' });
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
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isUpdateCategoryLoading}>
                Update
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
