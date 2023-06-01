import { useContext, useState } from 'react';
import { GlobalContextType, GlobalContext } from '../../contexts/GlobalContext';
import { WishlistContext, WishlistType } from '../../contexts/WishlistContext';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { GetEventContext, GetEventType } from './GetEventContext';

export const EventPage = () => {
  const { isLoading, data, eventId } = useContext(
    GetEventContext
  ) as GetEventType;

  const { addToWishList, wishList } = useContext(
    WishlistContext
  ) as WishlistType;

  const { addToCart } = useContext(GlobalContext) as GlobalContextType;

  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart &&
      addToCart(data.id, data.title, data.price ?? 0, Number(quantity));
  };

  const handleQuantityChange = (ev: SelectChangeEvent<number>) => {
    setQuantity(Number(ev.target.value));
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(date));
  };

  const formatTime = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <Stack mt={5}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={data.image} alt="main image" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            sx={{ fontWeight: 700 }}
            alignItems="center"
            variant="h4"
            gutterBottom
          >
            {data.title}
          </Typography>

          <Typography
            sx={{ fontWeight: 700 }}
            alignItems="center"
            variant="h5"
            gutterBottom
          >
            {data.price ? (
              <>Price: {data.price}$ </>
            ) : (
              'Currently there is no price'
            )}
          </Typography>

          <Typography
            sx={{ fontWeight: 700 }}
            alignItems="center"
            variant="h5"
            gutterBottom
          >
            When: {formatDate(data?.date)}
          </Typography>

          <Typography
            sx={{ fontWeight: 700 }}
            alignItems="center"
            variant="h5"
            gutterBottom
          >
            Time: {formatTime(data?.date)}
          </Typography>

          <FormControl
            fullWidth
            sx={{
              marginBottom: '10px',
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Number of tickets
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quantity}
              label="Number of tickets"
              onChange={handleQuantityChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              color="primary"
              disabled={!data.price}
              onClick={handleAddToCart}
              sx={{
                marginBottom: '10px',
              }}
            >
              Add to cart
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                addToWishList({
                  id: data.id,
                  title: data.title,
                  image: data.image,
                  date: String(data.date),
                  location: data.location,
                  price: data.price,
                })
              }
            >
              {wishList.find((el) => el.id === Number(eventId))
                ? 'Remove from wishlist'
                : 'Add to wishlist'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};
