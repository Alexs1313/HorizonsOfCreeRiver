import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

import Header from '../../components/Header';
import { places } from '../../data/places';
import AnimatedMap from '../../components/AnimatedMap';
import { mapStyle } from '../../data/mapStyle';
import Orientation from 'react-native-orientation-locker';

const { height } = Dimensions.get('window');

const Map = () => {
  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = useState(null);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 0.5 }}
      >
        <Header title={'Title'} screen={'Map'} />
        <View style={styles.container}>
          <View>
            <View>
              <AnimatedMap>
                <View style={styles.mapContainer}>
                  <MapView
                    customMapStyle={mapStyle}
                    userInterfaceStyle="dark"
                    style={styles.map}
                    initialRegion={{
                      latitude: 52.6836,
                      longitude: -118.5478,
                      latitudeDelta: 10.34,
                      longitudeDelta: 10.34,
                    }}
                  >
                    {places.map(marker => (
                      <Marker
                        key={marker.id}
                        coordinate={{
                          latitude: marker.latitude,
                          longitude: marker.longitude,
                        }}
                        onPress={() => setSelectedMarker(marker)}
                      >
                        <Image
                          source={require('../../assets/icons/marker.png')}
                        />
                      </Marker>
                    ))}
                  </MapView>
                </View>
                <LinearGradient
                  colors={['rgba(32, 34, 36, 0)', 'rgb(20, 22, 23)']}
                  style={styles.mapBottomGradient}
                />
              </AnimatedMap>

              <>
                {selectedMarker && (
                  <View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.cardTitle}>
                        {selectedMarker.name}
                      </Text>
                      <Text style={styles.cardCoordinates}>
                        <Text
                          style={[
                            styles.cardCoordinates,
                            { fontFamily: 'Raleway-Regular' },
                          ]}
                        >
                          Map coordinates: {` `}
                        </Text>
                        {selectedMarker.latitude} {selectedMarker.longitude}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CardDetails', selectedMarker)
                      }
                      activeOpacity={0.7}
                      style={[
                        styles.detailsBtn,
                        { right: 20, bottom: 30, position: 'absolute' },
                      ]}
                    >
                      <Image
                        source={require('../../assets/icons/details.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    fontSize: 18,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  mapBottomGradient: {
    width: '100%',
    height: 130,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  infoContainer: { position: 'absolute', bottom: 3, left: 19 },
  gradientContainer: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 160 * 0.55,
    zIndex: 1,
  },
  cardTitle: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 4,
  },
  cardDesc: {
    fontFamily: 'Raleway-Regular',
    color: '#fff',
    fontSize: 12,
  },
  cardCoordinates: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    fontSize: 12,
    marginBottom: 28,
  },
  detailsBtn: {
    width: 46,
    height: 46,
    backgroundColor: '#C69744',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
});

export default Map;
