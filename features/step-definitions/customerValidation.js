/**
 * Created by Vijay on 12/06/2017.
 */
var assert = require('chai').assert;
var expect = require('chai').expect;

var fs = require('fs');
var Content,Lines,RowCount,ColValue,Count,Check;
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
        Content = fs.readFileSync('../../txndetails.txt', 'utf8');
        Lines = Content.split('\r\n');
        RowCount = getRow();
    });

    this.When(/^I validate the transaction id$/, function () {
        ColValue = 0;
    });

    this.Then(/^it should be a positive number$/, function () {
        /** Count starts from 1 as we need to skip the heading of the table       ***/
        for (Count = 1; Count < Lines; Count++) {
            assert.isAbove(getValue(Count, ColValue),0,"The transaction ID is not correct");
        }
    });

    this.Then(/^it should not be a duplicate$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            for (Check = 2;Check < Lines; Check++){
                if(getValue(Count, ColValue)===getValue(Check,ColValue)) {
                    assert.notStrictEqual(getValue(Count, ColValue), getValue(Check, ColValue), "Duplicate Tx ID");
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
            expect(getValue(Count, ColValue)).to.be.a('string');
        }
    });

    this.When(/^I validate the transaction amount$/, function () {
        ColValue = 2;
    });

    /** Tx amount is checked for at least 0, as discount coupons can be used to get the item for free  **/
    this.Then(/^it should be a positive number$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            assert.isAtLeast(getValue(Count, ColValue),0,"Transaction amount is not valid");
        }
    });

    this.When(/^I validate the product$/, function () {
        ColValue = 3;
    });

    this.Then(/^it should not be null$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            assert.isNotNull(getValue(Count, ColValue),"The product name is null");
        }
    });

    this.When(/^I validate the datetime$/, function () {
        ColValue = 4;
    });

    this.Then(/^it should be a date$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            assert.isDate(getValue(Count, ColValue),"Invalid date");
        }
    });

    this.Then(/^it should not be in future$/, function () {
        for (Count = 1; Count < Lines; Count++) {
            var now = new Date();
            expect(getValue(Count, ColValue)).to.be.beforeDate(now);
        }
    });

}