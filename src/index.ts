import { PrismaClient } from "@prisma/client";
import express from 'express';

const app = express();
const port = 3100;
const prisma = new PrismaClient();





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