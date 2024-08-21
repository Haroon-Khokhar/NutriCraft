import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors, Fonts, Icons, Images } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import StarRating from 'react-native-star-rating-widget';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DishDetail = props => {
  const dish = props.route.params.dish;
  const refRBSheet = useRef();

  const ingedients = [
    {
      name: 'Potato',
      image: Images.potato,
      quantity: '500',
    },
    {
      name: 'Onion',
      image: Images.onion,
      quantity: '100',
    },
    {
      name: 'Capsicum',
      image: Images.capsicum,
      quantity: '250',
    },
    {
      name: 'Tomato',
      image: Images.tomato,
      quantity: '350',
    },
  ];

  const [rating, setRating] = useState(0);
  const [saveRatingLoading, SetSaveRatingLoading] = useState(false);

  useEffect(() => {
    // setRating(2)
    fetchRating();
  }, [refRBSheet]);

  const fetchRating = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const loggedInUser = await user.getIdTokenResult();
        const docRef = firestore()
          .collection('users')
          .doc(loggedInUser?.claims?.email);
        const userData = (await docRef.get()).data();
        setRating(userData?.rating);
      }
    } catch (error) {
      console.log('fetching ratng error:>', error);
    }
  };

  const handleSaveRating = async () => {
    SetSaveRatingLoading(true);
    try {
      const user = auth().currentUser;
      if (user) {
        const loggedInUser = await user.getIdTokenResult();
        const docRef = firestore()
          .collection('users')
          .doc(loggedInUser?.claims?.email);
        const updatedUserData = { rating: rating };
        await docRef.update(updatedUserData);
        ToastAndroid.show('Rating updated successfully', ToastAndroid.SHORT);
        SetSaveRatingLoading(false)
      }
    } catch (error) {
      console.log('saving rating error:>', error);
      SetSaveRatingLoading(false)
    }
  };

  return (
    <MainWrapper bgImage={Images.bgImageHome}>
      <View
        style={{
          flex: 1,
        }}>
        <CustomImage source={dish.image} width={wp(100)} height={hp(40)} />
        <View>
          <View style={{ marginTop: hp(3) }}>
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
              style={{ marginLeft: wp(2), marginRight: wp(4) }}
            />
            <Icons.size height={25} width={25} />
            <CustomText
              title={'Medium'}
              fontSize={16}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
              style={{ marginLeft: wp(2), marginRight: wp(4) }}
            />
            <Icons.kcal height={20} width={20} />
            <CustomText
              title={'512 cal'}
              fontSize={16}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
              style={{ marginLeft: wp(2), marginRight: wp(4) }}
            />
          </View>
          <View style={{ marginTop: hp(3) }}>
            <CustomText
              title={'Description'}
              fontSize={20}
              fontFamily={Fonts.Medium}
            />
            <CustomText
              title={
                'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of'
              }
              fontSize={15}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
            />
          </View>
          <View style={{ marginTop: hp(3) }}>
            <CustomText
              title={'Ingredients'}
              fontSize={20}
              fontFamily={Fonts.Medium}
            />
            {ingedients.map((ingerdient, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: hp(1.5),
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomImage
                      source={ingerdient.image}
                      width={wp(10)}
                      height={wp(10)}
                      borderRadius={5}
                    />
                    <CustomText
                      title={ingerdient.name}
                      fontSize={16}
                      fontFamily={Fonts.Regular}
                      color={Colors.black}
                      style={{ marginLeft: wp(3), marginRight: wp(4) }}
                    />
                  </View>
                  <CustomText
                    title={`${ingerdient.quantity} g`}
                    fontSize={15}
                    fontFamily={Fonts.Regular}
                    color={Colors.black}
                  />
                </View>
              );
            })}
            <View style={{ marginTop: hp(1.5) }}>
              <CustomButton
                title={'Made it'}
                fontSize={15}
                height={hp(7)}
                marginVertical={hp(2)}
                width={'100%'}
                backgroundColor={Colors.skyBlue}
                onPress={() => refRBSheet.current.open()}
              />
            </View>
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          height={300}
          closeOnPressBack
          draggable
          // dragOnContent
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            },
            draggableIcon: {
              display: 'none',
            },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: 'visible',
            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              padding: 5,
            }}
            onPress={() => {
              refRBSheet.current.close();
            }}>
            <CustomImage source={Images.close} height={12} width={12} />
          </TouchableOpacity>
          <View
            style={{ top: -wp(25), alignSelf: 'center', alignItems: 'center' }}>
            <CustomImage source={Images.logo} width={wp(55)} height={wp(55)} />
            <CustomText
              title={
                rating == 1
                  ? 'Very Poor'
                  : rating == 2
                    ? 'Poor'
                    : rating == 3
                      ? 'Average'
                      : rating == 4
                        ? 'Good'
                        : rating == 5
                          ? 'Excellant'
                          : 'Rate your experience with us!'
              }
              fontSize={17}
              fontFamily={Fonts.Medium}
              style={{ marginTop: rating ? 10 : 20 }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: wp(55),
                justifyContent: 'space-evenly',
                marginTop: 15,
              }}>
              <StarRating
                rating={rating}
                onChange={setRating}
                enableHalfStar={false}
                enableSwiping
              />
            </View>
            {rating ? (
              <CustomText
                title={'Thanks for giving us rating!'}
                fontSize={17}
                fontFamily={Fonts.Medium}
                style={{ marginTop: 10 }}
              />
            ) : (
              <></>
            )}
            <CustomButton
              title={'Rate Us'}
              style={{ marginTop: 10 }}
              backgroundColor={Colors.skyBlue}
              onPress={handleSaveRating}
              loading={saveRatingLoading}
              disabled={saveRatingLoading}
              width={widthPercentageToDP(30)}
            />
          </View>
        </RBSheet>
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({});

export default DishDetail;
