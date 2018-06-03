import { Context } from "koa";
import * as JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  process.exit(1);
}

export default () => async (ctx: Context, next: Function) => {
  ctx.jwt = {
    encode: async (js: any) => {
      return new Promise((resolve, reject) => {
        JWT.sign(js, JWT_SECRET, (err: Error, token: string) => {
          if (err) {
            return reject(err);
          }
          resolve(token);
        });
      });
    },
    decode: async (token: string) => {
      return new Promise((resolve, reject) => {
        JWT.verify(token, JWT_SECRET, function(err: Error, js: any) {
          if (err) {
            return reject(err);
          }
          resolve(js);
        });
      });
    }
  };

  return await next();
};
