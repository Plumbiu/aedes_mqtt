const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
// 当有人订阅我们触发
aedes.on('client', (client) => {
  console.log('client.id', client.id)
})
aedes.on('unsubscribe', function (subscriptions, client) {

})
aedes.on('subscribe', function (subscriptions, client) {

})
aedes.on('clientDisconnect', function (client) {

})
// 当有人向我们发布内容时触发
aedes.on('publish', (packet, client) => {
  const topic = packet.topic
  const payload = packet.payload.toString()
  console.log('topic', topic)
  console.log('payload', payload)
})
server.listen(1883, function () {
  console.log('server is running at http://127.0.0.1:1883')
})