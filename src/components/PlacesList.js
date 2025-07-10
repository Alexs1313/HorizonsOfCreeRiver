import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import { places } from '../data/places';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../store/context';

const { height } = Dimensions.get('window');

const PlacesList = ({ screen }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();
  const { getSavedPlace, savedPlaces } = useStore();

  useFocusEffect(
    useCallback(() => {
      getSavedPlace();
    }, []),
  );

  console.log('savedPlaces', savedPlaces);

  const filteredPlaces = query
    ? places.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const filteredSavedPlaces = query
    ? savedPlaces.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  let placesList = [];
  let filteredList = [];

  screen === 'Home' ? (placesList = places) : (placesList = savedPlaces);
  screen === 'Home'
    ? (filteredList = filteredPlaces)
    : (filteredList = filteredSavedPlaces);

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Header
          title={screen === 'Saved' && 'Title'}
          screen={'Saved locations'}
        />
        <View style={styles.container}>
          <View style={isFocused && styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Find a location"
              textAlignVertical="top"
              value={query}
              placeholderTextColor={'rgba(255, 255, 255, 0.37)'}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                Keyboard.dismiss();
                if (query === '') {
                  setIsFocused(false);
                }
              }}
              onChangeText={setQuery}
            />
            <Image
              source={require('../assets/icons/search.png')}
              style={styles.searchImg}
            />
            {isFocused && <View style={styles.underline} />}
            {isFocused && (
              <View style={{ marginTop: 20 }}>
                {query.length > 0 && (
                  <FlatList
                    data={filteredList}
                    scrollEnabled={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.filteredCard}>
                        <View style={styles.filteredGradientContainer}>
                          <Image
                            source={item.image}
                            style={styles.filteredCardImage}
                          />
                          <LinearGradient
                            colors={[
                              'rgba(32, 34, 36, 0)',
                              'rgba(32, 34, 36, 1)',
                            ]}
                            style={styles.filteredGradient}
                          />
                        </View>
                        <Text
                          style={[
                            styles.title,
                            { fontSize: 12, marginBottom: 7 },
                          ]}
                        >
                          {item.name}
                        </Text>

                        <View style={styles.directionWrap}>
                          <Text
                            numberOfLines={4}
                            style={[styles.cardDesc, { fontSize: 8 }]}
                          >
                            {item.description}
                          </Text>

                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                              navigation.navigate('CardDetails', item)
                            }
                            style={[
                              styles.detailsBtn,
                              { width: 30, height: 30 },
                            ]}
                          >
                            <Image
                              source={require('../assets/icons/details.png')}
                              style={styles.detailsImg}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            )}
          </View>

          {!isFocused && (
            <View style={screen === 'Saved' && { marginTop: 16 }}>
              {screen === 'Home' && (
                <Text style={styles.title}>The most beautiful rivers</Text>
              )}
              {placesList.length === 0 && (
                <View style={styles.notificationWrap}>
                  <Image source={require('../assets/images/emptyScreen.png')} />
                  <Text style={styles.emptyScreenText}>
                    You haven't saved anything yet
                  </Text>
                </View>
              )}
              <FlatList
                data={placesList}
                scrollEnabled={false}
                keyExtractor={(_, index) => index}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.gradientContainer}>
                      <Image source={item.image} style={styles.cardImage} />
                      <LinearGradient
                        colors={['rgba(32, 34, 36, 0)', 'rgba(32, 34, 36, 1)']}
                        style={styles.gradient}
                      />
                    </View>
                    <Text style={styles.title}>{item.name}</Text>

                    <View style={styles.directionWrap}>
                      <Text numberOfLines={4} style={styles.cardDesc}>
                        {item.description}
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('CardDetails', item)}
                        style={styles.detailsBtn}
                      >
                        <Image
                          source={require('../assets/icons/details.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 170, flex: 1 },
  title: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 23,
    marginTop: 14,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  inputContainer: {
    backgroundColor: '#202224',
    borderRadius: 22,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 32,
    backgroundColor: '#202224',
    borderRadius: 22,
    paddingHorizontal: 26,
  },
  underline: {
    width: '87.5%',
    height: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 70,
    left: 24,
  },
  searchImg: { position: 'absolute', right: 23, top: 27 },
  card: {
    padding: 25,
    backgroundColor: '#202224',
    borderRadius: 22,
    marginBottom: 12,
  },
  filteredCard: {
    padding: 16,
    backgroundColor: '#313235',
    borderRadius: 14,
    marginBottom: 12,
  },
  filteredCardImage: {
    width: '100%',
    height: 105,
    borderRadius: 16,
  },
  filteredGradientContainer: {
    height: 105,
    width: '100%',
    position: 'relative',
  },
  filteredGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 105 * 0.55,
    zIndex: 1,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
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
    marginBottom: 11,
    marginTop: 4,
  },
  cardDesc: {
    fontFamily: 'Raleway-Regular',
    color: '#fff',
    fontSize: 12,
    width: '75%',
  },
  detailsBtn: {
    width: 46,
    height: 46,
    backgroundColor: '#C69744',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  directionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsImg: {
    width: 16,
    height: 16,
  },
  notificationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: height * 0.13,
  },
  emptyScreenText: {
    fontFamily: 'Raleway-Medium',
    color: '#fff',
    fontSize: 15,
  },
});

export default PlacesList;
