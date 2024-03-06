import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomImage, CustomText, MainWrapper} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../../assets';
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
          <View>
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
        </View>
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default DishDetail;
