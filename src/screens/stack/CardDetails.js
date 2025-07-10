import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import MapView, { Marker } from 'react-native-maps';
import Orientation from 'react-native-orientation-locker';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AnimatedPopup from '../../components/PopUp';
import AnimatedMap from '../../components/AnimatedMap';
import { mapStyle } from '../../data/mapStyle';
import AnimatedView from '../../components/AnimatedView';
import { useStore } from '../../store/context';

const CardDetails = ({ route }) => {
  const place = route.params;
  const navigation = useNavigation();
  const { savePlace, removePlace, getSavedPlace } = useStore();
  const [iconColor, setIconColor] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [isVisibleMap, setIsVisibleMap] = useState(false);

  useFocusEffect(
    useCallback(() => {
      renderSavedPlaces(place);
      getSavedPlace();
    }, []),
  );

  const handleToggleSaved = () => {
    if (iconColor) {
      removePlace(place);
      setIconColor(false);
    } else {
      savePlace(place);
      setIconColor(true);
    }

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1800);
  };

  const renderSavedPlaces = async item => {
    const jsonValue = await AsyncStorage.getItem('places');
    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null ? setIconColor(false) : setIconColor(true);
    }
  };

  const handleShowFact = () => {
    setShowFact(!showFact);
    setTimeout(() => {
      setShowFact(false);
    }, 8000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${place.name}
Coordinates: ${place.latitude} ${place.longitude}
${place.description}
       
`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoBack = () => {
    if (isVisibleMap)
      setIsVisibleMap(false), Orientation.unlockAllOrientations();
    else navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 0.2 }}
      >
        <Header />
        <View style={styles.container}>
          <View>
            <View style={styles.backBtnWrap}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
                <Image source={require('../../assets/icons/back.png')} />
              </TouchableOpacity>

              <Text style={styles.title}>
                {isVisibleMap || place
                  ? place.name
                  : 'The most beautiful rivers'}
              </Text>
            </View>

            {isVisibleMap ? (
              <View>
                <AnimatedMap>
                  <View style={styles.mapContainer}>
                    <MapView
                      customMapStyle={mapStyle}
                      userInterfaceStyle="dark"
                      style={styles.map}
                      initialRegion={{
                        latitude: place.latitude,
                        longitude: place.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: place.latitude,
                          longitude: place.longitude,
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.02,
                        }}
                      >
                        <Image
                          source={require('../../assets/icons/marker.png')}
                        />
                      </Marker>
                    </MapView>
                  </View>
                  <LinearGradient
                    colors={['rgba(32, 34, 36, 0)', 'rgb(20, 22, 23)']}
                    style={styles.mapBottomGradient}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.cardTitle}>{place.name}</Text>
                    <Text style={styles.cardCoordinates}>
                      <Text
                        style={[
                          styles.cardCoordinates,
                          { fontFamily: 'Raleway-Regular' },
                        ]}
                      >
                        Map coordinates: {` `}
                      </Text>
                      {place.latitude} {place.longitude}
                    </Text>
                  </View>
                </AnimatedMap>
              </View>
            ) : (
              <AnimatedView friction={8} tension={70} duration={850}>
                <View style={styles.card}>
                  <View style={styles.gradientContainer}>
                    <Image source={place.image} style={styles.cardImage} />
                    <LinearGradient
                      colors={['rgba(32, 34, 36, 0)', 'rgba(32, 34, 36, 1)']}
                      style={styles.gradient}
                    />
                  </View>

                  <View style={styles.directionWrap}>
                    <View>
                      <Text style={styles.cardTitle}>{place.name}</Text>
                      <Text style={styles.cardCoordinates}>
                        <Text
                          style={[
                            styles.cardCoordinates,
                            { fontFamily: 'Raleway-Regular' },
                          ]}
                        >
                          Map coordinates: {` `}
                        </Text>
                        {place.latitude} {place.longitude}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setIsVisibleMap(true), Orientation.lockToPortrait();
                      }}
                      activeOpacity={0.7}
                      style={styles.detailsBtn}
                    >
                      <Image
                        source={require('../../assets/icons/cardMap.png')}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.cardDesc}>{place.description}</Text>

                  <View style={styles.buttonsWrap}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleToggleSaved()}
                      style={styles.detailsBtn}
                    >
                      {iconColor ? (
                        <Image
                          source={require('../../assets/icons/filledHeart.png')}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/icons/save.png')}
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleShowFact}
                      activeOpacity={0.7}
                      style={styles.detailsBtn}
                    >
                      <Image source={require('../../assets/icons/fact.png')} />
                    </TouchableOpacity>

                    {showFact && (
                      <View style={styles.factWrap}>
                        <View>
                          <Image
                            source={require('../../assets/images/factBoard.png')}
                          />
                          <View
                            activeOpacity={0.7}
                            style={[
                              styles.detailsBtn,
                              { position: 'absolute', left: 20, top: 26 },
                            ]}
                          >
                            <Image
                              source={require('../../assets/icons/fact.png')}
                            />
                          </View>
                          <Text style={styles.factText}>{place.fact}</Text>
                        </View>
                      </View>
                    )}

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.detailsBtn}
                      onPress={handleShare}
                    >
                      <Image source={require('../../assets/icons/share.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </AnimatedView>
            )}
          </View>
        </View>
      </ScrollView>

      <AnimatedPopup visible={visible}>
        <Text style={styles.popUpText}>
          {!iconColor
            ? 'The location has been deleted.'
            : 'The location has been saved.'}
        </Text>
      </AnimatedPopup>
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
  factWrap: { position: 'absolute', top: -140, left: 15 },
  cardImage: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 3,
    left: 19,
  },
  card: {
    padding: 25,
    backgroundColor: '#202224',
    borderRadius: 22,
    marginBottom: 12,
  },
  backBtnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
    gap: 4,
  },
  gradientContainer: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
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
  directionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
  },
  popUpText: {
    fontFamily: 'Raleway-Medium',
    color: '#fff',
    fontSize: 12,
  },
  factText: {
    fontFamily: 'Raleway-Regular',
    color: '#fff',
    fontSize: 12,
    width: 177,
    position: 'absolute',
    left: 80,
    top: 16,
  },
  mapBottomGradient: {
    width: '100%',
    height: 140,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
});

export default CardDetails;
