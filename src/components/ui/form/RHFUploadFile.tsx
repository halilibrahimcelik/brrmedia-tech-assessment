import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextFieldProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = TextFieldProps & {
  name: string;
};

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const RHFUploadFile = ({ name }: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
          }}
        >
          <Button
            component='label'
            variant='contained'
            startIcon={<CloudUploadIcon />}
            sx={{
              width: '100%',

              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {field.value?.name || 'Upload File'}
            <VisuallyHiddenInput
              sx={{
                width: '100%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              type='file'
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setValue(name, file); // Register the file in the form
                }
              }}
            />
          </Button>
          {field.value && (
            <IconButton
              size='small'
              color='primary'
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: 'translate(50%, -50%)',

                boxShadow: 1,
              }}
              onClick={() => setValue(name, null)} // Clear the file selection
            >
              <CloseIcon color='primary' fontSize='small' />
            </IconButton>
          )}
        </div>
      )}
    />
  );
};

export default RHFUploadFile;
