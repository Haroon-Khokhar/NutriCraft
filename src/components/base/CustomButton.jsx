import React from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {Colors} from '../../../assets';
import CustomText from './CustomText';

const CustomButton = ({
  onPress,
  title,
  backgroundColor,
  width,
  height,
  fontSize,
  fontWeight,
  Textcolor,
  loading,
  disabled,
  borderRadius,
  fontFamily,
  style,
  marginVertical,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled || false}
      style={[
        style,
        {
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          height: height || 40,
          width: width || '50%',
          borderRadius: borderRadius || 50,
          backgroundColor: backgroundColor || Colors.darkGray,
          marginVertical: marginVertical || 0,
        },
      ]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <CustomText
          title={title}
          fontSize={fontSize || 18}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          color={disabled ? Colors.darkGray : Textcolor || Colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
