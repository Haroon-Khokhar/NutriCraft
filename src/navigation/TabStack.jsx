import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {VectorIcons} from '../components';
import {Colors} from '../../assets';
import {Favourites, Home, Profile, Search} from '../screens/main';
import {View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={'home'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let rn = route.name;

          if (rn === 'home') {
            return focused ? (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <VectorIcons
                  name={'home-outline'}
                  family={'MaterialCommunityIcons'}
                  size={28}
                  color={focused ? Colors.skyBlue : Colors.lightGray}
                />
              </View>
            ) : (
              <VectorIcons
                name={'home-outline'}
                family={'MaterialCommunityIcons'}
                size={28}
                color={focused ? Colors.skyBlue : Colors.lightGray}
              />
            );
          } else if (rn === 'search') {
            return focused ? (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <VectorIcons
                  name={'search'}
                  family={'Fontisto'}
                  size={20}
                  color={Colors.skyBlue}
                />
              </View>
            ) : (
              <VectorIcons
                name={'search'}
                family={'Fontisto'}
                size={20}
                color={Colors.lightGray}
              />
            );
          } else if (rn === 'favourites') {
            return focused ? (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <VectorIcons
                  name={'heart'}
                  family={'Octicons'}
                  size={22}
                  color={Colors.skyBlue}
                />
              </View>
            ) : (
              <VectorIcons
                name={'heart'}
                family={'Octicons'}
                size={22}
                color={Colors.lightGray}
              />
            );
          } else if (rn === 'profile') {
            return focused ? (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <VectorIcons
                  name={'person'}
                  family={'Octicons'}
                  size={22}
                  color={Colors.skyBlue}
                />
              </View>
            ) : (
              <VectorIcons
                name={'person'}
                family={'Octicons'}
                size={22}
                color={Colors.lightGray}
              />
            );
          }
        },
        headerShown: false,
        tabBarStyle: {
          height: 50,
          width: widthPercentageToDP(100) + 2,
          alignSelf: 'center',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: Colors.skyBlue,
        },
      })}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name={'home'} component={Home} />
      <Tab.Screen name={'search'} component={Search} />
      <Tab.Screen name={'favourites'} component={Favourites} />
      <Tab.Screen name={'profile'} component={Profile} />
    </Tab.Navigator>
  );
};

export default TabStack;
