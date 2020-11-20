import React from 'react';
import { Text, FlatList } from 'react-native';

const CurrentScreen = () => {
  const event = {
    type: 'raid',
    title: 'HOME Event',

  }
  return (
    <FlatList
      data={[
        { key: 'a' },
        { key: 'b' },
        { key: 'c' },
        { key: 'd' },
        { key: 'e' },
      ]}
    renderItem={({ item, index }) => <ListItem event={event}/>}/>
  );
}
export default CurrentScreen;