import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
import { styles } from './styles';
import SessionHeader from './Components/sessionHeader';
import MiniApp from './Components/miniApp';
import Utilities from './Components/ultilities';

import { scale } from '../../Utils/scaling';
import Notification from './Components/notification';
import { showSuccessToast } from '../../Utils/toast';

const HomeScreen: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Lưu trữ giá trị để tính góc quay của mũi tên (từ 0 đến 1)
  const arrowRotation = React.useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    // 1. Chạy Animated.timing xoay mũi tên (giữ nguyên)
    Animated.timing(arrowRotation, {
      toValue: isExpanded ? 0 : 1, // Nếu đang mở (về 0), nếu chưa mở (lên 1)
      duration: 300,
      useNativeDriver: true, // Chạy trên Native mượt mà không lo lag giật
    }).start();

    setIsExpanded(prev => !prev);
  };

  // Tính toán góc lật Rotate từ value Animated
  const rotateInterpolation = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.mainContainer}>
      <View style={{ zIndex: 10 }}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../Assets/Images/Background.png')}
          />
        </View>
        <Reanimated.View
          style={styles.informationContainer}
          layout={LinearTransition.springify().mass(0.5)}
        >
          <View style={styles.information}>
            <View>
              <Image source={require('../../Assets/Icons/sun-fog.png')} />
            </View>
            <View style={styles.informationText}>
              <Text style={styles.informationTextTitle}>
                Chúc một ngày tốt lành,
              </Text>
              <Text style={styles.informationTextName}>
                NGUYỄN THỊ KHÁNH DƯƠNG
              </Text>
              <Text style={styles.informationTextCode}>
                Mã nhân viên: VNPOST123
              </Text>
            </View>
            <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
              <Animated.Image
                source={require('../../Assets/Icons/arrow-circle-down.png')}
                style={{
                  transform: [{ rotate: rotateInterpolation }],
                }}
              />
            </TouchableOpacity>
          </View>

          {isExpanded && (
            <Reanimated.View
              style={styles.extraInformation}
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(200)}
            >
              <View style={styles.extraInfoRow}>
                <Text style={styles.extraInfoLabel}>Đơn vị:</Text>
                <Text style={styles.extraInfoValue}>
                  Phòng Phát triển và tích hợp, Trung tâm Đổi mới sáng tạo, Cơ
                  quan Tổng công ty Bưu điện Việt Nam
                </Text>
              </View>
              <View style={styles.extraInfoRow}>
                <Text style={styles.extraInfoLabel}>Chức vụ:</Text>
                <Text style={styles.extraInfoValue}>
                  Chuyên viên thiết kế UI/UX
                </Text>
              </View>
              <View style={styles.extraInfoRow}>
                <Text style={styles.extraInfoLabel}>Email:</Text>
                <Text style={styles.extraInfoValue}>ntkd02@vnpost.vn</Text>
              </View>
            </Reanimated.View>
          )}
        </Reanimated.View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: scale(16) }}
      >
        <View style={styles.section}>
          <SessionHeader
            title="Mini App thường dùng"
            subTitle="Tùy chỉnh tiện ích phù hợp nhất với bạn"
            action={
              <TouchableOpacity>
                <Text style={styles.action}>Tuỳ chỉnh</Text>
              </TouchableOpacity>
            }
          />
          <MiniApp />
        </View>

        <View style={styles.section}>
          <SessionHeader
            title="Tiện ích"
            subTitle="Tùy chỉnh tiện ích phù hợp nhất với bạn"
            action={
              <TouchableOpacity>
                <Text style={styles.action}>Tuỳ chỉnh</Text>
              </TouchableOpacity>
            }
          />
          <Utilities />
        </View>

        <View style={styles.section}>
          <SessionHeader
            title="Tin tức & thông báo"
            subTitle="Cập nhật tin tức mới nhất từ Bưu điện Việt Nam"
            action={
              <TouchableOpacity
                style={styles.actionContainer}
                onPress={() => showSuccessToast('Hello')}
              >
                <Text style={styles.action}>Xem thêm </Text>
                <Image
                  source={require('../../Assets/Icons/vector-yellow.png')}
                />
              </TouchableOpacity>
            }
          />
          <Notification />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
