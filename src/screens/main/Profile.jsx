import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomButton, CustomText, MainWrapper} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth().signOut();
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'welcomeScreen'}],
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
          fontSize={20}
          style={{marginTop: 30}}
        />
        <CustomButton
          title={'Log out'}
          style={{marginTop: 80}}
          backgroundColor={Colors.skyBlue}
          onPress={handleLogout}
          loading={loading}
          disabled={loading}
        />
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default Profile;
