import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import Info from '../screens/stack/Info';
import CardDetails from '../screens/stack/CardDetails';
import Onboarding from '../screens/stack/Onboarding';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
