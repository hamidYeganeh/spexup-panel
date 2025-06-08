import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
// icons
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, password = false, ...other }) {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext();

  const passwordConfig = {
    ...(password && {
      type: showPassword ? 'text' : 'password',
      InputProps: {
        endAdornment: (
          <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />}
          </IconButton>
        ),
      },
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} {...passwordConfig} />
      )}
    />
  );
}
