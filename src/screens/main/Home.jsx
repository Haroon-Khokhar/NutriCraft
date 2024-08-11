import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  CustomText,
  AuthWrapper,
  MainWrapper,
  VectorIcons,
  DishCard,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const popularDishes = [
    {
      image: Images.dish1,
      dishName: 'Potato dish',
      isLiked: true,
    },
    {
      image: Images.dish2,
      dishName: 'Potato Cabbage',
      isLiked: false,
    },
    {
      image: Images.dish3,
      dishName: 'capsicum or chili',
      isLiked: false,
    },
    {
      image: Images.dish4,
      dishName: 'Green peas',
      isLiked: true,
    },
  ];

  return (
    <MainWrapper bgImage={Images.bgImageHome}>
      <View
        style={{
          marginTop: hp('5%'),
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
            style={{backgroundColor: 'grey'}}
            resizeMode={'contain'}
            borderRadius={20}
          />
        </View>
      </View>
      <View style={{marginVertical: hp('2.5%')}}>
        <CustomInput
          placeholder={'Search by scan image '}
          height={40}
          fontSize={13}
          endIcon
          iconFamily={'EvilIcons'}
          iconName={'camera'}
          onEndIconPress={() => {
            navigation.navigate('camera');
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText
          title={'Popular Dishes'}
          fontFamily={Fonts.Medium}
          fontSize={20}
        />
        <CustomText
          title={'See all'}
          fontFamily={Fonts.Medium}
          fontSize={16}
          color={Colors.skyBlue}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: hp('5%'),
        }}>
        {popularDishes.map((dish, index) => {
          return (
            <DishCard
              key={index}
              image={dish.image}
              dishName={dish.dishName}
              isLiked={dish.isLiked}
              handleHowToMake={() => navigation.navigate('dishDetail', {dish})}
            />
          );
        })}
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default Home;
