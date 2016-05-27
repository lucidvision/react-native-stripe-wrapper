"use strict";

if (!global.fetch)
    global.fetch = require('node-fetch')
    
var stripe_url = 'https://api.stripe.com/v1/'

module.exports = function (publishable_key) {
    var stripe = {};
    stripe.tokens = {};
    stripe.tokens.create = function (options, callback) {
        var cardDetails = {
            "card[number]": options.card.number,
            "card[exp_month]": options.card.exp_month,
            "card[exp_year]": options.card.exp_year,
            "card[cvc]": options.card.cvc
        };

        var formBody = [];
        for (var property in cardDetails) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(cardDetails[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(stripe_url + 'tokens', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + publishable_key
            },
            body: formBody
        }).then(function(response) {
            return response.text()
        }).then(function(body) {
            var body = JSON.parse(body)
            if (body.error) {
                callback(body.error, null)
            } else {
                callback(null, JSON.parse(body))
            }
        }).catch(function(err) {
            callback(err)
        })
    }
    return stripe
}