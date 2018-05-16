/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryItem from "./categoryItem";
import { colors } from "../utils/constants";
import { categories as Categories } from "../utils/helper";

export default class MetricsDisplay extends Component {

    constructor(props) {
        super(props);
        this.recalculateMetrics = this.recalculateMetrics.bind(this);
        this.setupCategories = this.setupCategories.bind(this);
        this.state = {
            categories: this.setupCategories(Categories)
        }
    }

    setupCategories(categories) {
        let categoriesObject = {}
        for (const [key, value] of Object.entries(categories)) {
            categoriesObject[key] = {
                index: key,
                name: value,
                amount: 0,
            };
        }
        return categoriesObject;
    }

    recalculateMetrics(transactions) {
        let categories = this.setupCategories(Categories);
        for (transaction of transactions) {
            if (categories.hasOwnProperty(transaction["transactionCategory"])) {
                categories[transaction["transactionCategory"]]["amount"]+=transaction["transactionAmount"];
            } else {
                categories[transaction["transactionCategory"]] = {
                    amount: transaction["transactionAmount"]
                };
            }
        }
        this.setState({categories});
    }

    componentWillReceiveProps(nextProps) {
        this.recalculateMetrics(nextProps.transactions);
    }

    render() {
        var rows = [];
        for (category in this.state.categories) {
            rows.push(<CategoryItem key={category} category={this.state.categories[category]} />);
        }
        if (rows.length) {
            return (
                <View style={styles.categoriesListContainer}>
                    <ScrollView >
                        {rows}
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={styles.blankCategoriesContainer}>
                    <View style={styles.blankView}>
                        <Icon name="cat" size={50} color={colors["cardBackgroundColor"]} />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    categoriesListContainer: {
        paddingTop: 10,
        //paddingBottom: 10
    },
    blankCategoriesContainer: {
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
