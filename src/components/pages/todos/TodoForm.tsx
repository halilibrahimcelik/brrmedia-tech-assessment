'use client';
import * as Yup from 'yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { Box, Typography, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '@/components/ui/form/FormProvider';
import RHFTextField from '@/components/ui/form/RHFTextField';
import RHFCheckbox from '@/components/ui/form/RHFCheckbox';
import { useTodos } from '@/providers/TodosProvider';
import { generateRandomNumeric } from '@/utils';

type FormValues = {
  title: string;
  completed: boolean;
};
type TodosFormProps = {
  id?: number;
  title?: string;
  completed?: boolean;
  isEdit?: boolean;
  handleClose?: () => void;
};

const TodosForm: React.FC<TodosFormProps> = ({
  id,
  title,
  completed,
  isEdit,
  handleClose,
}) => {
  const FormSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    completed: Yup.boolean().required('Completed is required'),
  });
  const { addTodo, updateTodo } = useTodos();
  const defaultValues = {
    title: title || '',
    completed: completed || false,
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
      if (id) {
        const updatedTodo = { ...data, id };
        updateTodo(updatedTodo);
        if (handleClose) handleClose();
        reset();
      } else {
        const randomId = generateRandomNumeric();
        const newTodo = { ...data, id: randomId };
        addTodo(newTodo);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component={'div'}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography variant='h4' textAlign={'center'} gutterBottom>
        {isEdit ? 'Edit Todo' : 'Todos Form'}
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <RHFTextField name='title' label='Title' />

          <RHFCheckbox name='completed' label='Completed' />
          <LoadingButton
            fullWidth
            type='submit'
            variant='contained'
            size='large'
            loading={isSubmitting}
          >
            {isEdit ? 'Update Todo' : 'Add Todo'}
          </LoadingButton>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default TodosForm;
