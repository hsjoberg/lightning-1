const asyncAuto = require('async/auto');
const {returnResult} = require('asyncjs-util');

const finishedPayment = require('./finished_payment');
const {isLnd} = require('./../../lnd_requests');
const subscribeToPayViaRequest = require('./subscribe_to_pay_via_request');

const method = 'sendPaymentV2';
const type = 'router';

/** Pay via payment request

  Requires LND built with `routerrpc` build tag

  Requires `offchain:write` permission

  Specifying `max_fee_mtokens`/`mtokens` is not supported in LND 0.8.2 or below
  Specifying `messages` is not supported on LND 0.8.2 and below

  `incoming_peer` is not supported on LND 0.8.2 and below

  Specifying `max_paths` is not suppoorted on LND 0.9.2 and below

  Specifying `outgoing_channels` is not supported on LND 0.10.0 and below

  {
    [incoming_peer]: <Pay Through Specific Final Hop Public Key Hex String>
    lnd: <Authenticated LND API Object>
    [max_fee]: <Maximum Fee Tokens To Pay Number>
    [max_fee_mtokens]: <Maximum Fee Millitokens to Pay String>
    [max_paths]: <Maximum Simultaneous Paths Number>
    [max_timeout_height]: <Maximum Height of Payment Timeout Number>
    [messages]: [{
      type: <Message Type Number String>
      value: <Message Raw Value Hex Encoded String>
    }]
    [mtokens]: <Millitokens to Pay String>
    [outgoing_channel]: <Pay Out of Outgoing Channel Id String>
    [outgoing_channels]: [<Pay Out of Outgoing Channel Ids String>]
    [pathfinding_timeout]: <Time to Spend Finding a Route Milliseconds Number>
    request: <BOLT 11 Payment Request String>
    [tokens]: <Tokens To Pay Number>
  }

  @returns via cbk or Promise
  {
    fee: <Total Fee Tokens Paid Rounded Down Number>
    fee_mtokens: <Total Fee Millitokens Paid String>
    hops: [{
      channel: <First Route Standard Format Channel Id String>
      channel_capacity: <First Route Channel Capacity Tokens Number>
      fee: <First Route Fee Tokens Rounded Down Number>
      fee_mtokens: <First Route Fee Millitokens String>
      forward_mtokens: <First Route Forward Millitokens String>
      public_key: <First Route Public Key Hex String>
      timeout: <First Route Timeout Block Height Number>
    }]
    id: <Payment Hash Hex String>
    mtokens: <Total Millitokens Paid String>
    paths: [{
      fee_mtokens: <Total Fee Millitokens Paid String>
      hops: [{
        channel: <First Route Standard Format Channel Id String>
        channel_capacity: <First Route Channel Capacity Tokens Number>
        fee: <First Route Fee Tokens Rounded Down Number>
        fee_mtokens: <First Route Fee Millitokens String>
        forward_mtokens: <First Route Forward Millitokens String>
        public_key: <First Route Public Key Hex String>
        timeout: <First Route Timeout Block Height Number>
      }]
      mtokens: <Total Millitokens Paid String>
    }]
    safe_fee: <Total Fee Tokens Paid Rounded Up Number>
    safe_tokens: <Total Tokens Paid, Rounded Up Number>
    secret: <Payment Preimage Hex String>
    timeout: <Expiration Block Height Number>
    tokens: <Total Tokens Paid Rounded Down Number>
  }
*/
module.exports = (args, cbk) => {
  return new Promise((resolve, reject) => {
    return asyncAuto({
      // Check arguments
      validate: cbk => {
        if (!isLnd({method, type, lnd: args.lnd})) {
          return cbk([400, 'ExpectedAuthenticatedLndToPayPaymentRequest']);
        }

        if (!args.request) {
          return cbk([400, 'ExpectedPaymentRequestToPayViaPaymentRequest']);
        }

        return cbk();
      },

      // Pay payment request
      pay: ['validate', ({}, cbk) => {
        const sub = subscribeToPayViaRequest({
          incoming_peer: args.incoming_peer,
          lnd: args.lnd,
          max_fee: args.max_fee,
          max_fee_mtokens: args.max_fee_mtokens,
          max_timeout_height: args.max_timeout_height,
          max_paths: args.max_paths,
          messages: args.messages,
          mtokens: args.mtokens,
          outgoing_channel: args.outgoing_channel,
          pathfinding_timeout: args.pathfinding_timeout,
          request: args.request,
          tokens: args.tokens,
        });

        const finished = (err, res) => {
          if (!!err) {
            return cbk(err);
          }

          return finishedPayment({
            confirmed: res.confirmed,
            failed: res.failed,
          },
          cbk);
        };

        sub.once('confirmed', confirmed => finished(null, {confirmed}));
        sub.once('error', err => finished(err));
        sub.once('failed', failed => finished(null, {failed}));

        return;
      }],
    },
    returnResult({reject, resolve, of: 'pay'}, cbk));
  });
};
