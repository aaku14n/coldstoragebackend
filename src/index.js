// Defines an express app that runs the boilerplate codebase.

import "babel-polyfill";
import express from "express";
import forceSsl from "express-force-ssl";

import http from "http";
import fs from "fs";
import { getEnv } from "./lib/env";
import createRouter from "./router";

const app = express();
const isProduction = getEnv("NODE_ENV") === "production";

app.use(createRouter());

http
  .createServer(app)
  .listen(5000, () => console.log(`Listening on port ${5000}`));
