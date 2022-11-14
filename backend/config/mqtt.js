const cert = require('../kcert')
module.exports = {
    options: {
        protocol: 'mqtt',
        port: 1883,
        username: 'user',
        password: 'user123',
        cert: cert
    },
    brokerUrl: 'mqtt://10.10.100.10',
 
}
