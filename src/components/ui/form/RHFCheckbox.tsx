import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
}
const RHFCheckbox = ({ name, ...other }: RHFCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={field.value} />}
          {...other}
        />
      )}
    />
  );
};

export default RHFCheckbox;
