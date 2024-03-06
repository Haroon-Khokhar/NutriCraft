import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomText, MainWrapper} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  return (
    <MainWrapper bgImage={Images.bgImageHome}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <CustomText title={'Profile Screen'} />
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default Profile;
