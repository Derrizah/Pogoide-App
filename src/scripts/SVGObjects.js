import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import PropTypes from "prop-types";
import Svg from "react-native-svg";
import {AnimatedSVGPaths} from "react-native-svg-animations";

import Path from "react-native-svg-animations/components/AnimatedPath";

const { height, width } = Dimensions.get("window");
export class PokeballSVG extends AnimatedSVGPaths {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            ds,
            fill,
            scale,
            width,
            height,
            strokeColor,
            strokeWidth,
            duration,
            delay,
            loop,
            rewind,
        } = this.props;

        const svgPaths = ds.map((d, index) => {
            return (
                <Path
                    strokeWidth={strokeWidth}
                    strokeColor={strokeColor}
                    duration={duration}
                    delay={delay}
                    scale={scale}
                    fill={fill}
                    key={index}
                    loop={loop}
                    rewind={rewind}
                    d={d}
                />
            );
        });

        return (
            <Svg height={height * scale + 5} width={width * scale + 5} viewBox={"-10 -10 384 384"}>
                {svgPaths}
            </Svg>
        );
    }
}
export class LogoSVG extends AnimatedSVGPaths {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            ds,
            fill,
            scale,
            width,
            height,
            strokeColor,
            strokeWidth,
            duration,
            delay,
            loop,
            rewind,
        } = this.props;

        const svgPaths = ds.map((d, index) => {
            return (
                <Path
                    strokeWidth={strokeWidth}
                    strokeColor={strokeColor}
                    duration={duration}
                    delay={delay}
                    scale={scale}
                    fill={fill}
                    key={index}
                    loop={loop}
                    rewind={rewind}
                    d={d}
                />
            );
        });

        return (
            <Svg height={height * scale + 5} width={width * scale + 5} viewBox="-5 -5 289 90.208">
                {svgPaths}
            </Svg>
        );
    }
}
