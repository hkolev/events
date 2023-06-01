import { useContext } from 'react';
import {
  Grid,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { GlobalContextType, GlobalContext } from '../../contexts/GlobalContext';

export const Cart = () => {
  const { cart, totalPrice, removeFromCart } = useContext(
    GlobalContext
  ) as GlobalContextType;

  return (
    <>
      <Stack mt={5}>
        <Typography alignItems="center" variant="h3" gutterBottom>
          Cart
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {!cart.length ? (
              <Typography alignItems="center" variant="h5" gutterBottom>
                No items in cart!
              </Typography>
            ) : (
              <>
                <Typography alignItems="center" variant="h5" gutterBottom>
                  Your events
                </Typography>
                <List role="list">
                  {cart.map((el) => {
                    return (
                      <ListItem
                        role="listitem"
                        key={el.id}
                        alignItems="flex-start"
                      >
                        <ListItemText
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                          primary={el.name}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline', marginRight: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {el.qty} X {el.price}$
                              </Typography>

                              <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  removeFromCart && removeFromCart(el.id)
                                }
                              >
                                <ClearIcon />
                              </Button>
                            </>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              sx={{
                paddingTop: '20px',
              }}
            >
              <Typography alignItems="center" variant="h5" gutterBottom>
                Order Summary
              </Typography>

              <Typography alignItems="center" variant="h6" gutterBottom>
                Total Price: {totalPrice}$
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
