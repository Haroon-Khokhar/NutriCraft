import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ForgotPassword,
  GettingStarted,
  Login,
  Otp,
  ResetPassword,
  Signup,
  Welcome,
} from '../screens/auth';
import {DishDetail} from '../screens/main';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'gettingStarted'}>
      {/* Auth Screens */}
      <Stack.Screen name="gettingStarted" component={GettingStarted} />
      <Stack.Screen name="welcomeScreen" component={Welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signUp" component={Signup} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="otp" component={Otp} />
      <Stack.Screen name="resetPassword" component={ResetPassword} />

      {/* Main Screens */}
      <Stack.Screen name="tabStack" component={TabStack} />
      <Stack.Screen name="dishDetail" component={DishDetail} />
    </Stack.Navigator>
  );
};

export default Routes;
