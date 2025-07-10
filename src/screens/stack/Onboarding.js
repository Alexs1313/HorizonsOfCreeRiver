import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AnimatedView from '../../components/AnimatedView';

export default function Onboarding() {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const isPortrait = height >= width;

  const minHeight = isPortrait ? height * 0.55 : height * 0.5;

  const handleNextStep = () => {
    index === 2 ? navigation.replace('TabNavigation') : setIndex(index + 1);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imgContainer}>
            {index === 0 ? (
              <AnimatedView friction={8} tension={100} duration={1200}>
                <Image
                  source={require('../../assets/images/onboard1.png')}
                  style={[
                    styles.image,
                    !isPortrait && { height: height * 1.7, width: width * 0.5 },
                  ]}
                />
              </AnimatedView>
            ) : index === 1 ? (
              <Image
                source={require('../../assets/images/onboard2.png')}
                style={{ width: '100%' }}
              />
            ) : (
              <Image
                source={require('../../assets/images/onboard.png')}
                style={
                  !isPortrait && { height: height * 1.4, width: width * 0.6 }
                }
              />
            )}
          </View>

          {index === 0 && isPortrait && (
            <Image
              source={require('../../assets/images/gradient.png')}
              style={[styles.gradient]}
            />
          )}

          <View style={[styles.bottomContainer, { minHeight }]}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <AnimatedView friction={8} tension={100} duration={1200}>
              <View style={styles.textWrapper}>
                <Text style={styles.title}>
                  {index === 0
                    ? 'Hello, Traveler!'
                    : index === 1
                    ? 'Explore the rivers'
                    : 'Save and share'}
                </Text>
                <Text style={styles.description}>
                  {index === 0
                    ? `Welcome to Horizons of Cree River! I’m Kira, your virtual guide. Together we’ll discover Canada’s most spectacular river routes, filled with incredible scenery and captivating stories. 
Ready to go?`
                    : index === 1
                    ? 'In the application you will find a selection of the most popular rivers with a photo gallery, GPS coordinates and detailed descriptions. I will tell you about secret rapids, picturesque corners and interesting legends. Just touch the river - and I will guide you!'
                    : `Liked a special place? Add it to your “Favorites” to easily find it again. I’m always here to suggest the most interesting stops on your way!`}
                </Text>
              </View>
              <View style={styles.btnWrap}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={handleNextStep}
                >
                  <Text style={styles.buttonText}>
                    {index === 0 ? 'YES!' : index === 1 ? 'GO!' : 'Start!'}
                  </Text>
                </TouchableOpacity>
              </View>
            </AnimatedView>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    alignItems: 'center',
    flex: 1,
  },
  textWrapper: { alignItems: 'center', minHeight: 150 },
  logo: { position: 'absolute', top: -53 },
  gradient: { position: 'absolute', top: '25%', width: '100%' },
  image: { marginTop: 50 },
  bottomContainer: {
    backgroundColor: '#202224',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 21,
    alignItems: 'center',
    paddingTop: 76,
    paddingBottom: 20,
    width: '100%',
    flexGrow: 1,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontFamily: 'Raleway-Black',
    color: '#fff',
    fontSize: 24,
    marginBottom: 23,
  },
  description: {
    fontFamily: 'Raleway-Regular',
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 23,
  },
  button: {
    backgroundColor: '#C69744',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 23,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 21 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    fontSize: 17,
  },
  btnWrap: { paddingHorizontal: 94 },
});
