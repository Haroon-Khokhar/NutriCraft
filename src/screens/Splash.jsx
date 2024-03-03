import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Images} from '../../assets';

const CustomSplashScreen = ({hideSplash}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
      hideSplash();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Images.splash} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '80%',
  },
});

export default CustomSplashScreen;
