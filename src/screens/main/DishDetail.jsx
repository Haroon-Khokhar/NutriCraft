import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomImage, CustomText, MainWrapper} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Icons, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const DishDetail = props => {
  const dish = props.route.params.dish;

  return (
    <MainWrapper bgImage={Images.bgImageHome}>
      <View
        style={{
          flex: 1,
        }}>
        <CustomImage source={dish.image} width={wp(100)} height={hp(40)} />
        <View>
          <View style={{marginTop: hp(3)}}>
            <CustomText
              title={dish.dishName}
              fontSize={20}
              fontFamily={Fonts.Medium}
            />
            <CustomText
              title={'By Rachel William'}
              fontSize={15}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: hp(1),
            }}>
            <Icons.clock height={20} width={20} />
            <CustomText
              title={'10 mins'}
              fontSize={16}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
              style={{marginLeft: wp(2), marginRight: wp(4)}}
            />
            <Icons.size height={25} width={25} />
            <CustomText
              title={'Medium'}
              fontSize={16}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
              style={{marginLeft: wp(2), marginRight: wp(4)}}
            />
            <Icons.kcal height={20} width={20} />
            <CustomText
              title={'512 cal'}
              fontSize={16}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
              style={{marginLeft: wp(2), marginRight: wp(4)}}
            />
          </View>
        </View>
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default DishDetail;
