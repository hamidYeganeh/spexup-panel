import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete } from '@mui/material';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from 'src/components/hook-form';
import { useBlogListQuery, useUpdateBlogMutation } from 'src/services/blog-api';
import { getMedia, uploadMedia } from 'src/services/media-api';
import { BlogStatus } from 'src/constants/status';
import { useCategoryListQuery } from 'src/services/category-api';
import { LabelStyle } from 'src/components/common/FormLabel';
import { MEDIA_USAGE } from 'src/constants/media-usage';
//

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Art',
  'Music',
  'Nature',
  'Health',
  'Galaxy',
  'Creative',
  'Art',
  'Business',
  'Space',
  'Biology',
  'Environemnt',
];

const STATUS_OPTIONS = BlogStatus;

const BlogUpdateSchema = Yup.object().shape({
  title: Yup.string().required(),
  heroImage: Yup.string().required(),
  heroImageFile: Yup.string().required(),
  status: Yup.number().required(),
  content: Yup.string().required(),
  tag: Yup.array(Yup.string()).required(),
});

export const BlogUpdateForm = () => {
  const { blogID } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isUploadingHeroImage, setIsUploadingHeroImage] = useState(false);
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const [updateBlog, { isLoading: isUpdateBlogLoading }] = useUpdateBlogMutation();
  const { data, isLoading } = useCategoryListQuery({ page: 1, limit: 1000000 });
  const { data: blogsData, isLoading: isBlogsLoading } = useBlogListQuery({ page: 1, limit: 100000 });

  const defaultValues = useMemo(
    () => ({
      category: state?.original?.category,
      content: state?.original?.content,
      heroImage: state?.original?.heroImage,
      heroImageFile: getMedia(state?.original?.heroImage),
      status: state?.original?.status,
      tag: state?.original?.tag,
      title: state?.original?.title,
      nextBlogs: state?.original?.nextBlogs?.map(({ title, _id }) => ({ value: _id, label: title })),
      previousBlogs: state?.original?.previousBlogs?.map(({ title, _id }) => ({ value: _id, label: title })),
      likes: state?.original?.likes,
      readTime: state?.original?.readTime,
    }),
    [state]
  );
  const methods = useForm({
    resolver: yupResolver(BlogUpdateSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
    getValues,
  } = methods;

  const values = watch();

  const handleUpload = async () => {
    setIsUploadingHeroImage(true);
    try {
      const body = new FormData();
      body.append('useCase', MEDIA_USAGE.blogImage);
      body.append('image', getValues().heroImageFile);
      const response = await uploadMedia(body, MEDIA_USAGE.blogImage);
      setValue('heroImage', response?.media?.hash);
      setValue('heroImageFile', getMedia(response?.media?.hash));
      enqueueSnackbar('Uploaded successfully', { variant: 'success' });
    } catch (error) {
      setValue('heroImage', '');
      setValue('heroImageFile', '');
      enqueueSnackbar('Failed to upload', { variant: 'error' });
      console.log('UPLOAD MEDIA ERROR: ', error);
    } finally {
      setIsUploadingHeroImage(false);
    }
  };
  const onSubmit = async () => {
    try {
      const body = {
        ...values,
        nextBlogs: values.nextBlogs?.map(({ value }) => value),
        previousBlogs: values.previousBlogs?.map(({ value }) => value),
        heroImageFile: undefined,
        blogID,
      };
      await updateBlog(body).unwrap();
      enqueueSnackbar('Post success!');
      navigate('/dashboard/blog/list');
    } catch (error) {
      console.error(error);
    }
  };

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

  const BLOGS_OPTIONS = blogsData?.data ? blogsData?.data?.map(({ _id, title }) => ({ label: title, value: _id })) : [];

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" />

                {/* <RHFTextField name="description" label="Description" multiline rows={3} /> */}

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile
                    name={'heroImageFile'}
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    loading={isUploadingHeroImage}
                  />
                </div>

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor name="content" mediaUsage={MEDIA_USAGE.blogImage} />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue.value)}
                      defaultValue={STATUS_OPTIONS.find(({ value }) => value === state?.original?.status)}
                      options={STATUS_OPTIONS.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option.label} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Status" {...params} />}
                    />
                  )}
                />

                <Controller
                  disabled={!data?.data}
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue?._id)}
                      options={data?.data?.map((option) => option)}
                      defaultValue={state?.original?.category}
                      getOptionLabel={(option) => option?.title}
                      loading={isLoading}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Category" {...params} />}
                    />
                  )}
                />

                <Controller
                  name="tag"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      defaultValue={state?.original?.tag}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Tags" {...params} />}
                    />
                  )}
                />
                <Controller
                  name="nextBlogs"
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    const checkError = !!error && !field.value;
                    return (
                      <Autocomplete
                        freeSolo
                        multiple
                        onChange={(event, newValue) => field.onChange(newValue)}
                        options={BLOGS_OPTIONS.map((option) => option)}
                        renderInput={(params) => <TextField label="Next Blogs" {...params} />}
                      />
                    );
                  }}
                />
                <Controller
                  name="previousBlogs"
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    const checkError = !!error && !field.value;
                    return (
                      <Autocomplete
                        freeSolo
                        multiple
                        onChange={(event, newValue) => {
                          field.onChange(newValue);
                        }}
                        options={BLOGS_OPTIONS.map((option) => option)}
                        renderInput={(params) => <TextField label="Previous Blogs" {...params} />}
                      />
                    );
                  }}
                />
                <RHFTextField type="number" name="readTime" label="Read Time" />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {/* <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                Preview
              </Button> */}
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isUpdateBlogLoading}>
                Update post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      {/* <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> */}
    </>
  );
};
