import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageModal from 'react-native-image-modal';
import {Colors} from '../../../assets';

const CustomImage = ({source, style, withModal, width, height, resizeMode}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);

  if (withModal) {
    return (
      <View style={{width: width, height: height}}>
        <ImageModal
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
          resizeMode="cover"
          modalImageResizeMode="contain"
          source={source}
          style={[
            style,
            {height: '100%', width: '100%', backgroundColor: Colors.lightGray},
          ]}
        />
        {isImageLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            color={Colors.lightGray}
            size="large"
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={{width: width, height: height, alignSelf: 'center'}}>
        <FastImage
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
          resizeMode={resizeMode || 'cover'}
          source={source}
          style={[style, {height: '100%', width: '100%'}]}
        />
        {isImageLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            color={Colors.alphaLightGray}
            size="large"
          />
        )}
      </View>
    );
  }
};

export default CustomImage;
