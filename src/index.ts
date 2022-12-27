import { PrismaClient } from "@prisma/client";
import express from 'express';
import cors from 'cors';
import * as sqlite from './sqliteHandler.js';

const app = express();
const port = 3100;
const host = '0.0.0.0';
const prisma = new PrismaClient();

app.disable('x-powered-by')

app.use(cors())
app.use(express.json())

app.get('/tracks', async  (req, res) => {
  let data;
  try {
    data = await sqlite.getAllFromTable('track')
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
    data = await sqlite.getOneWithID('track', parseInt(req.params.id))
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.post('/track', async (req, res) => {
  let request_data = req.body;
  request_data.projectId = 1;

  try {
    let data = await sqlite.createTrack(request_data);
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
    let data = await sqlite.changeTrack(request_data);
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
    let data = await sqlite.deleteTrack(request_data.id);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})


/*
TAKES: any field that exist on model track. no specific amount of fields required
DELIVERS: all strictly matching tracks
*/
app.get('/trackQuery', async (req, res) => {
  let request_data = req.body;

  try {
    let data = await sqlite.trackQuery(request_data);
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
    let data = await sqlite.tracksByProject(id);
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
    let data = await sqlite.trackFullText(request_data.query);
    res.setHeader('content-Type', 'application/json')
    res.status(200).json(data)
  } catch (error:any) {
    error.time = Date.now()
    console.log(error)
  }
})

app.get('/projects', async (req, res) => {
  let data;
  try {
    data = await sqlite.getAllFromTable('project')
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
    data = await sqlite.getOneWithID('project', parseInt(req.params.id))
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
    let data = await sqlite.createProject(request_data);
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
    let data = await sqlite.changeProject(request_data);
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
    let data = await sqlite.deleteProject(request_data);
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
    let data = await sqlite.projectFullText(request_data.query);
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