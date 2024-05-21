import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  CustomText,
  AuthWrapper,
  MainWrapper,
  VectorIcons,
  DishCard,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';

const Home = () => {
  const navigation = useNavigation();

  const cameraRef = useRef();

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    requestPermission();
    if (Platform.OS === 'android' && !hasPermission) {
      handleOpenSettings();
    }
  }, []);

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  const [isLoading, setLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState();

  const handleCapture = async () => {
    setLoading(true);
    if (cameraRef.current) {
      const photo = await cameraRef?.current?.takePhoto({
        flash: 'on', // 'auto' | 'off'
      });
      console.log('photo==>', photo);
      const result = await fetch(`file://${photo.path}`);
      const data = await result.blob();
      console.log('photo data==>', data);
      setUserPhoto(photo);
      setLoading(false);
    }
  };
  return (
    <Camera
      device={device}
      ref={cameraRef}
      photo={true}
      style={{flex: 1}}
      androidPreviewViewType="texture-view"
    />
  );
};

const styles = StyleSheet.create({});

export default Home;
