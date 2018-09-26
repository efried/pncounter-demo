const HazelcastClient = require('hazelcast-client').Client;
const Config = require('hazelcast-client').Config;
let config = new Config.ClientConfig();
config.addresses = [{host: '<host_ip>'}];

HazelcastClient.newHazelcastClient(config).then(function (hazelcastClient) {
    let eventCounter = hazelcastClient.getPNCounter('EventCounter');

    for (let i = 0; i < 5; i++) {
        eventCounter.addAndGet(1).then(function(val) {
            console.log("Client 1 incremented. Current value: " + val);
        });
    }
});

HazelcastClient.newHazelcastClient(config).then(function (hazelcastClient) {
    let eventCounter = hazelcastClient.getPNCounter('EventCounter');

    for (let i = 0; i < 5; i++) {
        eventCounter.addAndGet(1).then(function(val) {
            console.log("Client 2 incremented. Current value: " + val);
        });
    }
});