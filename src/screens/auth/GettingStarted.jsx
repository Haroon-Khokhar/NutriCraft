import React from 'react';
import {Text, View} from 'react-native';
import {Colors, Fonts, Images} from '../../../assets';
import {CustomButton, ScreenWrapper} from '../../components';
import {CustomText} from '../../components';
import {CustomImage} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const GettingStarted = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <CustomImage
        source={Images.gettingStarted}
        width={'100%'}
        height={'90%'}
      />
      <View
        style={{
          width: '100%',
          height: '10%',
          alignItems: 'center',
          backgroundColor: Colors.skyBlue,
          justifyContent: 'center',
        }}>
        <CustomButton
          title={'Get Started'}
          onPress={() => navigation.navigate('welcomeScreen')}
          backgroundColor={Colors.white}
          Textcolor={Colors.skyBlue}
          width={wp(80)}
          fontFamily={Fonts.Medium}
          height={'60%'}
        />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default GettingStarted;
