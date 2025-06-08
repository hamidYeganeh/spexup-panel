import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Divider, Grid, Stack, Typography, styled } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import { LabelStyle } from 'src/components/common/FormLabel';
import { FormProvider, RHFEditor, RHFTextField, RHFUploadSingleFile } from 'src/components/hook-form';
import { MEDIA_USAGE } from 'src/constants/media-usage';
import { useUpdateDutyMutation } from 'src/services/duty-api';
import { getMedia, uploadMedia } from 'src/services/media-api';
import * as Yup from 'yup';

const DutyUpdateSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  icon: Yup.string().required('Icon is required'),
});

export const DutyUpdateForm = () => {
  const { dutyID } = useParams();
  const { state } = useLocation();
  const [isUploadingHeroImage, setIsUploadingHeroImage] = useState(false);

  const defaultValues = useMemo(
    () => ({
      content: state?.original?.content,
      heroImage: state?.original?.heroImage,
      heroImageFile: getMedia(state?.original?.heroImage),
      title: state?.original?.title,
      dutyProcess: state?.original?.dutyProcess,
      icon: state?.original?.icon,
    }),
    [state]
  );

  const navigate = useNavigate();
  const [updateDuty, { isLoading: isUpdateDutyLoading }] = useUpdateDutyMutation();
  const methods = useForm({
    resolver: yupResolver(DutyUpdateSchema),
    defaultValues,
  });
  const { append, remove, fields } = useFieldArray({
    control: methods.control,
    name: 'dutyProcess',
  });
  const { handleSubmit, setValue, getValues } = methods;

  function handleAppendField() {
    append({ content: '', title: '', id: Math.random() });
  }
  async function handleUpload() {
    setIsUploadingHeroImage(true);
    try {
      const body = new FormData();
      body.append('useCase', MEDIA_USAGE.dutyImage);
      body.append('image', getValues().heroImageFile);
      const response = await uploadMedia(body);
      setValue('heroImage', response?.media?.hash);
      setValue('heroImageFile', getMedia(response?.media?.hash));
      enqueueSnackbar('uploaded successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('failed to upload', { variant: 'error' });
      setValue('heroImageFile', '');
      setValue('heroImage', '');
      console.log('UPLOAD MEDIA ERROR: ', error);
    } finally {
      setIsUploadingHeroImage(false);
    }
  }
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'heroImageFile',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        handleUpload();
      }
    },
    [setValue]
  );
  async function onSubmit(values) {
    try {
      const body = { ...values, heroImageFile: undefined, dutyID };
      await updateDuty(body).unwrap();
      enqueueSnackbar('Duty updated successfully', { variant: 'success' });
      navigate('/dashboard/duty/list');
    } catch (error) {
      console.log('CREATE DUTY ERROR: ', error);
      enqueueSnackbar('failed to update duty', { variant: 'error' });
    }
  }

  console.log(methods.watch());

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RHFTextField name={'title'} label="Title" />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name={'icon'} label="Icon" />
              </Grid>
              <Grid item xs={12}>
                <LabelStyle>Content</LabelStyle>
                <RHFEditor name={'content'} label="Content" mediaUsage={MEDIA_USAGE.blogImage} />
              </Grid>
              <Grid item xs={12}>
                <Divider>Duty Process</Divider>
              </Grid>
              {fields.map((field, index) => {
                return (
                  <Grid item xs={12}>
                    <Grid key={field.id} container spacing={3}>
                      <Grid item xs={12}>
                        <Button color="error" variant="outlined" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField name={`dutyProcess[${index}].title`} label={'Title'} />
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField name={`dutyProcess[${index}].content`} label={'Content'} multiline minRows={5} />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <Button color="success" variant="contained" fullWidth onClick={handleAppendField}>
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <LabelStyle>Hero Image</LabelStyle>
                  <RHFUploadSingleFile
                    name="heroImageFile"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    loading={isUploadingHeroImage}
                  />
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isUpdateDutyLoading}>
                Update
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
