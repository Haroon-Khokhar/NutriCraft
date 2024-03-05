import React from 'react';
import {Text} from 'react-native';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ScreenWrapper = ({children, backgroundColor, paddingHorizontal}) => {
  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          backgroundColor: backgroundColor || Colors.white,
        },
      ]}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{paddingHorizontal: paddingHorizontal || 10}}
        showsVerticalScrollIndicator={false}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default ScreenWrapper;
