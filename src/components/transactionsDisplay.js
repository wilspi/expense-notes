/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TransactionCard from "./transactionCard";
import { colors } from "../utils/constants";

export default class TransactionsDisplay extends Component {
    render() {
        var rows = [];
        var numrows = this.props.transactions.length;
        for (var i = 0; i < numrows; i++) {
            rows.push(<TransactionCard key={this.props.transactions[i].transactionId} transaction={this.props.transactions[i]} />);
        }
        if (rows.length) {
            return (
                <View style={styles.transactionsListContainer}>
                    <ScrollView >
                        {rows}
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={styles.blankTransactionsContainer}>
                    <View style={styles.blankView}>
                        <Icon name="cat" size={50} color={colors["cardBackgroundColor"]} />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    transactionsListContainer: {
        paddingTop: 10,
    },
    blankTransactionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blankView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
