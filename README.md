## Stripe API Wrapper
Stripe API wrapper that can create card tokens

```javascript
var stripe = require('react-native-stripe-wrapper')('sk_test_sdf3fmveovm3');

stripe.tokens.create({
    card: {
        number: '424242424242',
        exp_month: 12,
        exp_year: 2018,
        cvc: 213
    }
  }, function(err, token) {
});
```

