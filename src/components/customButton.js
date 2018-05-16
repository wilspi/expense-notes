/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import {colors} from "../utils/constants";

export default class CustomButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={ [styles.buttonStyle, this.props.style] }
                onPress={this.props.onPress}>
                <Text style={styles.textStyle}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 10,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: colors["buttonColor"],
        elevation: 4,
    },
    textStyle: {
        fontSize: 18,
        color: colors["buttonTextColor"],
        fontFamily: "Oswald",
        //fontWeight: "bold",
    },
});
