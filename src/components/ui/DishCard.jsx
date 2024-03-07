import React from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {CustomButton, CustomImage, CustomText, VectorIcons} from '../base';
import {Colors, Fonts} from '../../../assets';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const DishCard = ({image, dishName, isLiked, handleHowToMake}) => {
  return (
    <View style={{width: wp('40%'), marginVertical: hp('1.5%')}}>
      <TouchableOpacity
        style={{borderRadius: wp('5%')}}
        onPress={handleHowToMake}>
        <CustomImage
          source={image}
          height={hp('18%')}
          width={'100%'}
          borderRadius={wp('5%')}
        />
      </TouchableOpacity>
      <View style={{marginVertical: hp('.5%'), marginTop: hp('1%')}}>
        <CustomText title={dishName} fontSize={16} fontFamily={Fonts.Medium} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomButton
          title={'How to make'}
          backgroundColor={Colors.skyBlue}
          borderRadius={8}
          fontSize={10}
          fontFamily={Fonts.Medium}
          width={'55%'}
          height={hp('4%')}
          onPress={handleHowToMake}
        />
        <TouchableOpacity>
          <VectorIcons
            name={isLiked ? 'heart' : 'heart-outline'}
            family={'Ionicons'}
            size={hp('3.5%')}
            color={Colors.skyBlue}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DishCard;
