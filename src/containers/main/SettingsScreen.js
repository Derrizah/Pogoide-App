import React, {PureComponent} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, List, Switch, Portal, Surface } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SettingsScreen extends PureComponent {
    constructor(props) {
        super();
    }
    state = {
        soonNotifyDays: "5",
        isAllSwitchOn: false,
        isStartSwitchOn: false,
        isSoonSwitchOn: false,
    }
    componentDidMount() {
        AsyncStorage.getItem("@allDisabled")
            .then((result)=>this.setState({isAllSwitchOn: result}));
        AsyncStorage.getItem("@startDisabled")
            .then((result)=>this.setState({isStartSwitchOn: result}));
        AsyncStorage.getItem("@soonDisabled")
            .then((result)=>this.setState({isSoonSwitchOn: result}));
    }
    async onToggleAllSwitch() {
        await AsyncStorage.setItem("@allDisabled", !this.state.isAllSwitchOn).then(
            () => this.setState({isAllSwitchOn: !this.state.isAllSwitchOn})
        );
    }
    async onToggleStartSwitch() {
        await AsyncStorage.setItem("@startDisabled", !this.state.isStartSwitchOn).then(
            () => this.setState({isStartSwitchOn: !this.state.isStartSwitchOn})
        );
    }
    async onToggleSoonSwitch() {
        await AsyncStorage.setItem("@soonDisabled", !this.state.isSoonSwitchOn).then(
            () => this.setState({isSoonSwitchOn: !this.state.isSoonSwitchOn})
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
                                            style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]}} />}
                    titleStyle={{color: 'red'}}
                />
                <List.Item
                    title="Disable Event Start Notifications"
                    right={props => <Switch value={this.state.isStartSwitchOn || this.state.isAllSwitchOn} onValueChange={this.onToggleStartSwitch}
                                            disabled={this.state.isAllSwitchOn} style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]}} />}
                    style={{opacity: this.state.isAllSwitchOn ? 0.5 : 1}}
                />
                <List.Item
                    title="Disable Event Soon Notifications"
                    right={props => <Switch value={this.state.isSoonSwitchOn || this.state.isAllSwitchOn} onValueChange={this.onToggleSoonSwitch}
                                            disabled={this.state.isAllSwitchOn} style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]}} />}
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
            </View>)
}}