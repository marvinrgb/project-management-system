import { PrismaClient } from "@prisma/client";
import express from 'express';

const app = express();
const port = 3100;
const prisma = new PrismaClient();

app.disable('x-powered-by')

app.use(express.json())

app.get('/tracks', (req, res) => {
  prisma.track.findMany()
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.get('/track/:id', (req, res) => {
  let id = parseInt(req.params.id);
  prisma.track.findFirst({
    where: {
      id: id
    }
  })
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.post('/track', (req, res) => {
  let request_data = req.body;
  request_data.projectId = 1;

  prisma.track.create({
    data: request_data
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.put('/track', (req, res) => {
  let request_data = req.body;

  prisma.track.update({
    where: {
      id: request_data.id
    },
    data: request_data
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.delete('/track', (req, res) => {
  let request_data = req.body;

  prisma.track.delete({
    where: {
      id: request_data.id
    }
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})


/*
TAKES: any field that exist on model track. no specific amount of fields required
DELIVERS: all strictly matching tracks
*/
app.get('/trackQuery', (req, res) => {
  let request_data = req.body;
  prisma.track.findMany({
    where: request_data
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

function returnNumIfNum(text:any) {
  if (isNaN(text)) {
    return undefined
  } else {
    return parseInt(text)
  }
}

app.get('/trackFullText', async (req, res) => {
  let request_data = req.body;
  prisma.track.findMany({
    where: {
      OR: [
        {
          id: returnNumIfNum(request_data.query)
        },
        {
          name: {
            contains: request_data.query
          }
        },
        {
          description: {
            contains: request_data.query
          }
        },
        {
          genre: {
            contains: request_data.query
          }
        },
        {
          text: {
            contains: request_data.query
          }
        }
      ]
    }
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.get('/projects', (req, res) => {
  prisma.project.findMany()
  .then((data) => {
    res.setHeader('content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.get('/project', (req, res) => {
  let request_data = req.body;
  prisma.project.findFirst({
    where: {
      id: request_data.id
    }
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.post('/project', (req, res) => {
  let request_data = req.body;
  prisma.project.create({
    data: request_data
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.put('/project', (req, res) => {
  let request_data = req.body;
  prisma.project.update({
    where: {
      id: request_data.id
    },
    data: request_data
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})

app.delete('/project', (req, res) => {
  let request_data = req.body;
  prisma.project.delete({
    where: {
      id: request_data.id
    }
  })
  .then((data) => {
    res.status(200).json(data);    
  })
  .catch((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(new Error(err).message)
    }
  })
})



app.listen(port, () => {
  console.log("running")
})