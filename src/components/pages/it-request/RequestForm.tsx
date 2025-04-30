'use client';
import * as Yup from 'yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { MenuItem, Box, Typography, Grid, Stack, Divider } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '@/components/ui/form/FormProvider';
import RHFTextField from '@/components/ui/form/RHFTextField';
import RHFSelect from '@/components/ui/form/RHFSelectField';
import RHFUploadFile from '@/components/ui/form/RHFUploadFile';

type FormValues = {
  email: string;
  issue: string;
  description: string;
  priority: string;
  file?: string | File | null;
};

const RequestForm: React.FC = () => {
  // Static issue options
  const issueOptions = [
    'Unable to access shared drive',
    'Application crash on startup',
    'Unable to reset password',
    'Email delivery failure',
    'Slow internet connection',
    'Printer not responding',
    'Access to restricted folder',
    'Software update required',
    'System overheating',
  ];
  const FormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    issue: Yup.string().required('Issue is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().required('Priority is required'),
  });
  const defaultValues = {
    email: '',
    issue: '',
    description: '',
    priority: '',
    file: '',
  };
  const methods = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component={'div'}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        mb: 4,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography variant='h4' textAlign={'center'} gutterBottom>
        IT Request Form
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <RHFTextField name='email' label='Email' />
          <RHFSelect name='issue' label='Issue'>
            {issueOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFTextField
            name='description'
            label='Description'
            multiline
            rows={4}
          />
          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
            divider={<Divider orientation='vertical' flexItem />}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{
              xs: 1,
              sm: 2,
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', sm: '50%' },
              }}
            >
              <RHFSelect name='priority' label='Priority'>
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='high'>High</MenuItem>
              </RHFSelect>
            </Box>
            <Box
              sx={{
                width: { xs: '100%', sm: '50%' },
              }}
            >
              <RHFUploadFile name='file' />
            </Box>
          </Stack>
          <LoadingButton
            fullWidth
            type='submit'
            variant='contained'
            size='large'
            loading={isSubmitting}
          >
            Post
          </LoadingButton>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default RequestForm;
