const express = require('express')
const _dateBase = require('./api/datebase')
const _jwt = require('jsonwebtoken')
const _api = require('./api/api')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * 001 token不存在用户未登录
 * 002 用户名存在
 * 003 账号密码错误
 */

/**
 * 解决跨域
 */
app.all('*', (req, res, next) => {
    console.log(req);
    if (req.url != '/login' && req.url != '/register') {
      _jwt.verify(req.headers.token, 'token', (err) => {
        err ? res.json({code:001,data: '用户未登录'}) : next()
      })
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Content-Type','application/json')
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  })

/**
 * 注册
 */
app.post('/register', (req, res) => {
  const returnData = {status_code: '', data: ''}
  _api.findOrCreate(_dateBase.user, {name: req.body.name, password: req.body.password})
  .then((response) => {
    const findResult = response[1]
    if (findResult) {
      returnData.status_code = 200
    } else {
      returnData.status_code = 002
      returnData.data = '用户名已经存在'
    }
    res.json(returnData)
  })
})

/**
 * 登录
 */
 app.post('/login', (req, res) => {
  //  console.log(req.body)
   const returnData = {status_code: '', data: ''}
   _api.findOne(_dateBase.user, {name: req.body.name,password: req.body.password})
   .then((response) => {
     const findResult = response
     if (findResult) {
       returnData.status_code = 200
       returnData.token = _jwt.sign({name:req.body.name}, 'token')
       returnData.data = findResult
     } else {
       returnData.status_code = 003
       returnData.data = '密码错误'
     }
     res.json(returnData)
   })
 })

 app.get('/getCode', (req, res) => {
   res.json(req.headers.token)
 })


var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
