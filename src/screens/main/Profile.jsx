import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import {
  CustomButton,
  CustomInput,
  CustomText,
  MainWrapper,
} from '../../components';
import { Colors, Fonts, Images } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const inputsData = [
    {
      name: 'email',
      placeholder: 'Enter email',
      value: '',
      error: '',
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    {
      name: 'name',
      placeholder: 'Enter full name',
      value: '',
      error: '',
      regex: /.*/,
    },
    {
      name: 'weight',
      placeholder: 'Enter weight',
      value: '',
      error: '',
      regex: /.*/,
    },
    {
      name: 'age',
      placeholder: 'Enter age',
      value: '',
      error: '',
      regex: /.*/,
    },
  ];

  const [signupFormData, setSignupFormData] = useState(inputsData);
  
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

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const loggedInUser = await user.getIdTokenResult();
        const docRef = firestore()
          .collection('users')
          .doc(loggedInUser?.claims?.email);
        const userData = (await docRef.get()).data();
        console.log('User Data:', userData);

        const updatedFormData = signupFormData.map((input) => ({
          ...input,
          value: userData[input.name] || '',
        }));
        
        setSignupFormData(updatedFormData);
      }
    } catch (error) {
      console.error('Fetch User Data Error:', error);
    }
  }; 

  const updateUserData = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const loggedInUser = await user.getIdTokenResult();
        const docRef = firestore()
          .collection('users')
          .doc(loggedInUser?.claims?.email);
        
        const updatedUserData = {};
  
        signupFormData.forEach((input) => {
          if (input.name !== 'email') {
            updatedUserData[input.name] = input.value;
          }
        });
        await docRef.update(updatedUserData);
        ToastAndroid.show('User data updated successfully', ToastAndroid.SHORT)
      }
    } catch (error) {
      console.error('Update User Data Error:', error);
      ToastAndroid.show('Failed to update user data', ToastAndroid.SHORT)
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth().signOut();
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'welcomeScreen' }],
      });
    } catch (error) {
      setLoading(false);
      console.error('Logout Error:', error);
    }
  };

  return (
    <MainWrapper bgImage={Images.bgImageHome}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <CustomText
          title={'Profile Screen'}
          fontSize={24}
          fontFamily={Fonts.SemiBold}
          style={{ marginTop: heightPercentageToDP(7) }}
        />
        <View style={{marginTop:heightPercentageToDP(7)}}>
        {signupFormData.map((item, index) => (
          <View key={index}>
           <CustomText
          title={item?.name}
          fontSize={14}
          style={{ marginTop: 10, marginBottom:-5, marginLeft:10 }}
        />
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
              editable={index>0}
            />
          </View>
        ))}
        </View>
        <CustomButton
          title={'Save Update'}
          style={{ marginTop: 80, width:'100%' }}
          backgroundColor={Colors.skyBlue}
          onPress={updateUserData}
          loading={loading}
          disabled={loading}
          width={'80%'}
          height={heightPercentageToDP(6)}
        />
        <CustomButton
          title={'Log out'}
          style={{ marginTop: 10}}
          backgroundColor={Colors.skyBlue}
          onPress={handleLogout}
          loading={loading}
          disabled={loading}
          width={'50%'}
          height={heightPercentageToDP(5)}
        />
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default Profile;
