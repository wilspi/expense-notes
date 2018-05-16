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
import { iconForCategory } from "../utils/helper";
import { colors } from "../utils/constants";

export default class TransactionCard extends Component {
    render() {
        return (
            <View style={styles.transactionCard}>
                <View style={styles.avatar}><Icon name={iconForCategory(this.props.transaction.transactionCategory)} size={24} color={colors["highlightButtonColor"]} /></View>
                <View style={styles.titleView}><Text style={styles.transactionTitle}>{this.props.transaction.transactionTitle}</Text></View>
                <View style={styles.amountView}><Icon name="currency-inr" size={22} color={colors["cardTextColor"]} /><Text style={styles.transactionAmount}>{this.props.transaction.transactionAmount}</Text></View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    transactionCard: {
        flex: 1,
        flexDirection: "row",
        //height: 700,
        //justifyContent: "space-around",
        //alignSelf: "stretch",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        padding: 3,
        paddingRight: 8,
        paddingLeft: 8,
        backgroundColor: colors["cardBackgroundColor"],
        //elevation: 1,
    },
    avatar: {
        borderWidth: 0.2,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#ffe0b2',
        borderRadius: 35,
        //flex: 1,
    },
    titleView: {
    },
    transactionTitle: {
        color: "#616E80",
        fontSize: 22,
        fontFamily: "Joy Like Sunshine Through My Windowpane",
        color: colors["cardTextColor"],
        //minWidth: 200,
        paddingBottom: 0,
        padding: 12,
        //fontWeight: "bold",
        //flexWrap: "wrap"
    },
    amountView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginLeft: "auto",
        //alignSelf: "flex-end",
        //alignItems: "center",
        //flex: 3
    },
    transactionAmount: {
        color: colors["cardTextColor"],
        textAlign: "center",
        //padding: 5,
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: "bold"
        //fontFamily: "Joy Like Sunshine Through My Windowpane",
        //fontWeight: "bold"
    }
});
