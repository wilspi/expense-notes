/**
 * Expense Notes - React Native App
 * Author - https://github.com/wilspi
 */


/* Credits https://gist.github.com/jed/982883 */
export function uuid(a) {
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, uuid)
}

export function minifyAmount(amount) {
    if (amount>10000) {
        if (amount%1000==0) {
            return String(amount/1000)+"k";
        } else {
            return String(amount/1000)+"k+";
        }
    }
    return amount;
}

/* Credits https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/ */
function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


/*
    Possible Categories:
    1: 'Food & Dining',
    2: 'Travel',
    3: 'Bills & Utilities',
    4: 'Clothing & Lifestyle',
    5: 'Vacation & Trips',
    6: 'Electronics & Furniture',
    7: 'Books & Stationary',
    8: 'Sports & Activities',
    9: 'Healthcare & Medicines'
    10: 'Others'
*/

export const categories = {
    101: 'Food & Dining',
    201: 'Travel',
    301: 'Bills & Utilities',
    401: 'Shopping',
    701: 'Trips & Adventure',
    901: 'Healthcare',
    1001: 'Others'
};


const categoryIcons = {
    101: 'food', //rice
    201: 'bus', //motorbike //bike //subway-variant
    301: 'calendar', //calendar-edit //clipboard-text //clipboard-plus-outline
    401: 'cart', //shopping
    701: 'airballoon', //beach //swim
    901: 'ambulance',
    1001: 'pokeball' //flower //cat
};


export function iconForCategory(category) {
    if (category in categoryIcons) {
        return categoryIcons[category];
    }
    return categoryIcons[1001];
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

export function wrapText(text) {
    if (text.length > 25) {
        return (text.substring(0, 20) + "...");
    }
    return text;
}

function getDateEpoch(date) {
    //check if not date object
    date.setHours(0,0,0,0);
    const key = String(date.getTime()/1000);
    return key;
}

/* Credits https://docs.microsoft.com/en-us/scripting/javascript/reference/json-parse-function-javascript#example-2 */
function dateTimeReviver(key, value) {
    var a;
    if (typeof value === 'string') {
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
            return new Date(value);
        }
    }
    return value;
};

export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export function dateTextFormatter(inputDate=new Date()) {
    // Format to "26 January"
    formattedText = (inputDate.getDate() + " " + monthNames[inputDate.getMonth()]);

    // Format to today/yesterday if applicable
    let todaysDate = new Date();
    let diffTime = inputDate.getTime() - todaysDate.getTime();
    let diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    if (diffDays == 0) {
        formattedText = "Today";
    } else if (diffDays == -1) {
        formattedText = "Yesterday";
    }

    //return formattedText
    return formattedText.toUpperCase()
};


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


/*
Schema Version: 0.1
Data Model:

{
    DateEpoch: {
        transactions: {
            transactionId: {
                transactionId: 2343123,
                transactionAt: ,
                transactionTitle: ,
                transactionAmount: ,
                transactionCategory: ,
                transactionNotes: ,
                transactionTags: ,
                createdAt: ,
                modifiedAt: ,
                deletedAt: ,
                schemaVersion:
            }
        }
    }
}
*/

import { AsyncStorage } from 'react-native';
export async function fetchTransactions(date) {
    let transactions = []

    try {
        const key = getDateEpoch(date);

        const value = await AsyncStorage.getItem('@MySuperStore:'+key);
        if (value) {
            transactions = JSON.parse(value, dateTimeReviver);
        } else {
            transactions = []
        }
        // if (value.hasOwnProperty("transactions")) {
        //     transactions = value["transactions"];

    } catch (error) {
        console.log("Error retrieving data" + error);
    }
    return transactions;
}

export async function addTransaction(data, transactionDate) {
    if (transactionDate === null)
        transactionDate = new Date();
    if (data) {
        /* data is frozen here, so stringify and parse to clone it. Read, https://stackoverflow.com/a/22058484 */
        var transaction = extend(JSON.parse(JSON.stringify(data), dateTimeReviver), {
            transactionId: uuid(),
            transactionTags: [],
            createdAt: transactionDate,
            modifiedAt: transactionDate,
            deletedAt: null,
            schemaVersion: "0.1",
        });

        try {
            const key = getDateEpoch(transaction['transactionAt']);
            const existingTransactions = await AsyncStorage.getItem('@MySuperStore:'+key);
            let transactions = []
            // later make it {id: {transaction object}}
            if (existingTransactions) {
                transactions = JSON.parse(existingTransactions) || [];
            }
            /* unshift - to add latest entry on top. Else sorting will have to be done before rendering. */
            transactions.unshift(transaction);
            await AsyncStorage.setItem('@MySuperStore:'+key, JSON.stringify(transactions));

        } catch (error) {
            console.log("Error setting data" + error);
        }
    }
}

export function fetchBalance(transactions) {
    let sum = 0.0;
    for (let i in transactions) {
        if (transactions[i].hasOwnProperty("transactionAmount") &&
            (!transactions[i].hasOwnProperty("deletedAt") || !transactions[i]["deletedAt"])) {
            sum += transactions[i]["transactionAmount"];
        }
    }
    return sum;
}
export async function deleteTransaction(date, Id) {
     try {
         const key = getDateEpoch(date);
         const existingTransactions = JSON.parse(await AsyncStorage.getItem('@MySuperStore:'+key));
         let transactions = []
         for (var i = 0; i < existingTransactions.length; i++) {
             if( Id != existingTransactions[i].transactionId){
                 transactions.push(existingTransactions[i]);
             }
         }
         await AsyncStorage.setItem('@MySuperStore:'+key, JSON.stringify(transactions));

         return true;
     }
     catch(exception) {
         return false;
     }
 }

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export async function editTransaction(date, Id, value) {
    try {
        const key = getDateEpoch(date);
        const existingTransactions = JSON.parse(await AsyncStorage.getItem('@MySuperStore:'+key));
        for (var i = 0; i < existingTransactions.length; i++) {
            if( Id == existingTransactions[i].transactionId){
                existingTransactions[i].transactionAmount = value.transactionAmount;
                existingTransactions[i].createdAt = value.transactionAt;
                existingTransactions[i].modifiedAt = value.transactionAt;
                existingTransactions[i].transactionCategory = value.transactionCategory;
                existingTransactions[i].transactionTitle = value.transactionTitle;
                existingTransactions[i].transactionNotes = value.transactionNotes;
            }
        }
        await AsyncStorage.setItem('@MySuperStore:'+key, JSON.stringify(existingTransactions));

        return true;
    }
    catch(exception) {
        return false;
    }
}
