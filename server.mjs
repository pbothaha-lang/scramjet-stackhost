import express from 'express';
import { createServer } from 'node:http';
import { server as wisp } from '@mercuryworkshop/wisp-js/server';

const app=express();
const server=createServer(app);
const PORT=Number(process.env.PORT)||9001;

app.use('/sj-assets/',express.static('node_modules/@mercuryworkshop/scramjet/dist'));app.use('/sj-assets/',express.static('node_modules/@mercuryworkshop/scramjet/dist'));app.use('/scramjet/',express.static('node_modules/@mercuryworkshop/scramjet/dist'));app.use('/baremux/',express.static('node_modules/@mercuryworkshop/bare-mux/dist'));app.use('/libcurl/',express.static('node_modules/@mercuryworkshop/libcurl-transport/dist'));app.use(express.static('public'));

server.on('upgrade',(req,socket,head)=>{
  if(req.url && req.url.startsWith('/wisp/')){
    wisp.routeRequest(req,socket,head);
    return;
  }
  socket.destroy();
});

server.listen(PORT,'0.0.0.0',()=>{
  console.log('Breeze running on http://localhost:'+PORT);
  console.log('Wisp endpoint: ws://localhost:'+PORT+'/wisp/');
});
