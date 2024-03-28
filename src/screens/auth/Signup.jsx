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
  const [inputData, setInputData] = useState({
    fullName: '',
    email: '',
    password: '',
    weight: '',
    weight: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const inputArray = [
    {
      name: 'fullName',
      placeholder: 'Enter full name',
    },
    {
      name: 'email',
      placeholder: 'Enter email',
    },
    {
      name: 'password',
      placeholder: 'Enter Password',
      secureTextEntry: true,
    },
    {
      name: 'weight',
      placeholder: 'Enter weight',
    },
    {
      name: 'age',
      placeholder: 'Enter age',
    },
  ];

  const handleSIgnUp = async () => {
    console.log('signUp input data=====', inputData);
    try {
      setLoading(true);
      const credential = await auth().createUserWithEmailAndPassword(
        inputData.email,
        inputData.password,
      );

      await firestore().collection('users').doc(credential.user.uid).set({
        name: inputData.fullName,
        weight: inputData.weight,
        age: inputData.age,
        email: inputData.email,
        password: inputData.password,
      });

      setLoading(false);
      console.log('successfully signed in.');

      navigation.replace('tabStack', {screen: 'home'});
      Alert.alert('Signup Successful', 'You can now sign in.');
    } catch (error) {
      console.log('signup error======', error);
      setLoading(false);
      Alert.alert('Error', error.message);
    }
    // navigation.navigate('tabStack');
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
                    keyboardType={
                      item.name == 'age' || item.name == 'weight'
                        ? 'numeric'
                        : item.name == 'email'
                        ? 'email-address'
                        : 'default'
                    }
                    value={inputData[item.name]}
                    secureTextEntry={item.secureTextEntry}
                    borderColor={Colors.lightGray}
                  />
                </View>
              );
            })}
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
