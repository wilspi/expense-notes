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
import { iconForCategory, minifyAmount } from "../utils/helper";
import { colors } from "../utils/constants";

export default class CategoryItem extends Component {
    render() {
        return (
            <View style={styles.transactionCard}>
                <View style={styles.avatar}>
                    <Icon
                        name={iconForCategory(this.props.category.index)}
                        size={24}
                        color={colors["highlightButtonColor"]} />
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.categoryTitle}>
                        {this.props.category.name.toUpperCase()}
                    </Text>
                </View>
                <View style={styles.amountView}>
                    <Icon name="currency-inr" size={22} color={colors["cardTextColor"]} />
                    <Text style={styles.transactionAmount}>
                        {minifyAmount(this.props.category.amount)}
                    </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    transactionCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 9,
        paddingRight: 8,
        paddingLeft: 8,
    },
    avatar: {
        borderWidth: 0.2,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#ffb74d',
        borderRadius: 35,
        //flex: 1,
    },
    titleView: {
        //flexWrap: "wrap",
    },
    categoryTitle: {
        color: "#616E80",
        fontSize: 18,
        color: colors["cardTextColor"],
        padding: 3,
        paddingLeft: 10,
        fontFamily: "Oswald",
        //fontWeight: "700",
        // fontFamily: "Roboto",
        // fontWeight: "bold"
        //minWidth: 200,
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
        //fontFamily: "Oswald",
        fontWeight: "700",
        //flex: 1,
        //flexWrap: "wrap"
    }
});
