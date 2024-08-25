import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Linking, ToastAndroid } from 'react-native';
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
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { openCamera } from 'react-native-image-crop-picker';

const APP_ID = '6408aaaf';
const APP_KEY = '38b3802b487f80df555360b87a6e6fac';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const [dishes, setDishes] = useState([]);

  const onCameraClick = () => {
    const imageOption = {
      mediaType: 'photo',
      quality: 0.8,
      compressImageQuality: 0.8,
      forceJpg: true,
    };
    try {
      setTimeout(async () => {
        const result = await openCamera(imageOption);
        if (result) {
          console.log('result==>>', result);
          ToastAndroid.show(
            'Image clicked with camera.',
            ToastAndroid.SHORT,
          );
        }
      }, 500);
    } catch (error) {
      console.log('takePhotoFromCamera error', error);
    }
  };

  useEffect(() => {
      searchRecipeByName(searchText);
  }, [searchText]);

  const searchRecipeByName = async query => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      );
      const data = await response.json();
      setDishes(data?.hits);
      setLoading(false);
    } catch (error) {
      console.error('search recipe error:>', error);
      console.log(false);
    }
  };

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
            title={'Enter search text or capture'}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
          <CustomText
            title={'image To search a recipe'}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
        </View>
        <View>
          <CustomImage
            source={Images.user}
            height={40}
            width={40}
            style={{ backgroundColor: 'grey' }}
            resizeMode={'contain'}
            borderRadius={20}
          />
        </View>
      </View>
      <View style={{ marginVertical: hp('2.5%') }}>
        <CustomInput
          placeholder={'Search by scan image '}
          value={searchText}
          onChange={text => setSearchText(text)}
          height={40}
          fontSize={13}
          endIcon
          secureTextEntry={false}
          iconFamily={'EvilIcons'}
          iconName={'camera'}
          onEndIconPress={onCameraClick}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText
          title={'Searched Dishes'}
          fontFamily={Fonts.Medium}
          fontSize={20}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={dishes}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item, index }) => {
            return (
              <DishCard
                key={index}
                image={item?.recipe?.image}
                dishName={item?.recipe?.label}
                isLiked={item?.isLiked}
                handleHowToMake={() => Linking.openURL(item.recipe.url)}
                isImageUrl={true}
              />
            );
          }}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                height: heightPercentageToDP(55),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {loading ? (
                <ActivityIndicator color={Colors.black} size={'large'} />
              ) : (
                <CustomText
                  title="No dishes to display."
                  color={'black'}
                  fontSize={16}
                />
              )}
            </View>
          }
        />
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default Search;
