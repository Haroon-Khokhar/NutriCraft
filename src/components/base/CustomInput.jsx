import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../../assets';
import CustomText from './CustomText';
import VectorIcons from './VectorIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomInput = ({
  value,
  onChange,
  placeholder,
  multiline,
  secureTextEntry,
  errorMessage,
  borderColor,
  keyboardType,
  onBlur,
  editable,
  height,
  fontSize,
  endIcon,
  iconFamily,
  iconName,
  startIcon,
  onEndIconPress,
}) => {
  const [hidePass, setHidePass] = useState(secureTextEntry || false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: errorMessage
              ? Colors.red
              : isFocused
              ? Colors.black
              : Colors.lightGray,
            backgroundColor: Colors.white,
            borderWidth: isFocused ? 1.3 : 1,
          },
        ]}>
        {startIcon && (
          <View
            style={{
              width: wp('15%'),
              marginRight: -wp('12%'),
              height: '70%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginTop: 2}}
              onPress={() => setHidePass(!hidePass)}>
              <VectorIcons
                family={iconFamily}
                name={iconName}
                color={Colors.lightGray}
                size={25}
              />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          editable={editable}
          style={[
            styles.input,
            multiline && styles.multiline,
            {
              height: height || 50,
              fontFamily: Fonts.Regular,
              fontSize: fontSize || 15,
              paddingRight: endIcon ? 60 : 0,
              paddingLeft: startIcon ? 40 : 20,
            },
          ]}
          value={value}
          keyboardType={keyboardType || 'default'}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGray}
          multiline={multiline}
          secureTextEntry={hidePass}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur && onBlur();
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={{marginLeft: -35}}
            onPress={() => setHidePass(!hidePass)}>
            <VectorIcons
              family="Ionicons"
              name={hidePass ? 'eye-off-outline' : 'eye-outline'}
              color={Colors.lightGray}
              size={22}
            />
          </TouchableOpacity>
        )}
        {endIcon && (
          <View
            style={{
              width: wp('12%'),
              borderLeftWidth: 1,
              borderLeftColor: Colors.lightGray,
              marginLeft: -wp('12%'),
              height: '70%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginTop: 2}}
              onPress={() => {
                setHidePass(!hidePass);
                onEndIconPress();
              }}>
              <VectorIcons
                family={iconFamily}
                name={iconName}
                color={Colors.lightGray}
                size={25}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!!errorMessage && (
        <View style={styles.errorMessage}>
          <CustomText
            title={`${errorMessage}*`}
            color={Colors.red}
            fontFamily={Fonts.Regular}
            fontSize={13}
            fontStyle="italic"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 100,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    padding: 0,
    margin: 0,
    paddingLeft: 20,
    width: '100%',
    color: Colors.black,
  },
  multiline: {
    height: 100,
  },
  errorMessage: {
    marginLeft: 20,
  },
});

export default CustomInput;
