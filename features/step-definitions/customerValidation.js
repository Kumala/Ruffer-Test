/**
 * Created by Vijay on 12/06/2017.
 */
const assert= require('chai').assert;
let chai = require('chai');
chai.use(require('chai-datetime'));

let fs = require('fs');
let Content,Lines,RowCount,ColValue,Count,Check;
let Data;

/*** To get the number of records in the text file ***/
function getRow() {
    return Lines.length;
}

/*** To get the Data for corresponding Column of the record from the text file ***/
function getValue(Row,Column) {
    let item = Lines[Row].split(',');
    switch (Column) {
        case 0:
            Data = parseInt(item[Column]);
            break;
        case 1:
            Data = item[Column];
            break;
        case 2:
            Data = parseInt(item[Column]);
            break;
        case 3:
            Data = item[Column];
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
        Content = fs.readFileSync('txndetails.txt', 'utf8');
        Lines = Content.split('\r\n');
        RowCount = getRow();
    });

    this.When(/^I validate the transaction id$/, function () {
        ColValue = 0;
    });

    this.Then(/^it should be a positive number$/, function () {
        /** Count starts from 1 as we need to skip the heading of the table       ***/
        for (Count = 1; Count <= Lines.length; Count++) {
            assert.isAbove(getValue(Count, ColValue),0,"The transaction ID for record "+Count+" is not valid");
        }
    });

    this.Then(/^it should not be a duplicate$/, function () {
        for (Count = 1; Count < Lines.length-1; Count++) {
            for (Check = 2;Check < Lines.length; Check++){
                if(getValue(Count, ColValue)===getValue(Check,ColValue) && (Count !== Check)) {
                    assert.notStrictEqual(getValue(Count, ColValue), getValue(Check, ColValue), "Duplicate Tx ID for record "+Count);
                }
            }
        }
    });

    this.When(/^I validate the customer id$/, function () {
        ColValue = 1;
    });

    this.Then(/^customer id should not be empty$/, function () {
        for (Count = 1; Count < Lines.length; Count++) {
            assert.isNotEmpty(getValue(Count, ColValue),"Customer ID should for record "+Count+" is empty");
        }
    });

    this.When(/^I validate the transaction amount$/, function () {
        ColValue = 2;
    });

    /** Tx amount is checked for at least 0, as discount coupons can be used to get the item for free  **/
    this.Then(/^it should be a valid amount$/, function () {
        for (Count = 1; Count < Lines.length; Count++) {
            assert.isAtLeast(getValue(Count, ColValue),0,"Transaction amount for record "+Count+" is not valid");
        }
    });

    this.When(/^I validate the product$/, function () {
        ColValue = 3;
    });

    this.Then(/^product should not be empty/, function () {
        for (Count = 1; Count < Lines.length; Count++) {
            assert.isNotEmpty(getValue(Count, ColValue),"The product name for record "+Count+" is Empty");
        }
    });

    this.When(/^I validate the datetime$/, function () {
        ColValue = 4;
    });

    this.Then(/^it should not be in future$/, function () {
        for (Count = 1; Count < Lines.length; Count++) {
            let now = new Date();
            assert.beforeDate(getValue(Count, ColValue),now,getValue(Count, ColValue),"The date for record "+Count+" is in future");
        }
    });

}