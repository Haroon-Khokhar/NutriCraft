import React from 'react';
import {ImageBackground, Text} from 'react-native';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Images} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const MainWrapper = ({
  children,
  backgroundColor,
  paddingHorizontal,
  bgImage,
}) => {
  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
      {/* <BlurView blurAmount={30} blurType="light" style={{flex: 1}}> */}
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.9)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        useAngle
        angle={110}
        style={{flex: 1}}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingHorizontal: paddingHorizontal || widthPercentageToDP('6%'),
          }}
          showsVerticalScrollIndicator={false}>
          {children}
        </KeyboardAwareScrollView>
      </LinearGradient>
      {/* </BlurView> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default MainWrapper;
