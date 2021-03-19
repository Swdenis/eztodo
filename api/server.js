const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3001
const fs = require('fs')
const jwt = require('jsonwebtoken')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
let itemsdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
const bodyParser = require('body-parser')


server.use(middlewares);
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))


const SECRET_KEY = 'SUPERSECRETKEY'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
  }
  
  // Verify the token 
  function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
  }
  
  // Check if the user exists in database
  function isAuthenticated({email, password}){
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
  }

server.post('/auth/login', (req, res) => {
    const {email, password} = req.body
    if (isAuthenticated({email, password}) === false) {
      const success = false
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({success,status, message})
      return
    }
    const success = true
    const access_token = createToken({email, password})
    const user = userdb.users.find(user=> user.email === email)
    const userId = user.id
    res.status(200).json({userId, success, access_token})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      const message = 'Error in authorization format'
      res.status(status).json({status, message})
      return
    }
    try {
      let verifyTokenResult;
       verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  
       if (verifyTokenResult instanceof Error) {
         const status = 401
         const message = 'Access token not provided'
         res.status(status).json({status, message})
         return
       }
       next()
    } catch (err) {
      const status = 401
      const message = 'Error access_token is revoked'
      res.status(status).json({status, message})
    }
})

server.get('/items/userId', (req, res) => {

    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({status, message})
        return
      }
      try {
        let verifyTokenResult;
         verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
    
         if (verifyTokenResult instanceof Error) {
           const status = 401
           const message = 'Access token not provided'
           res.status(status).json({status, message})
           return
         }
        itemsdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
        const userId = req.headers.userid
        const items = itemsdb.items.filter(item=> item.userId === userId)
        res.status(200).json(items)
      } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({status, message})
      }
})

server.get('/meetings/userId', (req, res) => {

  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      const message = 'Error in authorization format'
      res.status(status).json({status, message})
      return
    }
    try {
      let verifyTokenResult;
       verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  
       if (verifyTokenResult instanceof Error) {
         const status = 401
         const message = 'Access token not provided'
         res.status(status).json({status, message})
         return
       }
      db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
      const userId = req.headers.userid
      const meetings = db.meetings.filter(meeting=> meeting.userId === userId)
      res.status(200).json(meetings)
    } catch (err) {
      const status = 401
      const message = 'Error access_token is revoked'
      res.status(status).json({status, message})
    }
})

server.listen(port);
server.use(router);