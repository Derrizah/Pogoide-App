import React, {PureComponent} from 'react';
import { View, StyleSheet, ScrollView, Platform, Image, Text } from 'react-native';
import {Divider} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import moment from "moment";
import {TouchableOpacity} from "react-native-web";


const scrollEnabled = Platform.select({ web: true, default: false });

//Ensuring a value exists
// {route.params.type && <Text>{route.params.type}</Text>}

export class DetailsScreen extends PureComponent {
  constructor(props) {
    super();
    this.event = props.route.params.event;
    // console.log("following is on details screen");
    // console.log(props.route.params);
      // this.navigator = props.route.navigator;
  }
  state = {
      fullImageVisible: false,
  }
    _renderItem = ({item, index}) => {
        return (
            <View style={{flex:1, marginRight: 12}}>
                <Image style={{height: '100%',
                    width: null,
                    aspectRatio: 0.88,}} source={{uri: item}}/>
            </View>
        );
    }
    _renderFull() {
      let visible = true
        console.log('no fullscreen?')
      // return (
      //     // <ImageView
      //     //     images={this.event.images}
      //     //     imageIndex={0}
      //     //     visible={visible}
      //     //     onRequestClose={() => visible = false}
      //     // />
      // )
    }
    render()
    {
        let eventColor = "#27ae60";
        if(this.event.type === "GO Battle League") eventColor = "#8e44ad";
        else if(this.event.type === "Update") eventColor = "#2980b9";
        else if(this.event.type === "Research Breakthrough") eventColor = "#795548";
        else if(this.event.type === "Raid Battles") eventColor = "#c0392b";
        else if(this.event.type === "Pokémon Spotlight Hour") eventColor = "#e58e26";
        else if(this.event.type === "Raid Hour") eventColor = "#c0392b";
        else if(this.event.type === "Community Day") eventColor = "#1660a9";
        else if(this.event.type === "Special Research") eventColor = "#13a185";

        if (this.event.ISO_time){
            this.event.start = moment(this.event.start).format("dddd, MMM DD at HH:mm a");
            this.event.end = moment(this.event.end).format("dddd, MMM DD at HH:mm a");
        }

        return (
                <ScrollView>
                    <Image style={{width: '100%',
                        height: null,
                        aspectRatio: 2,}}
                           source={{uri: this.event.thumbnail}}/>

                           <View style={{backgroundColor: eventColor}}><Text style={{color: "white", marginLeft: 12}} >{this.event.type}</Text></View>
                    <View style={{marginLeft: 12, marginRight: 12}}>
                    <Text style={{fontSize: 32}}>{this.event.title}</Text>
                        <Text style={{fontWeight: 'bold'}}>Starts: </Text>
                    <Text>  {this.event.start}</Text>
                        <Text style={{fontWeight: 'bold'}}>Ends: </Text>
                        <Text>  {this.event.end}</Text>
                        <Divider style={{marginTop: 12}}/>
                    <Text>{this.event.description}</Text>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.event.images}
                            renderItem={this._renderItem}
                            sliderWidth={400}
                            itemWidth={400}
                        />
                           </View>
                </ScrollView>
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