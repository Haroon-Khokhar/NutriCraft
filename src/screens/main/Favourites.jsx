import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  CustomImage,
  CustomInput,
  CustomText,
  MainWrapper,
  DishCard,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const Favourites = () => {
  const favouriteDishes = [
    {
      image: Images.dish1,
      dishName: 'Potato dish',
      isLiked: true,
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
            title={'My Favourite Dishes'}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
        </View>
      </View>
      <View style={{marginVertical: hp('2.5%')}}>
        <CustomInput
          placeholder={'Search by scan image '}
          height={40}
          fontSize={13}
          
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
          title={'Favourtie Dishes'}
          fontFamily={Fonts.Medium}
          fontSize={20}
        />
        <CustomText
          title={'See all'}
          fontFamily={Fonts.Medium}
          fontSize={14}
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
        {favouriteDishes.map((dish, index) => {
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

export default Favourites;
