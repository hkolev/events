import { TextField, Stack, Button, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ControlCalendar } from '../../components/Hook-Forms/Calendar/ControlCalendar';
import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { EventsList } from '../../components/EventsList';
import { EventsContext, EventsType } from '../../contexts/EventsContext';
import { ImageUploadInput } from '../../components/Hook-Forms/ImageUploadInput';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FestivalIcon from '@mui/icons-material/Festival';

type FormValues = {
  name: string;
  location: string;
  calendar: string;
  image: string;
  price: string;
};

const schema = z.object({
  name: z
    .string()
    .min(5, { message: 'Name must be 5 or more characters long' }),
  image: z
    .string({
      required_error: 'Please select image',
    })
    .nonempty({
      message: 'Please select image',
    }),
  location: z
    .string()
    .min(5, { message: 'Location must be 5 or more characters long' }),
  price: z.string().nonempty({
    message: 'Please select price',
  }),
  calendar: z.preprocess(
    (arg: any) => {
      if (!arg) return;

      return new Date(arg.$d).toLocaleString();
    },
    z.string({
      required_error: 'Please select date',
    })
  ),
});

export const CreateEvent = () => {
  const { addEvent, events } = useContext(EventsContext) as EventsType;

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      location: '',
      calendar: '',
      image: '',
      price: '',
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, control, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    addEvent({
      id: Date.now(),
      date: data.calendar,
      title: data.name,
      image: data.image,
      price: Number(data.price),
      location: data.location,
      userCreated: true,
    });

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack
          maxWidth={600}
          sx={{
            margin: 'auto',
          }}
        >
          <Typography alignItems="center" variant="h3" gutterBottom>
            Add event
          </Typography>

          <TextField
            label="Name"
            type="text"
            variant="outlined"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FestivalIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Location"
            type="text"
            variant="outlined"
            {...register('location')}
            error={!!errors.location}
            helperText={errors.location?.message}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Price"
            type="number"
            variant="outlined"
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />

          <ControlCalendar control={control} name="calendar" />

          <ImageUploadInput control={control} name="image" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>

      <EventsList
        events={events}
        emptyText="You currently don't own any events!"
      />
    </div>
  );
};
