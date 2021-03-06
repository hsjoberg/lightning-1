const channelEdgeAsChannel = require('./channel_edge_as_channel');
const confirmedFromPayment = require('./confirmed_from_payment');
const confirmedFromPaymentStatus = require('./confirmed_from_payment_status');
const failureFromPayment = require('./failure_from_payment');
const forwardFromHtlcEvent = require('./forward_from_htlc_event');
const htlcAsPayment = require('./htlc_as_payment');
const infoAsWalletInfo = require('./info_as_wallet_info');
const nodeInfoAsNode = require('./node_info_as_node');
const paymentFailure = require('./payment_failure');
const policyFromChannelUpdate = require('./policy_from_channel_update');
const routesFromQueryRoutes = require('./routes_from_query_routes');
const rpcAttemptHtlcAsAttempt = require('./rpc_attempt_htlc_as_attempt');
const rpcChannelAsChannel = require('./rpc_channel_as_channel');
const rpcForwardAsForward = require('./rpc_forward_as_forward');
const rpcForwardAsForwardRequest = require('./rpc_forward_as_forward_request');
const rpcHopAsHop = require('./rpc_hop_as_hop');
const rpcInvoiceAsInvoice = require('./rpc_invoice_as_invoice');
const rpcPaymentAsPayment = require('./rpc_payment_as_payment');
const rpcPeerAsPeer = require('./rpc_peer_as_peer');
const rpcResolutionAsResolution = require('./rpc_resolution_as_resolution');
const rpcRouteAsRoute = require('./rpc_route_as_route');
const rpcTxAsTransaction = require('./rpc_tx_as_transaction');
const rpcUtxoAsUtxo = require('./rpc_utxo_as_utxo');
const stateAsFailure = require('./state_as_failure');

module.exports = {
  channelEdgeAsChannel,
  confirmedFromPayment,
  confirmedFromPaymentStatus,
  failureFromPayment,
  forwardFromHtlcEvent,
  htlcAsPayment,
  infoAsWalletInfo,
  nodeInfoAsNode,
  paymentFailure,
  policyFromChannelUpdate,
  routesFromQueryRoutes,
  rpcAttemptHtlcAsAttempt,
  rpcChannelAsChannel,
  rpcForwardAsForward,
  rpcForwardAsForwardRequest,
  rpcHopAsHop,
  rpcInvoiceAsInvoice,
  rpcPaymentAsPayment,
  rpcPeerAsPeer,
  rpcResolutionAsResolution,
  rpcRouteAsRoute,
  rpcTxAsTransaction,
  rpcUtxoAsUtxo,
  stateAsFailure,
};
