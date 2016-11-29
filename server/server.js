import http from 'http';
import koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import logger from 'koa-logger';
import parser from 'koa-bodyparser';

import api from './routes/api.js';

const app = koa();

app.use(cors());
app.use(parser());
app.use(logger());
app.use(api(Router));

const server = http.createServer(app.callback());

export default server;