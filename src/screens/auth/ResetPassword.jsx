import React from 'react';
import {Text} from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';

const ResetPassword = () => {
  return (
    <ScreenWrapper>
      <CustomText
        title={'Reset passowrd screen'}
        fontSize={18}
        style={{marginTop: 40}}
      />
    </ScreenWrapper>
  );
};

// const styles = StyleSheet.create({});

export default ResetPassword;
