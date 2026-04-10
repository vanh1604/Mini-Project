import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import IconButton from '../../../Components/IconButton';
import { scale } from '../../../Utils/scaling';

const DATA = [
  { icon: require('../../../Assets/Icons/24h.png'), name: 'IT 360' },
  { icon: require('../../../Assets/Icons/hrm.png'), name: 'HRM' },
  { icon: require('../../../Assets/Icons/biFace.png'), name: 'BiFace' },
  {
    icon: require('../../../Assets/Icons/wallet.png'),
    name: 'Ví điện tử',
  },
];
const Utilities = () => {
  return (
    <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          numColumns={4}
          data={DATA}
          renderItem={({ item }: { item: { icon: any; name: string } }) => (
            <IconButton icon={item.icon} name={item.name} />
          )}
        />
    </View>
  );
};

export default Utilities;

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
