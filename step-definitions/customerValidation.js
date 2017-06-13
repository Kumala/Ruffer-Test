/**
 * Created by Vijay on 12/06/2017.
 */
const assert = require('assert');
var fs = require('fs');
var Content,Lines,RowCount,ColValue,Count;
var Data;

/*** To get the number of records in the text file ***/
function getRow() {
    return Lines.length;
}

/*** To get the Data for corresponding Column of the record from the text file ***/
function getValue(Row,Column) {
    var item = Lines[Row].split(',');
    switch (Column) {
        case 0:
            Data = parseInt(item[Column]);
            break;
        case 1:
            Data = (item[Column]);
            break;
        case 2:
            Data = parseInt(item[Column]);
            break;
        case 3:
            Data = (item[Column]);
            break;
        case 4:
            Data = new Date(item[Column]);
            break;
        default:
            Data="Error";
    }
    return Data;
}


module.exports = function () {
    this.Given(/^I have the customer details$/, function () {
        Content = fs.readFileSync('../txndetails.txt', 'utf8');
        Lines = Content.split('\r\n');
        RowCount = getRow();
    });

    this.When(/^I validate the transaction id$/, function () {
        ColValue = 0;
    });

    this.Then(/^it should be a positive number$/, function () {
        /** Count starts from 1 as we need to skip the heading of the table       ***/
        for (Count = 1; Count < Lines; Count++) {
            console.log(getValue(Count, ColValue)>0);
        }
    });

    this.Then(/^it should not be a duplicate$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            for (check=2;check < Lines; check++){
                if(getValue(Count, ColValue)===getValue(check,ColValue)) {
                    console.log("Duplicate Transaction ID")
                    break;
                }
            }
        }
    });

    this.When(/^I validate the customer id$/, function () {
        ColValue = 1;
    });

    this.Then(/^it should not be null$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            console.log(getValue(Count, ColValue).length>0);
        }
    });

    this.When(/^I validate the transaction amount$/, function () {
        ColValue = 2;
    });

    this.Then(/^it should be a positive number$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            console.log(getValue(Count, ColValue)>0);
        }
    });

    this.When(/^I validate the product$/, function () {
        ColValue = 3;
    });

    this.Then(/^it should not be null$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            console.log(getValue(Count, ColValue).length>0);
        }
    });

    this.When(/^I validate the datetime$/, function () {
        ColValue = 4;
    });

    this.Then(/^it should be a date$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            console.log(getValue(Count, ColValue) instanceof Date);
        }
    });

    this.Then(/^it should not be in future$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            var now = new Date();
            console.log(getValue(Count, ColValue) < now);
        }
    });

}