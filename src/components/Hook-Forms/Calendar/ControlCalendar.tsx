import {
  useController,
  FieldValues,
  FieldPath,
  Control,
} from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface IControlCalendar<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
}

export const ControlCalendar = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
}: IControlCalendar<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...field}
        value={field.value}
        label="Calendar"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: {
            variant: 'outlined',
            error: !!error,
            helperText: error?.message,
            onClick: () => setOpen(true),
            value: field.value,
            margin: 'normal',
          },
        }}
      />
    </LocalizationProvider>
  );
};
