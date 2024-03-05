import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../../assets';
import VectorIcons from '../base/VectorIcons';
import CustomText from './CustomText';

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
  placeholderText,
  editable,
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
            borderWidth: isFocused ? 1.3 : 1,
          },
        ]}>
        <TextInput
          editable={editable}
          style={[styles.input, multiline && styles.multiline]}
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
        {secureTextEntry ? (
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
        ) : (
          <></>
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
    height: 50,
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
