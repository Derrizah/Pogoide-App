import React, {PureComponent, Fragment} from 'react';
import {View, StyleSheet, ScrollView, Platform, Image, Text} from 'react-native';

import {Divider, Surface, FAB, Button, Caption} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {togglePushNotification} from '../../scripts/NotificationsHandler'
import {showMessage} from "react-native-flash-message";
import * as Localization from "expo-localization";
import i18n from '../../scripts/LocalizationHandler'

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
        this.prepareStrings();
        // this.notif = new NotificationService();
        // this.notif.create(this.event.title, this.event.codename, this.event.start);
    }
    state={
      isSubscribed: false,
      fabIcon: "bell",
    }
    prepareStrings(){
        if(Localization.locale.toString() === "tr-TR") {
            this.title = this.event.title_tr;
            this.type = this.event.type_tr;
            this.description_html = this.event.description_tr;
            this.start = this.event.start_tr;
            this.end = this.event.end_tr;
        }
        else {
            this.title = this.event.title;
            this.type = this.event.type;
            this.description_html = this.event.description_html;
            this.start = this.event.start;
            this.end = this.event.end;
        }
    }
    async componentDidMount() {
      await AsyncStorage.getItem(this.storageKey)
          .then((result)=> {
              this.setState({isSubscribed: (result === 'true'), fabIcon: (result === 'true') ? "bell" : "bell-off"});
              console.log("detailsscreen sees "+result);
          });
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
        let disabled;
        await AsyncStorage.getItem("@allDisabled")
            .then((result) => disabled = (result === "true"));
        if (!disabled) {
            const nextStatus = (!this.state.isSubscribed).toString();
            console.log("Nextstatus is " + nextStatus);
            let fabIcon = "bell";
            // this.notif.toggleNotification()
            // await AsyncStorage.setItem(this.storageKey, nextStatus).then(
            //     () => this.setState({isSubscribed: (nextStatus === 'true'), fabIcon: (nextStatus === 'true') ? "bell" : "bell-off"})
            // );
            this.setState({
                isSubscribed: (nextStatus === 'true'),
                fabIcon: (nextStatus === 'true') ? "bell" : "bell-off"
            })
            await togglePushNotification(this.title, this.event.codename, this.event.start);
            showMessage({
                message: this.state.isSubscribed ? i18n.t('details.subscribed') : i18n.t('details.unsubscribed'),
                description: this.state.isSubscribed ? i18n.t('details.subscribed_desc') : i18n.t('details.unsubscribed_desc'),
                position: "top",
                autoHide: true,
                icon: "success",
                backgroundColor: this.event.color,
                style: {height: scale(120)},
                duration: 5000,
            });
        }
        else {
            showMessage({
                message: i18n.t('details.cannot_sub'),
                description: i18n.t('details.cannot_sub_desc'),
                position: "top",
                autoHide: false,
                icon: "danger",
                backgroundColor: "#ff4040",
                style: {height: scale(120)},
                duration: 5000,
            });
        }

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
                            backgroundColor: this.event.color,
                            elevation:4,
                            zIndex: 1}}
                        medium
                        color="#ffffff"
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
                           marginTop: 4, marginBottom: 4,}}>{this.type}</Text>
                   </View>

                    <View style={{marginLeft: 16, marginRight: 16, marginBottom: verticalScale(30)}}>
                        <Text style={{fontSize: verticalScale(24), fontWeight: 'bold',
                            textAlign: "center"}}>{this.title}</Text>
                        <Divider style={{marginTop: 12, marginBottom: 12}}/>

                        <Text style={{fontWeight: 'bold'}}>{i18n.t('details.starts')}</Text>
                        <Text>{this.start}</Text>
                        <Text style={{fontWeight: 'bold'}}>{i18n.t('details.ends')}</Text>
                        <Text>{this.end}</Text>
                        <Caption>{i18n.t('details.localtime_caption')}</Caption>
                        <Divider style={{marginTop: 12, marginBottom: 12}}/>

                        <View style={{alignContent: "center"}}>
                            {/*<Text style={{marginBottom: 12}}>{this.event.description}</Text>*/}
                            <HTML source={{html: this.description_html}} style={{marginBottom: 12}}/>
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