import express from 'express';
import cors from 'cors';
import * as db from './dbHandler.js';
import genres from './genres.js';
import jwt from 'express-jwt';
// import { jwt } from 'express-jwt';
import { expressJwtSecret } from "jwks-rsa";
import fetch from 'node-fetch';

const app = express();
const port = 3100;
const host = '0.0.0.0';

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());


function checkAuth(req: any):boolean {
  if(!req.user) {
    return false
  }
  return true
}

let jwksUrl: string = "";

let jwtConfig:jwt.Options;

try {
  let oidResponse = await fetch(`http://localhost:8082/realms/OIDC-Demo/.well-known/openid-configuration`)
  let oidBody:any = await oidResponse.json();
      jwksUrl = oidBody.jwks_uri;
      console.log("Received OIDC config");
      jwtConfig = {
          algorithms: ["RS256"],
          secret: expressJwtSecret({
              jwksUri: jwksUrl
          }),
          // issuer: 'http://localhost:8082/auth/realms/OIDC-Demo'
      };
} catch (error) {
  console.error(error);
  process.exit();  
}

// import http from 'http';
// const options = {
//   hostname: 'localhost',
//   port: 8082,
//   path: '/realms/OIDC-Demo/.well-known/openid-configuration',
//   method: 'GET'
// };

// const reqH = http.request(options, (resH) => {
//   resH.on('data', (d) => {
//     let oidBody:any = JSON.parse(d);
//     jwksUrl = oidBody.jwks_uri;
//     console.log("Received OIDC config");
//     jwtConfig = {
//         algorithms: ["RS256"],
//         secret: expressJwtSecret({
//             jwksUri: jwksUrl
//         }),
//         issuer: 'http://localhost:8082/auth/realms/OIDC-Demo'
//     };
//   });
// });

// reqH.on('error', (error) => {
//   console.error(error);
// });

// reqH.end();

console.log(jwtConfig)
app.get('/tracks/:user', jwt(jwtConfig), async  (req, res) => {
  console.log(req)
  let data;
  try {
    data = await db.getAllFromTable('track', req.params.user)
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.get('/track/:id', async (req, res) => {
  let data;
  try {
    data = await db.getOneWithID('track', parseInt(req.params.id))
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.post('/track', async (req, res) => {
  let request_data = req.body;
  // request_data.projectId = 1;

  try {
    let data = await db.createTrack(request_data);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.put('/track', async (req, res) => {
  let request_data = req.body;
  
  try {
    let data = await db.changeTrack(request_data);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.delete('/track', async (req, res) => {
  let request_data = req.body;

  try {
    let data = await db.deleteTrack(request_data.id);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.get('/genres', (req, res) => {
  res.status(200).json(genres);
})

/*
TAKES: any field that exist on model track. no specific amount of fields required
DELIVERS: all strictly matching tracks
*/
app.get('/trackQuery', async (req, res) => {
  let request_data = req.body;

  try {
    let data = await db.trackQuery(request_data);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

function returnNumIfNum(text:any) {
  if (isNaN(text)) {
    return undefined
  } else {
    return parseInt(text)
  }
}

app.get('/tracksByProject/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let data = await db.tracksByProject(id);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.get('/trackFullText/:query', async (req, res) => {
  let request_data = req.params;
  try {
    let data = await db.trackFullText(request_data.query);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.get('/projects/:user', async (req, res) => {
  let data;
  try {
    data = await db.getAllFromTable('project', req.params.user)
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.get('/project/:id', async (req, res) => {
  let data;
  try {
    data = await db.getOneWithID('project', parseInt(req.params.id))
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.post('/project', async (req, res) => {
  let request_data = req.body;
  
  try {
    let data = await db.createProject(request_data);
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.put('/project', async (req, res) => {
  let request_data = req.body;
  try {
    let data = await db.changeProject(request_data);
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.delete('/project', async (req, res) => {
  let request_data = req.body;
  try {
    let data = await db.deleteProject(request_data.id);
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.get('/projectFullText/:query', async (req, res) => {
  let request_data = req.params;
  try {
    let data = await db.projectFullText(request_data.query);
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})


app.listen(port, host, () => {
  console.log("running")
})