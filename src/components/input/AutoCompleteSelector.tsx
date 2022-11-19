import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import * as Icons from '@mui/icons-material';

export default function AutoCompleteSelector({
  options,
  disabled = undefined,
  loading = undefined,
  value = '',
  onChange = undefined,
  size = 'small' as 'small',
  ...other
}) {
  const handleChange = React.useCallback((e, value) => onChange(value), [onChange]);
  const handleClear = React.useCallback(e => onChange(''), [onChange]);
  return (
    <Autocomplete
      disabled={disabled}
      options={options}
      loading={loading}
      freeSolo
      disableClearable={false}
      onChange={handleChange}
      size={size}
      value={value}
      renderInput={params => {
        return (
          <TextField
            {...params}
            placeholder='Please select an option...'
            onChange={onChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position='end'>
                  {loading ? (
                    <IconButton size='small' disabled={true}>
                      <CircularProgress color='inherit' size={20} />
                    </IconButton>
                  ) : (
                    <IconButton disabled={disabled} size='small' onClick={handleClear}>
                      <Icons.Clear />
                    </IconButton>
                  )}
                </InputAdornment>
              )
            }}
            {...other}
          />
        );
      }}
    />
  );
}
