import React, {PureComponent} from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-paper';


const scrollEnabled = Platform.select({ web: true, default: false });

//Ensuring a value exists
// {route.params.type && <Text>{route.params.type}</Text>}

export class DetailsScreen extends PureComponent {
  constructor(props) {
    super();
    this.event = props.route.params.event;
    // console.log("following is on details screen");
    // console.log(props.route.params);
  }
    render()
    {
      return (
            <View style={styles.buttons}>
              <Button
                  mode="contained"
                  style={styles.button}
              >
                {this.event.title}
              </Button>

            </View>
      );
    }
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