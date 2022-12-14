import * as React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';
import { isEmpty } from '../../helpers';

const isDefined = value => value !== undefined && value !== null;

const enforceMinMax = (min, max, value) =>
  !isEmpty(value) ? (isDefined(min) && Number(value) < Number(min) ? min : isDefined(max) && Number(value) > Number(max) ? max : value) : value;

const WholeNumberFormat = React.forwardRef<HTMLInputElement>(({ onChange, min, max, thousandSeparator = ',', ...other }: any, ref) => {
  return (
    <NumberFormat
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            value: enforceMinMax(min, max, values.value)
          }
        });
      }}
      decimalScale={0}
      allowNegative={false}
      isNumericString
      thousandSeparator={thousandSeparator}
      {...other}
    />
  );
});

export default function WholeNumber({
  value,
  onChange,
  InputProps = {},
  inputProps = {},
  min = undefined,
  max = undefined,
  thousandSeparator = undefined,
  ...other
}) {
  const handleChange = React.useCallback(event => onChange && onChange(event?.target?.value), [onChange]);
  return (
    <TextField
      onChange={handleChange}
      value={value}
      InputProps={{
        inputComponent: WholeNumberFormat as any,
        ...InputProps
      }}
      inputProps={{
        value,
        min,
        max,
        thousandSeparator,
        ...inputProps
      }}
      {...other}
    />
  );
}
