'use client';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import {
  MenuItem,
  Box,
  Typography,
  Grid,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '@/components/ui/form/FormProvider';
import RHFTextField from '@/components/ui/form/RHFTextField';
import RHFSelect from '@/components/ui/form/RHFSelectField';
import RHFUploadFile from '@/components/ui/form/RHFUploadFile';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useTickets } from '@/providers/TicketProvider';
import { Priorty, Ticket } from '@/types';
import { delayMS, formatDateWithoutHour, generateRandomNumeric } from '@/utils';

type FormValues = {
  email: string;
  issue: string;
  description: string;
  priority: string;
  file?: string | File | null;
};

const RequestForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { addTickets } = useTickets();
  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      await delayMS(700); // Simulate a network delay
      handleOpenSnackbar();
      console.log(data);
      const newTicket: Ticket = {
        id: generateRandomNumeric(), // Simulating an ID for the new ticket
        user: data.email,
        issue: data.issue,
        description: data.description,
        priority: data.priority as Priorty,
        status: 'open',
        createdAt: formatDateWithoutHour(new Date().toISOString()),
      };
      addTickets(newTicket);
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
          <Button
            fullWidth
            type='submit'
            variant='contained'
            size='large'
            loading={isSubmitting}
          >
            Submit
          </Button>
        </Grid>
      </FormProvider>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Your request has been submitted successfully <br />
          You can track your request in the Tickets page!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RequestForm;
