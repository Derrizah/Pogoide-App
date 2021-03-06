import React from 'react';
import {Text, View} from 'react-native';

import * as Localization from 'expo-localization';

import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from "rn-placeholder";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from '../../scripts/LocalizationHandler'

export class EventItemC extends React.Component {
    constructor(props) {
        super();
        this.event = props.event;
        this.itemType = props.itemType;
        this.buttonIcon = props.notifications ? "bell" : "bell-off";
        this.storageKey = "@" + props.event.codename;
        this.mount = 0;
        this.update = 0;
        this.props = props;
        this.prepareStrings();
    }
    state={
        buttonIcon: "bell",
    }
    prepareStrings(){
        if(Localization.locale.toString() === "tr-TR") {
            this.title = this.event.title_tr;
            this.type = this.event.type_tr;
            this.start = this.event.start_tr;
            this.end = this.event.end_tr;
        }
        else {
            this.title = this.event.title;
            this.type = this.event.type;
            this.start = this.event.start;
            this.end = this.event.end;
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.buttonIcon = nextProps.notifications ? "bell" : "bell-off";
        return this.props.notifications !== nextProps.notifications;
    }

    async componentDidMount() {
        const getData = async () => await AsyncStorage.getItem(this.storageKey)
            .then((result) => {
                if (result === null) result = 'false';
                this.buttonIcon = (result === 'true') ? "bell" : "bell-off";
                this.setState({buttonIcon: this.buttonIcon});
            });
        // await getData();
        // console.log("componentMount" + ++this.mount);
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        const getData = async () => await AsyncStorage.getItem(this.storageKey)
            .then((result) => {
                if (result === null) result = 'false';
                this.buttonIcon = (result === 'true') ? "bell" : "bell-off";
                this.setState({buttonIcon: this.buttonIcon});
            });
        // await getData();
        // console.log("componentUpdate" + ++this.update);

    }

    render(){
        return (
            <Card
                style={{
                    card: true,
                    margin: 8,
                }}>
                {
                this.itemType === 'upcoming' &&
                (
                    <Button icon={this.buttonIcon}
                        mode="contained" color="#c62727" style={{
                        position: "absolute",
                        right: -20,
                        top: 0,
                    }}/>
                )}
                <Card.Cover source={{ uri: this.event.thumbnail }}
                            style={{height: verticalScale(100)}}/>
                <Card.Content>
                    <View style={{backgroundColor: this.event.color, marginLeft: scale(-14), marginRight: scale(-14)}}>
                        <Text style={{color: "white", marginTop: verticalScale(3), marginBottom: verticalScale(3),
                            marginLeft: 17, fontSize: verticalScale(9)}}>{this.type}</Text>
                    </View>
                    <Title style={{fontSize: verticalScale(15)}}>{this.title}</Title>
                    <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>{i18n.t('item.starts')}</Text>
                        <Text style={{fontSize: verticalScale(11)}}> {this.start}</Text></Paragraph>
                    <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>{i18n.t('item.ends')}</Text>
                        <Text style={{fontSize: verticalScale(11)}}>   {this.end}</Text></Paragraph>
                </Card.Content>
            </Card>
        );
    }
}

function EventItemF({item_type, event}) {
    if(item_type === 'upcoming') {
        let buttonIcon = "bell";
        const storageKey = "@" + event.codename;
        AsyncStorage.getItem(storageKey)
            .then((result) => {
                if (result === null) result = 'false';
                buttonIcon = (result === 'true') ? "bell" : "bell-off";
            });
    }
    return (
        <Card
            style={{
                card: true,
                margin: 8,
            }}>
            {
                item_type === 'upcoming' &&
                (
            <Button icon={buttonIcon} mode="contained" color="#c62727" style={{
                position: "absolute",
                right: -20,
                top: 0,
            }}/>
                )}
            <Card.Cover source={{ uri: event.thumbnail }}
                        style={{height: verticalScale(100)}}/>
            <Card.Content>
                <Title style={{fontSize: verticalScale(15)}}>{event.title}</Title>

                <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>Starts:</Text>
                    <Text style={{fontSize: verticalScale(11)}}> {event.start}</Text></Paragraph>
                <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>Ends:</Text>
                    <Text style={{fontSize: verticalScale(11)}}>   {event.end}</Text></Paragraph>
            </Card.Content>
        </Card>
    );
}

const EventItem = ({event, buttonIcon}) => (
    <Card
        style={{
            card: true,
            margin: 8,
        }}
    >
        <Button icon={buttonIcon} mode="contained" color="#c62727" style={{
            position: "absolute",
            right: -20,
            top: 0,
        }}/>
        <Card.Cover source={{ uri: event.thumbnail }}
                    style={{height: verticalScale(100)}}/>
        <Card.Content>
            <Title style={{fontSize: verticalScale(15)}}>{event.title}</Title>

            <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>Starts:</Text>
                <Text style={{fontSize: verticalScale(11)}}> {event.start}</Text></Paragraph>
            <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>Ends:</Text>
                <Text style={{fontSize: verticalScale(11)}}>   {event.end}</Text></Paragraph>
        </Card.Content>
    </Card>
);

export default EventItem;

export const PlaceholderEvent = () => (
    <Card
        style={{
            card: true,
            margin: 8,
        }}
    >
        <Card.Content>
            <Placeholder
                Animation={Fade}
            >
                <PlaceholderMedia style={{
                    width: scale(380),
                    height: scale(100),
                    margin: -16,
                    alignSelf: 'center'}}/>
                <PlaceholderLine width={scale(40)} style={{marginTop: 25}}/>
                <PlaceholderLine />
                <PlaceholderLine />
            </Placeholder>
        </Card.Content>
    </Card>
)