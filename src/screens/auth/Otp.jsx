import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomText,
  AuthWrapper,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {
  CodeField,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';

const Otp = () => {
  const [otpValue, setOtpValue] = useState('');

  const navigation = useNavigation();

  const ref = useBlurOnFulfill({otpValue, cellCount: 4});

  const handleForgotPassword = () => {
    console.log('Otp value is=====', otpValue);
    navigation.navigate('resetPassword');
  };

  const handleResendOtp = () => {
    console.log('resend otp here======');
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
          <View style={{marginTop: hp(8), width: wp(85), alignSelf: 'center'}}>
            <CustomText
              title={'Verification Code'}
              fontFamily={Fonts.SemiBold}
              fontSize={24}
            />
            <CustomText
              title={'OTP sent to your xxxxxxxxx E-mail'}
              fontFamily={Fonts.Regular}
              fontSize={13}
            />
            <View style={styles.inputContainer}>
              <CodeField
                ref={ref}
                value={otpValue}
                onChangeText={setOtpValue}
                cellCount={4}
                rootStyle={styles.root}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                clearTextOnFocus
                renderCell={({index, symbol}) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.cellInnerContainer,
                        {borderWidth: 1, borderColor: Colors.lightGray},
                      ]}>
                      <CustomText
                        fontSize={24}
                        fontFamily={Fonts.Medium}
                        title={symbol}
                      />
                    </View>
                  );
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginVertical: 7,
                  marginRight: wp('5%'),
                }}>
                <CustomText
                  title={'Didn’t receive the OTP?'}
                  color={Colors.lightGray}
                />
                <TouchableOpacity onPress={handleResendOtp}>
                  <CustomText
                    title={'Resend OTP'}
                    color={Colors.skyBlue}
                    fontFamily={Fonts.Medium}
                    style={{marginLeft: 5, textDecorationLine: 'underline'}}
                  />
                </TouchableOpacity>
              </View>
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
  root: {
    marginHorizontal: wp('5%'),
  },
  cellInnerContainer: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default Otp;
