import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockUserProfile } from '../../../../Service/user.mock';
import { styles } from './styles';

const InfoItem = ({
  label,
  value,
  isTag = false,
}: {
  label: string;
  value: string;
  isTag?: boolean;
}) => (
  <View style={styles.infoItem}>
    <View style={styles.infoLabelContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <View style={styles.infoValueContainer}>
      {isTag ? (
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>
            {value === 'working' ? 'Đang làm' : 'Đã nghỉ'}
          </Text>
        </View>
      ) : (
        <Text style={styles.infoValue}>{value}</Text>
      )}
    </View>
  </View>
);

export const ProfileDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../../../Assets/Icons/arrowLeft.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.largeTitle}>Thông tin cá nhân</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} bounces={false}>
        <InfoItem label="Mã nhân viên" value={mockUserProfile.employeeId} />
        <InfoItem label="Họ và tên" value={mockUserProfile.fullName} />
        <InfoItem label="Đơn vị" value={mockUserProfile.department} />
        <InfoItem label="Chức vụ" value={mockUserProfile.position} />
        <InfoItem label="Trạng thái" value={mockUserProfile.status} isTag />
        <InfoItem label="Ngày sinh" value={mockUserProfile.dob} />
        <InfoItem label="Số điện thoại" value={mockUserProfile.phone} />
        <InfoItem label="Email" value={mockUserProfile.email} />
        <InfoItem label="Địa chỉ liên hệ" value={mockUserProfile.address} />
      </ScrollView>
    </View>
  );
};
