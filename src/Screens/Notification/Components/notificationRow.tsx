import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Notification } from '../../../Service/notification.mock';
import { styles } from './styles';

interface NotificationRowProps {
  item: Notification;
}

const getIconSource = (type: Notification['type']) => {
  switch (type) {
    case 'security':
      return require('../../../Assets/Icons/lock.png');
    case 'leave_request':
      return require('../../../Assets/Icons/document-normal.png');
    case 'mention':
      return require('../../../Assets/Icons/messages.png');
    case 'meeting':
      return require('../../../Assets/Icons/user-square.png');
    default:
      return require('../../../Assets/Icons/home-2.png');
  }
};

export const NotificationRow = ({ item }: NotificationRowProps) => {
  return (
    <View
      style={[
        styles.rowContainer,
        item.isRead ? styles.rowRead : styles.rowUnread,
      ]}
    >
      <View style={styles.iconContainer}>
        <Image source={getIconSource(item.type)} style={styles.iconImage} />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowDetails}>{item.details}</Text>
        <Text style={styles.rowTime}>{item.timeLabel}</Text>

        {item.action && (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{item.action.label}</Text>
            <Image
              source={require('../../../Assets/Icons/vector-yellow.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
