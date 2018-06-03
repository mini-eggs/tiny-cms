import { join } from "path";
import * as Compose from "koa-compose";
import * as Static from "koa-static";
import * as Body from "koa-bodyparser";
import * as Compress from "koa-compress";
import Router from "./router";
import JWT from "./plugins/jwt";

const plugins = [
  Compress(),
  JWT(),
  Body(),
  Router.routes(),
  Router.allowedMethods(),
  Static(join(__dirname, "../dist"))
];

export default () => Compose(plugins);
