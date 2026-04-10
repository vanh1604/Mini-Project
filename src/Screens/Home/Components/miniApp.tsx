import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import IconButton from '../../../Components/IconButton';
import { scale } from '../../../Utils/scaling';

const DATA = [
  { icon: require('../../../Assets/Icons/dai-ichi.png'), name: 'Dai-Ichi' },
  { icon: require('../../../Assets/Icons/shopee.png'), name: 'Shopee' },
  { icon: require('../../../Assets/Icons/mb-bank.png'), name: 'MB Bank' },
  {
    icon: require('../../../Assets/Icons/vn-airlines.png'),
    name: 'Vietnam Airlines',
  },
  { icon: require('../../../Assets/Icons/prudential.png'), name: 'Prudential' },
  { icon: require('../../../Assets/Icons/cake-bank.png'), name: 'Cake Bank' },
  {
    icon: require('../../../Assets/Icons/nongSan.png'),
    name: 'Nông sản Bưu điện',
  },
  {
    icon: require('../../../Assets/Icons/hsbc.png'),
    name: 'HSBC',
  },
];
const MiniApp = () => {
  return (
    <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          numColumns={4}
          data={DATA}
          renderItem={({ item }) => (
            <IconButton icon={item.icon} name={item.name} />
          )}
        />
    </View>
  );
};

export default MiniApp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(16),
    marginTop: scale(16),
  },
  listContainer: {
    gap: scale(16),
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
