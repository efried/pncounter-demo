const HazelcastClient = require('hazelcast-client').Client;
const Config = require('hazelcast-client').Config;
let config = new Config.ClientConfig();
config.addresses = [{host: '<host_ip>'}];

config.listeners.addLifecycleListener(function (state) {
    console.log('LIFECYCLE EVENT >>> ' + state);
});

HazelcastClient.newHazelcastClient(config).then(function (hazelcastClient) {
    const client = hazelcastClient;
    let eventCounter = hazelcastClient.getPNCounter('EventCounter');

    eventCounter.get().then(function(val) {
        return eventCounter.subtractAndGet(val);
    }).then(function(newVal) {
        console.log(`Value reset to `, newVal);
    }).then(function() {
        return client.shutdown();
    });
});