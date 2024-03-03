import React from 'react';
import {Text} from 'react-native';
import {Colors, Fonts} from '../../../assets';

const CustomText = ({title, color, style, fontSize, fontFamily}) => {
  return (
    <Text
      style={[
        style,
        {
          color: color || Colors.black,
          fontSize: fontSize || 14,
          fontFamily: fontFamily || Fonts.Regular,
        },
      ]}>
      {title}
    </Text>
  );
};

// const styles = StyleSheet.create({});

export default CustomText;
