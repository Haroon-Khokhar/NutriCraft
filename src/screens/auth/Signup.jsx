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
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [signupFormData, setSignupFormData] = useState([
    {
      name: 'fullName',
      placeholder: 'Enter full name',
      value: '',
      error: '',
      regex: /.*/, // Default regex, any non-empty string is valid
    },
    {
      name: 'email',
      placeholder: 'Enter email',
      value: '',
      error: '',
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email regex pattern
    },
    {
      name: 'password',
      placeholder: 'Enter Password',
      value: '',
      error: '',
      regex: /^.{6,}$/, // Password length regex pattern
      secureTextEntry: true,
    },
    {
      name: 'weight',
      placeholder: 'Enter weight',
      value: '',
      error: '',
      regex: /.*/, // Default regex, any non-empty string is valid
    },
    {
      name: 'age',
      placeholder: 'Enter age',
      value: '',
      error: '',
      regex: /.*/, // Default regex, any non-empty string is valid
    },
  ]);

  const handleInputChange = (name, value) => {
    setSignupFormData(prevState => {
      return prevState.map(item => {
        if (item.name === name) {
          return {...item, value: value};
        }
        return item;
      });
    });
  };

  const handleSIgnUp = async () => {
    let errors = {};
    signupFormData.forEach(item => {
      if (!item.value.trim()) {
        errors[item.name] = `${item.name} is Required.`;
      } else if (!item.regex.test(item.value)) {
        errors[item.name] =
          item.name === 'email'
            ? 'Invalid email address'
            : item.name === 'password'
            ? 'Password must be at least 6 characters'
            : '';
      } else {
        errors[item.name] = '';
      }
    });
    setSignupFormData(prevState => {
      return prevState.map(item => {
        return {...item, error: errors[item.name]};
      });
    });

    const hasErrors = Object.values(errors).some(error => error);
    if (!hasErrors) {
      try {
        setLoading(true);
        const credential = await auth().createUserWithEmailAndPassword(
          signupFormData[1].value,
          signupFormData[2].value,
        );

        // await firestore().collection('users').doc(credential.user.uid).set({
        //   name: signupFormData[0].value,
        //   email: signupFormData[1].value,
        //   password: signupFormData[2].value,
        //   weight: signupFormData[3].value,
        //   age: signupFormData[4].value,
        // });

        setLoading(false);
        console.log('successfully signed in.');

        navigation.reset({
          index: 0,
          routes: [{name: 'tabStack'}],
        });
        Alert.alert('Success', 'Signed in with Nutricraft successfully.');
      } catch (error) {
        console.log('signup error======', error);
        setLoading(false);
        Alert.alert('Error', error.message);
      }
    }
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
              title={'Signup'}
              fontFamily={Fonts.SemiBold}
              fontSize={24}
            />
            {signupFormData.map((item, index) => (
              <View key={index} style={styles.inputContainer}>
                <CustomInput
                  placeholder={item.placeholder}
                  onChange={text => handleInputChange(item.name, text)}
                  keyboardType={
                    item.name === 'age' || item.name === 'weight'
                      ? 'numeric'
                      : item.name === 'email'
                      ? 'email-address'
                      : 'default'
                  }
                  value={item.value}
                  secureTextEntry={item.secureTextEntry}
                  borderColor={Colors.lightGray}
                  errorMessage={item.error}
                />
              </View>
            ))}
            <CustomButton
              onPress={handleSIgnUp}
              title={'Continue'}
              width={wp(85)}
              height={50}
              backgroundColor={Colors.skyBlue}
              style={{marginTop: hp(5)}}
              loading={loading}
              disabled={loading}
            />
            <CustomText />
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
            <CustomText title={'Do you have account?'} />
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <CustomText
                title={'Login'}
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

export default SignUp;
