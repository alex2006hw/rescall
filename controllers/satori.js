var RTM = require("satori-rtm-sdk");

// create an RTM client instance
var rtm = new RTM("wss://og3ayb2g.api.satori.com", "D364dDfea10C2F3eede8e5DE92e3A88B");
// create a new subscription with "your-channel" name
var channel = rtm.subscribe("disrupt", RTM.SubscriptionMode.SIMPLE);

// add channel data handlers

// channel receives any published message
channel.on("rtm/subscription/data", function(pdu) {
    pdu.body.messages.forEach(updateData);
});

// client enters 'connected' state
rtm.on("enter-connected", function() {
    rtm.publish("disrupt", {status: "connect", time: new Date()});
});

// client receives any PDU and PDU is passed as a parameter
rtm.on("data", function(pdu) {
    if (pdu.action.endsWith("/error")) {
        rtm.restart();
    }
});

// start the client
rtm.start();

//////////////////////////
// supporting functions //
//////////////////////////

const updateData = (data) => {
  console.log('1.satori updateData : ',data);
}
