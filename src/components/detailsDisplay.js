/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import BalanceDisplay from "./balanceDisplay";
import TransactionsDisplay from "./transactionsDisplay";
import DetailTypeNavigation from "./detailTypeNavigation";
import { fetchTransactions, fetchBalance } from "../utils/helper";
import { colors } from "../utils/constants";

export default class DetailsDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            balance: 0
        };

        this.refreshTransactionsAndBalance = this.refreshTransactionsAndBalance.bind(this);
    }

    async refreshTransactionsAndBalance(date) {
        let transactions = await fetchTransactions(date);
        let balance =  fetchBalance(transactions);
        this.setState({
            transactions: transactions,
            balance: balance
        });
    }

    componentDidMount() {
        this.refreshTransactionsAndBalance(this.props.date);
    }

    componentDidUpdate(nextProps) {
        //console.log(nextProps.date);
        this.refreshTransactionsAndBalance(nextProps.date);
    }

    render() {
        console.log(this.state.balance);
        return (
            <View style={styles.detailsDisplay}>
                <BalanceDisplay style={styles.balanceDisplay} balance={this.state.balance}></BalanceDisplay>
                <View style={styles.detailedView}>
                    <DetailTypeNavigation style={styles.nav} transactions={this.state.transactions} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        flex: 1,
    },
    detailsDisplay: {
        flex: 1,
        //backgroundColor: "#FDFDFD",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 10,
        marginBottom: 0,
    },
    balanceDisplay:{
        flex: 2,
    },
    detailedView: {
        flex: 6,
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    headingTextView: {
        //paddingBottom: 10
    },
    headingText: {
        fontSize: 15,
        color: colors["headingColor"],
    },
    // transactionsDisplay: {
    //     flexDirection: "row",
    //     alignSelf: "stretch",
    //     alignItems: "stretch",
    //     flex: 1,
    // },
});
