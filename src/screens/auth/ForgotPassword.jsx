import React, { useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  CustomText,
  AuthWrapper,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';

const ForgotPassword = () => {
  const [inputData, setInputData] = useState('');

  const navigation = useNavigation();

  const handleForgotPassword = () => {
    console.log('forgot password email is=====', inputData);
    firebase
      .auth()
      .sendPasswordResetEmail(inputData)
      .then(() => {
        ToastAndroid.show(
          'Please check your inbox, we have sent password reset email.',
          ToastAndroid.SHORT,
        );
        navigation.navigate('login');
      })
      .catch(function (error) {
        console.log('Error sending password reset email:', error);
        if (error?.code == 'auth/invalid-email') {
          ToastAndroid.show(
            'Please enter a valid email address.',
            ToastAndroid.SHORT,
          );
          return;
        }
        ToastAndroid.show('Something went wrong.', ToastAndroid.SHORT);
      });
  };
  return (
    <AuthWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <CustomImage
            source={Images.auth2}
            width={wp(80)}
            height={hp(20)}
            resizeMode={'contain'}
          />
        </View>
        <View>
          <View style={{ marginTop: hp(8), width: wp(85), alignSelf: 'center' }}>
            <CustomText
              title={'Forgot Your password'}
              fontFamily={Fonts.SemiBold}
              fontSize={24}
            />
            <CustomText
              title={
                'Enter your email address and we’ll send you an email with all the instructions.'
              }
              fontFamily={Fonts.Regular}
              fontSize={13}
            />
            <View style={styles.inputContainer}>
              <CustomInput
                placeholder={'user@gmail.com'}
                onChange={e => {
                  setInputData(e);
                }}
                keyboardType={'email-address'}
                value={inputData}
                borderColor={Colors.lightGray}
              />
            </View>
            <CustomButton
              onPress={handleForgotPassword}
              title={'Continue'}
              width={wp(85)}
              height={50}
              backgroundColor={Colors.skyBlue}
              style={{ marginTop: hp(15) }}
            />
          </View>
        </View>
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: hp(3),
    alignSelf: 'center',
    width: '100%',
  },
  textContainer: {
    alignSelf: 'flex-end',
    marginRight: 5,
    height: 100,
  },
});

export default ForgotPassword;
