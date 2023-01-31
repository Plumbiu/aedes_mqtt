# 1. 什么是MQTT

MQTT(英文全称Message Queuing Telemetry Transport，消息队列遥测传输协议)是一种基于发布/订阅（PUBLISH/SUBSCRIBE）模式的轻量级的物联网通信协议。

**简单来说**：

mqtt协议中有三类东西：**publisher(发布者)、topic(主题)、subscriber(订阅者)**

一个 topic(主题)可以被多个人订阅，订阅这个 topic 的人叫做 subscriber(订阅者)，当有 publisher(发布者)在这个主题上发布内容时，subscriber 便会接收到这些数据内容。

**举个栗子**：**爸爸、妈妈、你**(可以是 publisher，也可以是subscriber)建了一个微信群，名字就叫**相亲相爱一家人**(可以把这个看成一个 topic)当你点击进入群聊时，你就订阅了名为相亲相亲一家人的 topic，同时爸爸妈妈也订阅了这个主题，那么你发了一条**爸爸妈妈新年快乐**，作为 subscriber 的爸爸妈妈也会受到这条信息，此时你就是 publisher。

注意，微信聊天采用的并不是 mqtt 协议，以上主要是举个例子方便理解，mqtt 协议主要还是用于单片机交互中。

# 2. 使用 aedes 创建一个 mqtt 服务器

先创建一个基本的服务器：

```js
const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)

server.listen(1883, function () {
  console.log('server is running at http://127.0.0.1:1883')
})
```

以上是一个最基本的框架，接下来我们将接受单片机等发过来的数据

```js
// 当有人订阅我们主题时触发
aedes.on('client', (client) => 
  	console.log('client.id', client.id)
})
// 当有人向我们发布内容时触发
aedes.on('publish', (packet, client) => {
    const topic = packet.topic
  	const payload = packet.payload.toString()
  	console.log('topic', topic)
  	console.log('payload', payload)
})
```

当然我不可能用现成的单片机去生产数据，这里我们就要用到 `mqtt.fx` 这个软件了。

![](https://plumbiu.github.io/blogImg/QQ截图20230131212721.png)

图片 `Broker Port` 应该写 1883，图片错误了。

之后再次点击 `connect` 即可连接了，连接成功后，我们试着发送一下内容(连接成功后可以看一下控制台，也是有打印数据的)。

![](https://plumbiu.github.io/blogImg/QQ截图20230131213408.png)

点击 `publish` 按钮后，看一下 vscode 终端打印：

![](https://plumbiu.github.io/blogImg/QQ截图20230131213538.png)

可见一个叫做 `xj_mqtt`  的主题成功向我们发送了 `{ "age": 19 }` 的数据。

这样就基本结束了，以后与嵌入式同学交流的时候，可以事先弄清楚有什么主题，传入的参数又是什么，再把数据整合发送给前端，一切万事大吉

# 3. 其他方法

上面我们只介绍了订阅和接收，其实还有更多的 api，读者们可以看其英文理解其含义，这里不再介绍

```js
aedes.on('unsubscribe', function (subscriptions, client) {

})
aedes.on('subscribe', function (subscriptions, client) {

})
aedes.on('clientDisconnect', function (client) {

})
```

