var stripe = require('./')(process.env.STRIPE_API)

var card = {
    number: 4242424242424242,
    exp_month: 12,
    exp_year: 2019,
    cvc: 144
};

describe("Stripe Wrapper Testing", function () {

    it('Create Token', function (done) {
        stripe.tokens.create({card: card}, function(err, token) {
            if (err) {
                done(err)
            } else {
                if (token && token.id)
                    done()
                else 
                    done('Did not receive token id')
            }
        })
    });

});