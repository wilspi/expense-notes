/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

//use strict;
import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DateDisplay from "./src/components/dateDisplay";
import DetailsDisplay from "./src/components/detailsDisplay";
import AddTransactionForm from "./src/components/addTransactionForm";
import { colors } from "./src/utils/constants";


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            addFormVisibility: false
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.toggleAddFormVisibility = this.toggleAddFormVisibility.bind(this);
    }

    handleDateChange(newDate) {
        this.setState({ date: newDate });
    }

    toggleAddFormVisibility(visible) {
        this.setState({
            addFormVisibility: visible
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headingSection}>
                    <DateDisplay date={this.state.date} onDateChange={this.handleDateChange} ></DateDisplay>
                </View>

                <View style={styles.contentSection}>
                    <DetailsDisplay date={this.state.date}></DetailsDisplay>
                </View>

                <View style={styles.addButtonView}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => this.toggleAddFormVisibility(true)} >
                        <Icon name="plus" size={45} color={colors["backgroundColor"]} />
                    </TouchableOpacity>
                </View>

                <AddTransactionForm
                    visibility={this.state.addFormVisibility}
                    onDateChange={this.handleDateChange}
                    toggleVisibility={this.toggleAddFormVisibility}></AddTransactionForm>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "stretch",
        backgroundColor: colors["backgroundColor"],
        padding: 10,
        paddingBottom: 0,
    },
    headingSection: {
        flex: 1,
    },
    contentSection: {
        flex: 9,
    },
    addButtonView: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 18
    },
    addButton: {
        borderWidth: 0.2,
        borderColor: colors["highlightButtonColor"],
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor: colors["highlightButtonColor"],
        borderRadius:50,
        elevation: 4,
    },
});
