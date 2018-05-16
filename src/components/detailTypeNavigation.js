/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

import MetricsDisplay from "./metricsDisplay";
import TransactionsDisplay from "./transactionsDisplay";
import { colors } from "../utils/constants";


class MetricsScene extends Component {
    static navigationOptions = {
        title: "Metrics",
    };

    render() {
        return (
            <View style={styles.sceneContainer}>
                <MetricsDisplay style={styles.transactionDisplay} transactions={this.props.screenProps.transactions} ></MetricsDisplay>
            </View>
        );
    }
}

class TransactionsScene extends Component {
    static navigationOptions = {
        title: "Transactions",
    };

    render() {
        return (
            <View style={styles.sceneContainer}>
                <TransactionsDisplay style={styles.transactionDisplay} transactions={this.props.screenProps.transactions} ></TransactionsDisplay>
            </View>
        );
    }
}

// const noop = () => {};
// const createScene = (title, renderContent = noop) => class Scene extends Component {
//   static navigationOptions = {
//     title,
//   };
//
//   render() {
//     return (
//       <View style={styles.sceneContainer}>
//         {renderContent(this.props)}
//       </View>
//     );
//   }
// };
//
// function renderTransactions(props) {
//     console.log(props.screenProps);
//     return (
//         <View style={styles.sceneContainer}>
//             <TransactionsDisplay style={styles.transactionDisplay} transactions={props.screenProps.transactions} ></TransactionsDisplay>
//         </View>
//     );
// };
//
// const MetricsScene = createScene('Metrics', renderTransactions);
// const TransactionsScene = createScene('Transactions');

export const TabScene = createMaterialTopTabNavigator(
    {
        scene1: {screen: MetricsScene},
        scene2: {screen: TransactionsScene},
    },
    {
        initialRouteName: 'scene1',
        tabBarOptions: {
            activeTintColor: colors["backgroundColor"],
            inactiveTintColor: colors["backgroundColor"],
            upperCaseLabel: true,
            pressColor: colors["backgroundColor"],
            indicatorStyle: {
                backgroundColor: colors["backgroundColor"],
            },
            style: {
                backgroundColor: colors["buttonColor"],
                elevation: 4,
                //height: 50,
            }
        },
    }
);

TabScene.navigationOptions = {
    header: {
        visible: false,
    },
};

export default class DetailTypeNavigation extends Component {
    render() {
        return (
            <TabScene screenProps={this.props}/>
        )
    }
}

const styles = StyleSheet.create({
    sceneContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'stretch',
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
