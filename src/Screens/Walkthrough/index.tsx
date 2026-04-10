import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../Navigation/stackNavigator';
import { CustomText } from '../../Components/CustomText';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../Theme/colors';

const { width } = Dimensions.get('window');

interface OnboardingData {
  id: string;
  title1: string;
  title2: string;
  description: string;
  image: any;
}

const DATA: OnboardingData[] = [
  {
    id: '1',
    title1: 'Một chạm',
    title2: 'tới hàng vàn tiện ích',
    description:
      'Trải nghiệm 100+ ứng dụng với những ưu đãi chỉ dành riêng cho VietnamPost-er',
    image: require('../../Assets/Images/Group.png'),
  },
  {
    id: '2',
    title1: 'Kết nối',
    title2: 'với đồng nghiệp dễ dàng',
    description:
      'Rút gọn khoảng cách giữa VietnamPost-er qua một khung chat đơn giản',
    image: require('../../Assets/Images/phone.png'),
  },
  {
    id: '3',
    title1: 'Nắm bắt',
    title2: 'thông tin mọi lúc mọi nơi',
    description:
      'Cập nhật mọi thông báo, tin tức quan trọng từ Tổng công ty dù bạn đang ở nơi đâu',
    image: require('../../Assets/Images/phone2.png'),
  },
];

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Walkthrough'>;
};

const WalkthroughScreen = ({ navigation }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const onNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item }: { item: OnboardingData }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <CustomText variant="bold" size={28} style={styles.titleLine1}>
          {item.title1}
        </CustomText>
        <CustomText
          variant="bold"
          size={28}
          color={colors.primary}
          style={styles.titleLine2}
        >
          {item.title2}
        </CustomText>
        <CustomText variant="regular" size={16} style={styles.subtitle}>
          {item.description}
        </CustomText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.statusBar}>
        <TouchableOpacity>
          <Image source={require('../../Assets/Icons/arrowLeft.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          {DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                currentIndex >= index
                  ? styles.activeProgress
                  : styles.inactiveProgress,
              ]}
            />
          ))}
        </View>
      </View>
      <View>
        <Image
          style={styles.childUnionLeft}
          source={require('../../Assets/Images/childUnionLeft.png')}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        bounces={false}
      />
      {currentIndex === DATA.length - 1 ? (
        <View style={styles.footer}>
          <PrimaryButton title={'Bắt đầu trải nghiệm'} onPress={onNext} />
        </View>
      ) : null}
      <View>
        <Image
          style={styles.childUnionRight}
          source={require('../../Assets/Images/childUnionRight.png')}
        />
      </View>
    </SafeAreaView>
  );
};

export default WalkthroughScreen;
