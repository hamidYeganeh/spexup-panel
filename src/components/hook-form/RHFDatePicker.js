import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
};

export default function RHFDatePicker({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => <DatePicker {...field} sx={{ width: '100%' }} {...other} />}
    />
  );
}
