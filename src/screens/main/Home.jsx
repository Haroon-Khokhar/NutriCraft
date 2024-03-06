import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  CustomText,
  AuthWrapper,
  MainWrapper,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <MainWrapper bgImage={Images.bgImageHome}>
      <View
        style={{
          marginTop: hp('8%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <CustomText
            title={`Hello ${'Ennie'}`}
            fontSize={15}
            color={Colors.lightGray}
          />
          <CustomText
            title={'what would you like'}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
          <CustomText
            title={'to cook today ?'}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
        </View>
        <View>
          <CustomImage
            source={Images.user}
            height={40}
            width={40}
            style={{borderRadius: 20, backgroundColor: 'grey'}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default Home;
