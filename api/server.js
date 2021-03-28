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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const dataPath = './users.json'
const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = 'utf8'
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fileData,
  callback,
  filePath= dataPath,
  encoding = 'utf8'
) => {
  fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
      throw err;
    }

    callback();
  });
};


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
      return res.status(status).json({success,status, message})
      
    }
    const success = true
    const access_token = createToken({email, password})
    const user = userdb.users.find(user=> user.email === email)
    const userId = user.id
    return res.status(200).json({userId, success, access_token})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
    if(req.baseUrl === '/signup') next()
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      const message = 'Error in authorization format'
      return res.status(status).json({status, message})
      
    }
    try {
      let verifyTokenResult;
       verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  
       if (verifyTokenResult instanceof Error) {
         const status = 401
         const message = 'Access token not provided'
         return res.status(status).json({status, message})
       }
       next()
    } catch (err) {
      const status = 401
      const message = 'Error access_token is revoked'
      return res.status(status).json({status, message})
    }
})

server.get('/items/userId', (req, res) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        return res.status(status).json({status, message})
        
      }
      try {
        let verifyTokenResult;
         verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
    
         if (verifyTokenResult instanceof Error) {
           const status = 401
           const message = 'Access token not provided'
           return res.status(status).json({status, message})
           
         }
        itemsdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
        const userId = req.headers.userid
        const items = itemsdb.items.filter(item=> item.userId === userId)
        res.status(200).json(items)
      } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked'
        return res.status(status).json({status, message})
      }
})

server.post('/signup', (req, res) => {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
  const {email,password} = req.body
  const emailUsed = userdb.users.findIndex(user=> user.email === email)
  if (emailUsed !== -1) {
    const success = false
    const status = 401
    const message = 'This email has already been used'
    return res.status(status).json({success,status, message})
  }
  const id = uuidv4()
  const users = userdb.users.push({id:id,email:email,password:password})
  console.log(users)
  const fileData = JSON.stringify(users, null, 2)
  console.log(fileData)
  fs.writeFile('./users.json', fileData, 'UTF-8', err => {
    if (err) {
      throw err;
    }
    () => {
      return res.status(200).json('sign-up successfull')
  };
  })})

server.listen(port);
server.use(router);
