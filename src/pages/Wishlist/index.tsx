import { useContext } from 'react';

import { WishlistContext, WishlistType } from '../../contexts/WishlistContext';
import { EventsList } from '../../components/EventsList';
import { PDFDocument } from '../../components/PDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, Grid, Typography } from '@mui/material';
export const Wishlist = () => {
  const { wishList } = useContext(WishlistContext) as WishlistType;
  return (
    <>
      <Typography alignItems="center" variant="h3" gutterBottom>
        Wishlist
      </Typography>

      <EventsList events={wishList} emptyText="No items in wishlist!" />

      {wishList.length > 0 && (
        <Grid item xs={12} md={6}>
          <Button variant="contained">
            <PDFDownloadLink
              document={<PDFDocument wishlist={wishList} />}
              fileName="wishlist.pdf"
            >
              {({ loading }) =>
                loading ? 'Loading document...' : 'Download as pdf!'
              }
            </PDFDownloadLink>
          </Button>
        </Grid>
      )}
    </>
  );
};
