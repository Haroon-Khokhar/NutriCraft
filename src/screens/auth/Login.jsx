/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
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
import auth from '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState([
    {
      name: 'email',
      value: '',
      placeholder: 'user@gmail.com',
      error: '',
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    {
      name: 'password',
      value: '',
      placeholder: '***************',
      secureTextEntry: true,
      error: '',
      regex: /^.{6,}$/,
    },
  ]);

  const handleLogin = async () => {
    let errors = {};
    loginFormData.forEach(item => {
      if (!item.value.trim()) {
        errors[item.name] = `${item.name} is Required.`;
      } else if (!item.regex.test(item.value)) {
        errors[item.name] =
          item.name === 'email'
            ? 'Invalid email address'
            : 'Password must be at least 6 characters';
      } else {
        errors[item.name] = '';
      }
    });
    setLoginFormData(prevState => {
      return prevState.map(item => {
        return {...item, error: errors[item.name]};
      });
    });

    const hasErrors = Object.values(errors).some(error => error);
    if (!hasErrors) {
      try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(
          loginFormData[0].value,
          loginFormData[1].value,
        );
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'tabStack'}],
        });
        Alert.alert('Success', 'Logged in successfully.');
      } catch (error) {
        console.log('login error:', error.code, error.message);
        setLoading(false);
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleInputChange = (name, value) => {
    setLoginFormData(prevState => {
      return prevState.map(item => {
        if (item.name === name) {
          return {...item, value: value};
        }
        return item;
      });
    });
  };

  return (
    <AuthWrapper>
      <View
        style={{
          flex: 1,
          height: hp(100),
          justifyContent: 'space-between',
        }}>
        <View>
          <CustomImage
            source={Images.auth1}
            width={wp(80)}
            height={hp(20)}
            resizeMode={'contain'}
          />
        </View>
        <View>
          <View style={{marginTop: hp(8), width: wp(85), alignSelf: 'center'}}>
            <CustomText
              title={'Login'}
              fontFamily={Fonts.SemiBold}
              fontSize={24}
            />
            {loginFormData.map((item, index) => {
              console.log(item.error);
              return (
                <View key={index} style={styles.inputContainer}>
                  <CustomInput
                    placeholder={item.placeholder}
                    onChange={text => handleInputChange(item.name, text)}
                    keyboardType={
                      item.name == 'email' ? 'email-address' : 'default'
                    }
                    value={item.value}
                    secureTextEntry={item.secureTextEntry}
                    borderColor={Colors.lightGray}
                    errorMessage={item.error}
                  />
                </View>
              );
            })}
            <TouchableOpacity
              onPress={() => navigation.navigate('forgotPassword')}>
              <CustomText
                title={'Forgot password'}
                color={Colors.skyBlue}
                style={{
                  textDecorationLine: 'underline',
                  alignSelf: 'flex-end',
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
            <CustomButton
              onPress={handleLogin}
              title={'login'}
              width={wp(85)}
              height={50}
              backgroundColor={Colors.skyBlue}
              style={{marginTop: hp(10)}}
              loading={loading}
              disabled={loading}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: wp(40),
              marginTop: hp(5),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: Colors.lightGray,
                width: '40%',
                height: 0,
              }}
            />
            <CustomText
              title={'OR'}
              fontFamily={Fonts.SemiBold}
              fontSize={18}
              style={{marginHorizontal: 5}}
            />
            <View
              style={{
                borderWidth: 0.5,
                borderColor: Colors.lightGray,
                width: '40%',
                height: 0,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: wp(25),
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: hp(2),
            }}>
            <TouchableOpacity>
              <CustomImage
                source={Images.facebookLogo}
                width={35}
                height={35}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <CustomImage source={Images.googleLogo} width={32} height={32} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 5,
            }}>
            <CustomText title={'Don’t have an account?'} />
            <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
              <CustomText
                title={'Signup'}
                color={Colors.skyBlue}
                fontFamily={Fonts.Bold}
                style={{marginHorizontal: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    alignSelf: 'center',
    width: '100%',
  },
  textContainer: {
    alignSelf: 'flex-end',
    marginRight: 5,
    height: 100,
  },
});

export default Login;
