import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import colors from "../../res/colors";
import React from "react";
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from "rn-placeholder";
import * as SIZES from "galio-framework";
import {theme} from "galio-framework";

const PlaceholderItem = () => {

    return (
        <Placeholder
            Animation={Fade}>
            <PlaceholderMedia style={styles.media}/>
            <PlaceholderLine width={30} />
            <PlaceholderLine />
            <PlaceholderLine />
        </Placeholder>
    );
};

const styles = theme =>
    StyleSheet.create({
    media: {
        width: theme.SIZES.CARD_WIDTH,
        height: theme.SIZES.CARD_IMAGE_HEIGHT,
        marginBottom: theme.SIZES.CARD_MARGIN_VERTICAL,
    },
});

export default PlaceholderItem;