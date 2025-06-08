import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../components/hook-form';

export function ContentForm() {
  const defaultValues = {};
  const methods = useForm({
    defaultValues,
    // resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  function handleOnSubmit(values) {}
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleOnSubmit)}>
      <RHFTextField name="title" />
    </FormProvider>
  );
}
