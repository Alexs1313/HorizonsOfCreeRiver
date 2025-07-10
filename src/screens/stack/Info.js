import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

const Info = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Header title={'Info'} />

        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <View style={styles.imagesWrapper}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/onboard1.png')}
                style={styles.image}
              />
            </View>
          </View>
          <Text style={styles.infoText}>
            “Horizons of Cree River” is a modern mobile guide to the rivers of
            Canada. Your virtual companion Kira will always suggest the most
            beautiful views, show you exact coordinates, collect interesting
            facts and saved places, and remind you about new routes. Go on a
            journey right from your phone!
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: 128,
    height: 191,
    position: 'absolute',
    bottom: 0,
  },
  logo: {
    width: 172,
    height: 169,
  },
  imageContainer: {
    width: 172,
    height: 169,
    backgroundColor: '#3C3D3F',
    borderRadius: 12,
    alignItems: 'center',
  },
  imagesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  infoText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    marginTop: 20,
    color: '#fff',
  },
});

export default Info;
