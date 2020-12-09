import React from 'react';
import {Text} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph, DefaultTheme} from 'react-native-paper';
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from "rn-placeholder";


const EventItem = ({event}) => (
    <Card
        style={{
            card: true,
            margin: 8,
        }}
    >
        <Card.Cover source={{ uri: event.thumbnail }} />
        <Card.Content>
            <Title>{event.title}</Title>
            <Paragraph><Text style={{fontWeight: "bold"}}>Starts:</Text> {event.start}</Paragraph>
            <Paragraph><Text style={{fontWeight: "bold"}}>Ends:</Text>   {event.end}</Paragraph>
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
                    width: 400,
                    height: 200,
                    margin: -16,
                    alignSelf: 'center'}}/>
                <PlaceholderLine width={40} style={{marginTop: 25}}/>
                <PlaceholderLine />
                <PlaceholderLine />
            </Placeholder>
        </Card.Content>
    </Card>
)