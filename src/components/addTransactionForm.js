/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */

import React, { Component } from 'react';
import {
    // AsyncStorage,
    Modal,
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import t from 'tcomb-form-native';
// import { AdMobBanner } from 'react-native-admob';

import CustomButton from "./customButton";
import { categories, monthNames, addTransaction } from "../utils/helper";
import { colors } from "../utils/constants";


var Form = t.form.Form;
const ExpenseCategories = t.enums(categories);
var Positive = t.refinement(t.Number, function (n) {
  return n > 0;
});
var Transaction = t.struct({
    transactionTitle: t.String,
    transactionAmount: Positive,
    transactionAt: t.Date,
    transactionCategory: ExpenseCategories,
    transactionNotes: t.maybe(t.String),
});

t.form.Form.stylesheet.textbox.normal.borderColor = colors['headingColor'];
t.form.Form.stylesheet.textbox.normal.color = colors['highlightTextColor'];
t.form.Form.stylesheet.dateTouchable.normal.color = colors['cardBackgroundColor'];

var options = {
    fields: {
        transactionTitle: {
            placeholder: 'Expense ?',
            help: 'Add some expense title',
            autoCapitalize: "words",
        },
        transactionAmount: {
            placeholder: 'How Much ?',
            help: 'Add the expense amount',
        },
        transactionAt: {
            mode: 'date',
            dialogMode: 'calendar',
            maximumDate: new Date(),
            config: {
                format: (date) => date.getDate()+" "+monthNames[date.getMonth()],
            },
        },
        transactionCategory: {
            nullOption: {value: '', text: 'Choose category'},
            help: 'Select your expense category',
        },
        transactionNotes: {
            label: 'Notes (if any)',
            hidden: true,
        },
    },
    order: ['transactionTitle', 'transactionAmount', 'transactionCategory', 'transactionAt', 'transactionNotes'],
    auto: 'none',
};


export default class AddTransactionForm extends Component {
    constructor(props) {
        super(props);
        this.clearForm = this.clearForm.bind(this);
        //AsyncStorage.clear();

        this.state = {
            transactionValues: {
                transactionTitle: "",
                transactionNotes: "",
                transactionAmount: "",
                transactionAt: new Date(),
                transactionCategory: "",
            }
        }
    }

    clearForm() {
        this.setState({
            transactionValues: {
                transactionTitle: "",
                transactionNotes: "",
                transactionAmount: "",
                transactionAt: new Date(),
                transactionCategory: "",
        }});
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visibility}
                onRequestClose={() => {
                    this.props.toggleVisibility(!this.props.visibility);
                }}>

                <ScrollView style={styles.formContainer}>
                    <View style={styles.formHeadingView}>
                        <Text style={styles.headingText}>MAKE -a- NOTE</Text>
                    </View>
                    <View>
                        <Form
                            ref="form"
                            type={Transaction}
                            value={this.state.transactionValues}
                            options={options}
                            onChange={(value) => {
                                // this is heavy lifting against rendering in my opinion
                                this.setState({transactionValues: value});
                            }}
                            style={styles.form}/>
                    </View>

                    <View style={styles.buttonsRow}>
                        <CustomButton
                            onPress={() => {
                                // do check Validations
                                var value = this.refs.form.getValue();
                                if (value) {
                                    addTransaction(value);
                                    this.clearForm();
                                    this.props.onDateChange(new Date(value.transactionAt));
                                    this.props.toggleVisibility(!this.props.visibility);
                                }
                            }}
                            text="ADD"
                            style={styles.addButton} />
                        <CustomButton
                            onPress={() => {
                                this.props.toggleVisibility(!this.props.visibility);
                            }}
                            text="CLOSE"
                            style={styles.cancelButton} />
                    </View>
                </ScrollView>

             </Modal>
        )
    }
}

// <AdMobBanner
//     adSize="smartBannerPortrait"
//     adUnitID="ca-app-pub-7580790826155961/6942102162"
//     // testDevices={[AdMobBanner.simulatorId]}
//     // onAdLoaded={() => console.log("Ad loaded")}
//     // onAdFailedToLoad={error => console.error(error)}
//     />


const styles = StyleSheet.create({
    formContainer: {
        paddingTop: 22,
        padding: 10,
        backgroundColor: colors["backgroundColor"],
    },
    form: {},
    buttonsRow: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 60,
    },
    addButton: {},
    cancelButton: {},
    formHeadingView: {
        //flex: 1,
        marginTop: 30,
        marginBottom: 50,
        backgroundColor: colors['buttonColor'],
        //color: "#fff",
        elevation: 4,
    },
    headingText: {
        textAlign: "center",
        fontSize: 24,
        color: colors["buttonTextColor"],
        fontFamily: "Oswald",
        //fontWeight: "bold",
    },
});
