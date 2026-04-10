import React, { useState, useMemo } from 'react';
import { View, Text, SectionList } from 'react-native';
import { mockNotifications } from '../../Service/notification.mock';
import { styles } from './styles';
import { FilterChips, FilterType } from './Components/filterChips';
import { SectionHeader } from './Components/sectionHeader';
import { NotificationRow } from './Components/notificationRow';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationScreen = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') {
      return mockNotifications;
    }

    // Lọc ra những thông báo chưa đọc (isRead === false)
    return (
      mockNotifications
        .map(section => ({
          ...section,
          data: section.data.filter(item => !item.isRead),
        }))
        // Loại bỏ những section không có dữ liệu nào sau khi lọc
        .filter(section => section.data.length > 0)
    );
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Thông báo</Text>
      </View>

      <FilterChips
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <SectionList
        sections={filteredNotifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NotificationRow item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
