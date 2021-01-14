import React, {PureComponent, Fragment} from 'react';
import {View, StyleSheet, ScrollView, Platform, Image, Text} from 'react-native';
import {Divider, Surface, FAB, Button} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import moment from "moment";
import {TouchableOpacity} from "react-native-web";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {togglePushNotification} from '../../scripts/NotificationsHandler'


const scrollEnabled = Platform.select({ web: true, default: false });

//Ensuring a value exists
// {route.params.type && <Text>{route.params.type}</Text>}

export class DetailsScreen extends PureComponent {
    constructor(props) {
        super();
        this.event = props.route.params.event;
        this.itemType =props.route.params.eventType;
        // console.log("following is on details screen");
        // console.log(props.route.params);
        // this.navigator = props.route.navigator;
        this.storageKey = "@" + this.event.codename;

        // this.notif = new NotificationService();
        // this.notif.create(this.event.title, this.event.codename, this.event.start);
    }
    state={
      isSubscribed: false,
      fabIcon: "bell",
    }
    componentDidMount() {
      AsyncStorage.getItem(this.storageKey)
          .then((result)=>this.setState({isSubscribed: (result === 'true'), fabIcon: (result === 'true') ? "bell" : "bell-off"}));
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
    async toggleSubscription()
    {
        const nextStatus = (!this.state.isSubscribed).toString();
        let fabIcon = "bell";
        // this.notif.toggleNotification()
        await AsyncStorage.setItem(this.storageKey, nextStatus).then(
            () => this.setState({isSubscribed: (nextStatus === 'true'), fabIcon: (nextStatus === 'true') ? "bell" : "bell-off"})
        );
        await togglePushNotification(this.event.title, this.event.codename, this.event.start);
    }
    render()
    {
        // let eventColor = "#27ae60";
        // if(this.event.type === "GO Battle League") eventColor = "#8e44ad";
        // else if(this.event.type === "Update") eventColor = "#2980b9";
        // else if(this.event.type === "Research Breakthrough") eventColor = "#795548";
        // else if(this.event.type === "Raid Battles") eventColor = "#c0392b";
        // else if(this.event.type === "Pokémon Spotlight Hour") eventColor = "#e58e26";
        // else if(this.event.type === "Raid Hour") eventColor = "#c0392b";
        // else if(this.event.type === "Community Day") eventColor = "#1660a9";
        // else if(this.event.type === "Special Research") eventColor = "#13a185";

        // if (this.event.ISO_time){
        //     this.event.start = moment(this.event.start).format("dddd, MMM DD [at] HH:mm a");
        //     this.event.end = moment(this.event.end).format("dddd, MMM DD [at] HH:mm a");
        // }

        return (
            <Fragment>
                {
                this.itemType === 'upcoming' &&
                (
                    <FAB
                        style={{position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "#003a70",
                            elevation:4,
                            zIndex: 1}}
                        medium
                        icon={this.state.fabIcon} // bell  bell-off
                        onPress={async () => await this.toggleSubscription()}/>
                )}
                <ScrollView>
                    <Image style={{width: '100%',
                        height: null,
                        aspectRatio: 2,}}
                            source={{uri: this.event.thumbnail}}/>

                   <View style={{backgroundColor: this.event.color}}>
                       <Text style={{color: "white", marginLeft: 16,
                           textAlign: "center", marginRight: 16,
                           marginTop: 4, marginBottom: 4,}}>{this.event.type}</Text>
                   </View>

                    <View style={{marginLeft: 16, marginRight: 16, marginBottom: verticalScale(30)}}>
                        <Text style={{fontSize: verticalScale(24), fontWeight: 'bold',
                            textAlign: "center"}}>{this.event.title}</Text>
                        <Divider style={{marginTop: 12, marginBottom: 12}}/>

                        <Text style={{fontWeight: 'bold'}}>Starts: </Text>
                        <Text>{this.event.start}</Text>
                        <Text style={{fontWeight: 'bold'}}>Ends: </Text>
                        <Text>{this.event.end}</Text>
                        <Divider style={{marginTop: 12, marginBottom: 12}}/>

                        <View style={{alignContent: "center"}}>
                            {/*<Text style={{marginBottom: 12}}>{this.event.description}</Text>*/}
                            <HTML source={{html: this.event.description_html}} style={{marginBottom: 12}}/>
                                {
                                this.event.graphics === true &&
                                (
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.event.images}
                                    renderItem={this._renderItem}
                                    sliderWidth={400}
                                    itemWidth={400}
                                />
                                )}
                       </View>
                    </View>
                </ScrollView>
            </Fragment>
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