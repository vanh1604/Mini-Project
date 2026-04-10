import {
  ImageSourcePropType,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import Card from './card';
import { scale } from '../../../Utils/scaling';
import Carousel from 'react-native-reanimated-carousel';
import { colors } from '../../../Theme/colors';

const DATA: { image: ImageSourcePropType; title: string; subTitle: string }[] =
  [
    {
      image: require('../../../Assets/Images/breakNews.png'),
      title:
        'Bưu điện thành phố Đà Nẵng công bố Quyết định giao nhiệm vụ Giám đốc Bưu điện xã, phương',
      subTitle: 'TIN HOẠT ĐỘNG',
    },
    {
      image: require('../../../Assets/Images/breakNews.png'),
      title:
        'Bưu điện thành phố Đà Nẵng công bố Quyết định giao nhiệm vụ Giám đốc Bưu điện xã, phương',
      subTitle: 'TIN HOẠT ĐỘNG',
    },
    {
      image: require('../../../Assets/Images/breakNews.png'),
      title:
        'Bưu điện thành phố Đà Nẵng công bố Quyết định giao nhiệm vụ Giám đốc Bưu điện xã, phương',
      subTitle: 'TIN HOẠT ĐỘNG',
    },
    {
      image: require('../../../Assets/Images/breakNews.png'),
      title:
        'Bưu điện thành phố Đà Nẵng công bố Quyết định giao nhiệm vụ Giám đốc Bưu điện xã, phương',
      subTitle: 'TIN HOẠT ĐỘNG',
    },
  ];

const screenWidth = Dimensions.get('window').width;

const Notification = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Carousel
          loop={false}
          width={scale(276)}
          height={scale(240)}
          windowSize={5}
          style={{ width: screenWidth }}
          data={DATA}
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={({ item }) => (
            <Card
              image={item.image}
              title={item.title}
              category={item.subTitle}
            />
          )}
        />
      </View>

      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {},
  carouselWrapper: {
    marginLeft: scale(16),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(6),
    marginTop: scale(-12),
    marginBottom: scale(4),
  },
  dot: {
    height: scale(6),
    borderRadius: scale(3),
  },
  activeDot: {
    width: scale(20),
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: scale(6),
    backgroundColor: '#D9D9D9',
  },
});
