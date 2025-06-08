import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Divider, Grid, Stack, Typography, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import { LabelStyle } from 'src/components/common/FormLabel';
import { FormProvider, RHFEditor, RHFTextField, RHFUploadMultiFile } from 'src/components/hook-form';
import MultiFilePreview from 'src/components/upload/MultiFilePreview';
import { getMedia, uploadMedia } from 'src/services/media-api';
import { useUpdateProjectMutation } from 'src/services/project-api';
import * as Yup from 'yup';
import { MEDIA_USAGE } from 'src/constants/media-usage';

const PorjectUpdateSchema = Yup.object().shape({
  name: Yup.string().required(),
  owner: Yup.string().required(),
  projectDate: Yup.string().required(),
  quote: Yup.string().required(),
  result: Yup.string().required(),
  fullDescription: Yup.string().required(),
  shortDescription: Yup.string().required(),
  workArea: Yup.string().required(),
  projectInclude: Yup.string().required(),
  roadmap: Yup.string().required(),
  slidesFiles: Yup.array(Yup.string()).required(),
});

export const ProjectUpdateForm = () => {
  const { projectID } = useParams();
  const { state } = useLocation();
  const [isUploadingSlides, setIsUploadingSlides] = useState(false);
  const [_slides, setSlides] = useState(state?.original?.slides);

  const defaultValues = useMemo(
    () => ({
      fullDescription: state?.original?.fullDescription,
      name: state?.original?.name,
      owner: state?.original?.owner,
      projectDate: state?.original?.projectDate,
      projectInclude: state?.original?.projectInclude,
      quote: state?.original?.quote,
      result: state?.original?.result,
      roadmap: state?.original?.roadmap,
      shortDescription: state?.original?.shortDescription,
      workArea: state?.original?.workArea,
      slides: state?.original?.slides,
      slidesFiles: [],
    }),
    []
  );
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({ defaultValues, resolver: yupResolver(PorjectUpdateSchema) });
  const { handleSubmit, reset, setValue, getValues } = methods;

  const navigate = useNavigate();
  const [updateProject, { isLoading: isUpdateProjectLoading }] = useUpdateProjectMutation();

  const handleUploadAllSlides = async () => {
    try {
      const slides = getValues().slidesFiles;
      slides.forEach(async (slide, index) => {
        setIsUploadingSlides(true);
        const body = new FormData();
        body.append('useCase', MEDIA_USAGE.projectImage);
        body.append('image', getValues().slidesFiles[index]);
        const response = await uploadMedia(body);
        setSlides((s) => [...s, response?.media?.hash]);
        enqueueSnackbar('uploaded successfully', { variant: 'success' });
      });
    } catch (error) {
      enqueueSnackbar('failed to upload', { variant: 'error' });
      setSlides((s) => []);
      console.log('UPLOAD MEDIA ERROR: ', error);
    } finally {
      setIsUploadingSlides(false);
    }
  };
  const handleDrop = useCallback(
    async (acceptedFiles) => {
      setValue(
        'slidesFiles',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  function handleRemoveAll() {
    setValue('slidesFiles', []);
  }
  function handleRemoveAllSlide() {
    setSlides([]);
  }
  function handleRemoveSlide(file) {
    setSlides((s) => s?.filter((_file) => !file.includes(_file)));
  }
  function handleRemove(file) {
    const filteredItems = values.slides?.filter((_file) => _file !== file);
    setValue('slidesFiles', filteredItems);
  }
  async function onSubmit(values) {
    try {
      const body = { projectID, ...values, slidesFiles: undefined, slides: _slides };
      console.log(body);
      await updateProject(body).unwrap();
      navigate('/dashboard/project/list');
      enqueueSnackbar('Project upated succesfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to update project', { variant: 'error' });
      console.log('UPDATE PROJECT ERROR : ', error);
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'name'} label="Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'owner'} label="Owner" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'workArea'} label="Work Area" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'quote'} label="Quote" />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name={'result'} label="Result" multiline minRows={5} />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name={'roadmap'} label="Roadmap" multiline minRows={5} />
              </Grid>
              <Grid item xs={12}>
                {/* TODO: fix Date picker */}
                <DatePicker
                  label="Project Date"
                  value={dayjs(getValues().projectDate)}
                  onChange={(e) => {
                    setValue('projectDate', new Date(e).toISOString());
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <LabelStyle>Project include</LabelStyle>
                <RHFEditor name={'projectInclude'} mediaUsage={MEDIA_USAGE.projectImage} />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField name={'shortDescription'} label="Short Description" />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField name={'fullDescription'} label="Full Description" multiline minRows={5} />
              </Grid>
              <Grid item xs={12} md={12}>
                <Divider>Slides</Divider>
              </Grid>
              <Grid item xs={12}>
                <RHFUploadMultiFile
                  name="slidesFiles"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  onUploadAll={handleUploadAllSlides}
                  loading={isUploadingSlides}
                />
                <Divider sx={{ my: 3 }}>Uploaded Slides</Divider>

                <MultiFilePreview
                  files={_slides.map((slide) => getMedia(slide))}
                  showPreview={true}
                  onRemove={handleRemoveSlide}
                  onRemoveAll={handleRemoveAllSlide}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack>
              <LoadingButton type="submit" variant="contained" size="lg" loading={isUpdateProjectLoading}>
                Update Project
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
