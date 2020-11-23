import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable} from 'react-native';
import colors from './../../res/colors';
import images from './../../res/images';


const ListItem = ( { item }) => {

  return (
      <Pressable
          style={styles.pressable}
          onPress={ () => this.props.navigation.push('Details', item)}>
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image source={{uri:item.thumbnail}} style={styles.personImage} />
        <View>
          <Text style={styles.personName}>{item.title}</Text>
          <Text style={styles.placeName}>{item.time}</Text>
        </View>
      </View>
    </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 20,
    paddingEnd: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  personImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  personName: {
    color: colors.text,
    marginStart: 10,
    fontWeight: 'bold'
  },
  placeName: {
    color: colors.text,
    marginStart: 10,
    fontSize: 12
  },
  iconMore: {
    width: 15,
    height: 15
  },
});

export default ListItem;