import React from 'react';
import {View, Text} from 'react-native';
import {CustomImage, CustomButton, CustomText} from '../../components';
import {Images, Colors, Fonts} from '../../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <CustomImage source={Images.welcome} width={'100%'} height={'70%'} />
      <View
        style={{
          width: '100%',
          height: '30%',
          marginHorizontal: wp(5),
          marginVertical: hp(3),
        }}>
        <CustomText
          title={'Start'}
          fontSize={48}
          fontFamily={Fonts.ExtraBold}
          style={{marginTop: -20}}
        />
        <CustomText
          title={'cooking'}
          fontSize={48}
          fontFamily={Fonts.ExtraBold}
          style={{marginTop: -20}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            height: '35%',
            justifyContent: 'space-between',
          }}>
          <CustomButton
            title={'Login'}
            width={'40%'}
            height={'60%'}
            backgroundColor={Colors.skyBlue}
            onPress={() => navigation.navigate('login')}
          />
          <CustomButton
            title={'Signup'}
            width={'40%'}
            height={'60%'}
            backgroundColor={Colors.darkBlueButton}
            onPress={() => navigation.navigate('signUp')}
          />
        </View>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default Welcome;
