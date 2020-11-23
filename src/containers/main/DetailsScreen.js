import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-paper';


const scrollEnabled = Platform.select({ web: true, default: false });

//Ensuring a value exists
// {route.params.type && <Text>{route.params.type}</Text>}

const DetailsScreen = ({ route }) => {
  return (
    <ScrollView>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          style={styles.button}
        >
          Push article
        </Button>

      </View>
    </ScrollView>
  );
}
export default DetailsScreen;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    margin: 8,
  },
});