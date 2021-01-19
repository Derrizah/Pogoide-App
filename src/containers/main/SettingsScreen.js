import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, TouchableRipple, List, Switch, Portal, Surface } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    cancelAllNotificationsAsync,
    cancelSoonNotificationsAsync,
    cancelStartNotificationsAsync
} from "../../scripts/NotificationsHandler";

export default class SettingsScreen extends Component {
    constructor(props) {
        super();
        // this.state = {
        //     soonNotifyDays: "5",
        //     isAllSwitchOn: false,
        //     isStartSwitchOn: false,
        //     isSoonSwitchOn: false,
        // }
        this.onToggleAllSwitch = this.onToggleAllSwitch.bind(this);
        this.onToggleStartSwitch = this.onToggleStartSwitch.bind(this);
        this.onToggleSoonSwitch = this.onToggleSoonSwitch.bind(this);
    }
    state = {
        soonNotifyDays: "5",
        isAllSwitchOn: false,
        isStartSwitchOn: false,
        isSoonSwitchOn: false,
    }
    async componentDidMount() {
        await AsyncStorage.getItem("@allDisabled")
            .then((result)=>this.setState({isAllSwitchOn: (result === "true")}));
        await AsyncStorage.getItem("@startDisabled")
            .then((result)=>this.setState({isStartSwitchOn: (result === "true")}));
        await AsyncStorage.getItem("@soonDisabled")
            .then((result)=>this.setState({isSoonSwitchOn: (result === "true")}));
        await AsyncStorage.getItem("@soonDays")
            .then((result)=>this.setState({soonNotifyDays: result}));
        console.log("allDisabled is " + this.state.isAllSwitchOn);
    }
    onToggleAllSwitch() {
        const nextStatus = !this.state.isAllSwitchOn;
        AsyncStorage.setItem("@allDisabled", nextStatus.toString()).then(
            () => {
                this.setState({isAllSwitchOn: nextStatus});
                if(nextStatus) {
                    cancelAllNotificationsAsync();
                }
                else {
                    AsyncStorage.setItem("@startDisabled", "false").then(
                        AsyncStorage.setItem("@soonDisabled", "false").then(
                            () => this.setState({isStartSwitchOn: false, isSoonSwitchOn: false})
                        )
                    );
                }
            }
        ).catch(err => console.log("Toggle all errored"));
    }
    onToggleStartSwitch() {
        const nextStatus = !this.state.isStartSwitchOn;
        AsyncStorage.setItem("@startDisabled", nextStatus.toString()).then(
            () => {
                this.setState({isStartSwitchOn: nextStatus});
                if(nextStatus && this.state.isSoonSwitchOn) {
                    this.onToggleAllSwitch();
                }
                else if(nextStatus) {
                    cancelStartNotificationsAsync();
                }

            }
        );
    }
    onToggleSoonSwitch() {
        const nextStatus = !this.state.isSoonSwitchOn;
        AsyncStorage.setItem("@soonDisabled", nextStatus.toString()).then(
            () => {
                this.setState({isSoonSwitchOn: nextStatus});
                if(nextStatus && this.state.isStartSwitchOn) {
                    this.onToggleAllSwitch();
                }
                else if(nextStatus) {
                    cancelSoonNotificationsAsync();
                }
            }
        );
    }
    setValue(value) {
        AsyncStorage.setItem("@soonDays", value).then(
            () => this.setState({soonNotifyDays: value})
        );
    }
    render(){
        return (
            <View>
                <List.Item
                    title="Disable All Notifications"
                    description="You will have to opt-in to the events again."
                    right={props => <Switch value={this.state.isAllSwitchOn} onValueChange={this.onToggleAllSwitch}
                                            color={"#003a70"}  />}
                    titleStyle={{color: 'red'}}
                />
                <List.Item
                    title="Disable Event Start Notifications"
                    right={props => <Switch value={this.state.isStartSwitchOn} onValueChange={this.onToggleStartSwitch}
                                            disabled={this.state.isAllSwitchOn} color={"#003a70"} />}
                    style={{opacity: this.state.isAllSwitchOn ? 0.5 : 1}}
                />
                <List.Item
                    title="Disable Event Soon Notifications"
                    right={props => <Switch value={this.state.isSoonSwitchOn} onValueChange={this.onToggleSoonSwitch}
                                            disabled={this.state.isAllSwitchOn} color={"#003a70"} />}
                    style={{opacity: this.state.isAllSwitchOn ? 0.5 : 1}}
                />
                <List.Item
                    title="How many days before do you want to be notified of an upcoming event?"
                    style={{opacity: (this.state.isAllSwitchOn || this.state.isSoonSwitchOn) ? 0.5 : 1}}
                    description={props =>
                        <View><Text>This setting will apply on new opt-ins.</Text>
                            <View style={{flexDirection: 'row'}}>
                            <TouchableRipple onPress={() => this.setValue("1")} style={{margin: 6}}
                                             disabled={this.state.isAllSwitchOn || this.state.isSoonSwitchOn}>
                                <Surface style={{height: 30,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    opacity: this.state.soonNotifyDays === "1" ? 1 : 0.5}}>
                                    <Text>1</Text>
                                </Surface>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setValue("2")} style={{margin: 6}}
                                             disabled={this.state.isAllSwitchOn || this.state.isSoonSwitchOn}>
                                <Surface style={{height: 30,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    opacity: this.state.soonNotifyDays === "2" ? 1 : 0.5}}>
                                    <Text>2</Text>
                                </Surface>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setValue("3")} style={{margin: 6}}
                                             disabled={this.state.isAllSwitchOn || this.state.isSoonSwitchOn}>
                                <Surface style={{height: 30,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    opacity: this.state.soonNotifyDays === "3" ? 1 : 0.5}}>
                                    <Text>3</Text>
                                </Surface>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setValue("4")} style={{margin: 6}}
                                             disabled={this.state.isAllSwitchOn || this.state.isSoonSwitchOn}>
                                <Surface style={{height: 30,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    opacity: this.state.soonNotifyDays === "4" ? 1 : 0.5}}>
                                    <Text>4</Text>
                                </Surface>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setValue("5")} style={{margin: 6}}
                                             disabled={this.state.isAllSwitchOn || this.state.isSoonSwitchOn}>
                                <Surface style={{height: 30,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    opacity: this.state.soonNotifyDays === "5" ? 1 : 0.5}}>
                                    <Text>5</Text>
                                </Surface>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setValue("6")} style={{margin: 6}}
                                             disabled={this.state.isAllSwitchOn || this.state.isSoonSwitchOn}>
                                <Surface style={{height: 30,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    opacity: this.state.soonNotifyDays === "6" ? 1 : 0.5}}>
                                    <Text>6</Text>
                                </Surface>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setValue("7")} style={{margin: 6}}
                                             disabled={this.state.isAllSwitchOn || this.state.isSoonSwitchOn}>
                                <Surface style={{height: 30,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    opacity: this.state.soonNotifyDays === "7" ? 1 : 0.5}}>
                                    <Text>7</Text>
                                </Surface>
                            </TouchableRipple>
                        </View></View>}/>
                {
                    __DEV__
                }
                <List.Item
                    title="Disable Event Soon Notifications"
                    right={props => <Switch value={this.state.isSoonSwitchOn} onValueChange={this.onToggleSoonSwitch}
                                            disabled={this.state.isAllSwitchOn} color={"#003a70"} />}
                    style={{opacity: this.state.isAllSwitchOn ? 0.5 : 1}}
                />
            </View>)
}}