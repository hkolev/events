import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { EventType } from '../Event/Event';

export const PDFDocument = ({ wishlist }: { wishlist: EventType[] }) => {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date(date));
  };

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title} fixed>
          Your wishlist
        </Text>
        {wishlist.map((el, idx) => {
          return (
            <View key={el.id} style={styles.row}>
              <Image style={styles.imge} src={el.image} />

              <Text
                style={styles.text}
                render={() =>
                  `${idx + 1}. ${el.title} on ${formatDate(el.date)} in ${
                    el.location
                  }. Cost: ${
                    el.price ? `${el.price}$` : 'Currently there is no price'
                  }`
                }
                fixed
              />
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    flex: 70,
  },
  imge: {
    flex: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
});
