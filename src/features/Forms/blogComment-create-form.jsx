import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'src/components/hook-form';

const defaultValues = {
  name: '',
};

export const BlogCommentCreateForm = () => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  function onSubmit() {}

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}></Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </FormProvider>
  );
};
