import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { isEmpty } from '../../helpers';

const getLabel = option => ((typeof option === 'object' && option ? option.label : option) ?? '').toString();
const getValue = option => (typeof option === 'object' && option ? option.value : option) ?? '';
const getSelectedOption = (value, options) =>
  Array.isArray(options) ? options.find(o => (typeof o === 'object' ? o.value === value : o === value)) ?? '' : '';

// Accepts either an option array of strings, numbers, or { value, label } objects. Reports only the value (not the object) to parent onChange
export default function AutoCompleteSelector({ loading, options = [], value = '', onChange, disabled = false, freeSolo = undefined, ...other }) {
  const handleChange = React.useCallback(
    (e, option) => {
      onChange && onChange(getValue(option));
    },
    [onChange]
  );

  return (
    <Autocomplete
      freeSolo={freeSolo}
      autoHighlight
      getOptionLabel={option => getLabel(option)}
      disabled={disabled}
      value={isEmpty(value) ? null : getSelectedOption(value, options)} // convert value to option
      options={options}
      renderOption={(props, option) => (
        <Box component='li' {...props}>
          {getLabel(option)}
        </Box>
      )}
      onChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: loading ? (
              <InputAdornment position='end'>
                <IconButton size='small' disabled={true}>
                  <CircularProgress color='inherit' size={20} />
                </IconButton>
              </InputAdornment>
            ) : (
              params.InputProps.endAdornment
            )
          }}
          disabled={disabled}
          {...other}
        />
      )}
    />
  );
}
