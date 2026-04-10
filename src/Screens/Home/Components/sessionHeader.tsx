import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../Theme/colors';
import { scale } from '../../../Utils/scaling';
interface Props {
  title: String;
  subTitle: string;
  action: React.ReactNode;
}
const SessionHeader = ({ title, subTitle, action }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View>{action}</View>
    </View>
  );
};

export default SessionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  textContainer: {
    gap: scale(4),
  },
});
