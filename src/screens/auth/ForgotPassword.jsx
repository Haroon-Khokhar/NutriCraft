import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  CustomText,
  ScreenWrapper,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const [inputData, setInputData] = useState('');

  const navigation = useNavigation();

  const handleForgotPassword = () => {
    console.log('forgot password email is=====', inputData);
    navigation.navigate('otp');
  };
  return (
    <ScreenWrapper>
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
          <View style={{marginTop: hp(8), width: wp(85), alignSelf: 'center'}}>
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
              style={{marginTop: hp(15)}}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
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
