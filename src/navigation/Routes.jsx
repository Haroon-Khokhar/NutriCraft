import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GettingStarted from '../screens/auth/GettingStarted';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/Signup';
import Otp from '../screens/auth/Otp';
import ResetPassword from '../screens/auth/ResetPassword';
import ForgotPassword from '../screens/auth/ForgotPassword';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'gettingStarted'}>
      <Stack.Screen name="gettingStarted" component={GettingStarted} />
      <Stack.Screen name="welcomeScreen" component={Welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="otp" component={Otp} />
      <Stack.Screen name="resetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default Routes;
