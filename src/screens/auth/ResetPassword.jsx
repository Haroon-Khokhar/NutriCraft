import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
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
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const ResetPassword = () => {
  const [inputData, setInputData] = useState({
    password: '',
    confirmPassword: '',
  });

  const navigation = useNavigation();

  const inputArray = [
    {
      name: 'password',
      placeholder: 'new password',
      secureTextEntry: true,
    },
    {
      name: 'confirmPassword',
      placeholder: 'confirm password',
      secureTextEntry: true,
      errorMessage: "passwords don't match",
    },
  ];

  const handleResetPassword = () => {
    console.log('new password is=====', inputData.password);
    navigation.navigate('login');
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
            source={Images.auth4}
            width={wp(80)}
            height={hp(20)}
            resizeMode={'contain'}
          />
        </View>
        <View>
          <View style={{marginTop: hp(8), width: wp(85), alignSelf: 'center'}}>
            <CustomText
              title={'Reset Password'}
              fontFamily={Fonts.SemiBold}
              fontSize={24}
            />
            <CustomText
              title={'Enter your new password down below.'}
              fontFamily={Fonts.Regular}
              fontSize={13}
            />
            <View style={{marginTop: hp(2)}}>
              {inputArray.map((item, index) => {
                return (
                  <View key={index} style={styles.inputContainer}>
                    <CustomInput
                      placeholder={item.placeholder}
                      onChange={e => {
                        setInputData(prevState => ({
                          ...prevState,
                          [item.name]: e,
                        }));
                      }}
                      value={inputData[item.name]}
                      secureTextEntry={item.secureTextEntry}
                      borderColor={Colors.lightGray}
                      errorMessage={
                        inputData.confirmPassword &&
                        inputData.password != inputData.confirmPassword &&
                        item?.errorMessage
                      }
                    />
                  </View>
                );
              })}
            </View>
            <CustomButton
              onPress={handleResetPassword}
              title={'Continue'}
              width={wp(85)}
              height={50}
              backgroundColor={Colors.skyBlue}
              style={{marginTop: hp(10)}}
            />
          </View>
        </View>
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: hp(1),
    alignSelf: 'center',
    width: '100%',
  },
  textContainer: {
    alignSelf: 'flex-end',
    marginRight: 5,
    height: 100,
  },
});

export default ResetPassword;
