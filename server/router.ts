import * as Router from "koa-router";
import { join } from "path";
import { readdirSync } from "fs";

const router = new Router();
const dir = join(__dirname, "./api");
const stats = readdirSync(dir);

for (let filename of stats) {
  const mod = require(`./api/${filename}`);

  if (!mod) {
    continue;
  }

  const api = mod.default;

  if (!api.routes || !api.allowedMethods) {
    continue;
  }

  router.use(api.routes());
  router.use(api.allowedMethods());
}

export default router;
