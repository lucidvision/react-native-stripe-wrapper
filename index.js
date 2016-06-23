'use strict';

if (!global.fetch)
    global.fetch = require('node-fetch')
    
var stripe_url = 'https://api.stripe.com/v1'

module.exports = function (publishable_key) {

    var performRequest = function(url, data, callback) {

        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch(stripe_url + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + publishable_key
            },
            body: formBody
        }).then(function(response) {
            return response.json()
        }).then(function(body) {
            if (body.error) {
                callback(body.error, null)
            } else {
                callback(null, body)
            }
        }).catch(function(err) {
            callback(err)
        })
    }

    var stripe = {}
    stripe.tokens = {}
    stripe.tokens.create = function (options, callback) {
        var cardDetails = {
            'card[number]': options.card.number,
            'card[exp_month]': options.card.exp_month,
            'card[exp_year]': options.card.exp_year,
            'card[cvc]': options.card.cvc
        }
        performRequest('/tokens', cardDetails, callback)
    }
    stripe.bankAccount = {}
    stripe.bankAccount.createToken = function(options, callback) {
        var bankAccountDetails = {
            'bank_account[country]': options.country,
            'bank_account[currency]': options.currency,
            'bank_account[account_holder_name]': options.account_holder_name,
            'bank_account[account_holder_type]': options.account_holder_type,
            'bank_account[routing_number]': options.routing_number,
            'bank_account[account_number]': options.account_number
        }
        performRequest('/tokens', bankAccountDetails, callback)
    }
    return stripe
}