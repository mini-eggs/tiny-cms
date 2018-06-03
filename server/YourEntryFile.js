import Koa from "koa";
import TinyCms from "./main.ts";

const server = new Koa();

server.use(TinyCms());

server.listen(process.env.PORT || 8080, () => {
  console.log("\nServer has been started.\n");
});
