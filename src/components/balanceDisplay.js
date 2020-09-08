/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../utils/constants";

export default class BalanceDisplay extends Component {
    render() {
        return (
            <View style={styles.balances}>
                <View style={styles.dayBalance}>
                    <View styles={styles.headingTextView}>
                        <Text style={styles.headingText}>EXPENSES</Text>
                    </View>
                    <View style={styles.amountView}>
                        <Icon
                            style={styles.currency}
                            name="currency-inr"
                            size={48}
                            color={colors["highlightTextColor"]} />
                        <Text style={styles.amountTextView}>{this.props.balance}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    balances: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 10,
    },
    dayBalance: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        // margin: 10,
        // marginLeft: 25,
    },
    headingTextView: {},
    headingText: {
        fontSize: 15,
        color: colors["headingColor"],
        fontFamily: "Oswald",
    },
    amountView: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    // currency: {
    //     justifyContent: "center",
    // },
    amountTextView: {
        //color: "#616E80",
        fontSize: 50,
        fontFamily: "Stardos Stencil",
        color: colors["highlightTextColor"],
        //minWidth: 200,
        //paddingBottom: 0,
        //padding: 12,
        fontWeight: "bold",
        //elevation: 5,
        //flexWrap: "wrap"
    },
});
