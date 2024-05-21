import React from 'react';
import {Text} from 'react-native';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AuthWrapper = ({children, backgroundColor, paddingHorizontal}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{paddingHorizontal: paddingHorizontal || 10}}
      showsVerticalScrollIndicator={false}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default AuthWrapper;
