import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const Header = ({ title, screen }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header]}>
      {title === 'Info' && (
        <View style={styles.titleWrapper}>
          <Image source={require('../assets/icons/info.png')} />
          <Text style={styles.title}>Information</Text>
        </View>
      )}
      {title === 'Title' && (
        <View style={styles.headerTitleWrap}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.imageAbsolute}
          />
          <Text style={styles.title}>{screen}</Text>
        </View>
      )}

      {title !== 'Title' && title !== 'Info' && (
        <View style={styles.headerWrapp}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Info')}
            activeOpacity={0.7}
            style={styles.infoContainer}
          >
            <Image source={require('../assets/icons/info.png')} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#202224',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  infoContainer: {
    width: 83,
    height: 83,
    backgroundColor: '#C69744',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 83, height: 83 },
  imageAbsolute: {
    width: 83,
    height: 83,
    position: 'absolute',
    left: 0,
    top: height * 0.062,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height * 0.089,
    justifyContent: 'center',
    gap: 5,
    paddingBottom: 50,
  },
  headerWrapp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.062,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    color: '#fff',
  },
  headerTitleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.089,
    paddingBottom: 50,
  },
});

export default Header;
