var http = require('http')
var spawn = require('child_process').spawn
var createHandler = require('github-webhook-handler')
//此处的path和secret必须和github的webhooks里面的一一对应
var handler = createHandler({
  path: '/pushAction',
  secret: 'keclin712'
})
//创建一个http服务，监听端口3333
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location')
  })
}).listen(3333)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

//监听push操作，并调用shell脚本文件
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  rumCommand('sh', ['./pushCode.sh'], function (txt) {
    console.log(txt)
  })
})

function rumCommand(cmd, args, callback) {
  var child = spawn(cmd, args)
  var response = ''
  child.stdout.on('data', function (buffer) {
    response += buffer.toString()
  })
  child.stdout.on('end', function () {
    callback(response)
  })
}
