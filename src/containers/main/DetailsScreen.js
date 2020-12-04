import React, {PureComponent, useState} from 'react';
import { View, StyleSheet, ScrollView, Platform, Image, Text } from 'react-native';
import {Divider} from 'react-native-paper';
import ImageView from "react-native-image-viewing";
import FastImage from "react-native-fast-image";
import Carousel from 'react-native-snap-carousel';
import ImagesSwiper from "react-native-image-swiper";


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
        const images = [
            {
                uri: "https://leekduck.com/assets/img/events/kalos-debut.jpg",
            },
            {
                uri: "https://leekduck.com/assets/img/events/kalos-debut.jpg",
            },
            {
                uri: "https://leekduck.com/assets/img/events/kalos-debut.jpg",
            },
        ];
        const customImg = [
            "https://firebasestorage.googleapis.com/v0/b/lotapp-9e84d.appspot.com/o/aster.jpg?alt=media&token=166e66b0-9c8e-4803-918e-25762c58dbda",
            "https://firebasestorage.googleapis.com/v0/b/lotapp-9e84d.appspot.com/o/fan.jpg?alt=media&token=b419d507-9de8-4c4c-97e3-6b4eb2202e68",
            "https://firebasestorage.googleapis.com/v0/b/lotapp-9e84d.appspot.com/o/stone.jpg?alt=media&token=e9d41537-7f26-4bfd-86eb-c2ef6fc58a9c"
        ];

        return (
                <ScrollView>
                    <Image style={{width: '100%',
                        height: null,
                        aspectRatio: 2,}}
                           source={{uri: this.event.thumbnail}}/>

                           <View style={{backgroundColor: eventColor}}><Text style={{color: "white", marginLeft: 12}} >{this.event.type}</Text></View>
                    <View style={{marginLeft: 12, marginRight: 12}}>
                    <Text style={{fontSize: 32}}>{this.event.title}</Text>
                    <Text>{this.event.time}</Text>
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