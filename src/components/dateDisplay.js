/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    DatePickerAndroid
} from 'react-native';

import CustomButton from "./customButton";
import { dateTextFormatter } from "../utils/helper";

export default class DateDisplay extends Component {
    constructor(props) {
        super(props)
        this.selectDate = this.selectDate.bind(this);
    }

    async selectDate() {
        /*
            To change date picker color read this
            https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/106#issuecomment-347586599
            https://cmichel.io/styling-datepickerandroid-in-react-native/
            PS: It works only if mode is 'default' ie native mode.
        */
        /*
            <resources>

                <!-- Base application theme. -->
                <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
                    <!-- Customize your theme here. -->
                <item name="android:datePickerDialogTheme">@style/Dialog.Theme</item>
                <item name="android:timePickerDialogTheme">@style/Dialog.Theme</item>
            </style>

            <style name="Dialog.Theme" parent="Theme.AppCompat.Light.Dialog">
                <item name="colorAccent">#f57c00</item>
                <item name="android:textColorPrimary">#f57c00</item>
            </style>

            </resources>
        */
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.props.date,
                maxDate: new Date(),
                mode: 'default',
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                this.props.onDateChange(date);
            }

        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        let pickerText = dateTextFormatter(this.props.date);
        return (
            <View style={styles.dateDisplay}>
                <CustomButton style={styles.buttonStyle} onPress={this.selectDate} text={pickerText}/>
            </View>
        )
    }
}

/*
    For future reference.
    Can be added later for opening settings, inline with CustomButton
    <CustomButton style={styles.buttonStyle} text="="/>
*/

const styles = StyleSheet.create({
    dateDisplay: {
        //justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonStyle: {
        marginTop: 10,
        marginRight: 15,
        alignSelf: 'center',
    },
});
