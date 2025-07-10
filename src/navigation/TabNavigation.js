import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Home from '../screens/tabs/Home';
import Saved from '../screens/tabs/Saved';
import Map from '../screens/tabs/Map';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#C69744',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/home.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/saved.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/map.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#202224',
    borderWidth: 1,
    borderColor: '#202224',
    elevation: 1,
    paddingTop: 30,
    height: 101,
    position: 'absolute',
    bottom: 59,
    marginHorizontal: 82,
    borderRadius: 22,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 25 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
});

export default TabNavigation;
