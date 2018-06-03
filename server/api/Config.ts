import * as Router from "koa-router";

const router = new Router();
const { ADMIN_USER, ADMIN_PASS } = process.env;

router.post("/api/config", async ctx => {
  try {
    const jwt = ctx.cookies.get("secure-user");
    const { username, password } = await ctx.jwt.decode(jwt);

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      throw new Error("Login credentials are incorrect.");
    }

    ctx.cookies.set("error", undefined, {
      path: "/",
      overwrite: true,
      httpOnly: false
    });

    ctx.body = JSON.stringify({
      success: true,
      config: await ctx.config()
    });
  } catch (e) {
    ctx.cookies.set("error", e.toString(), {
      path: "/",
      overwrite: true,
      httpOnly: false
    });

    ctx.body = JSON.stringify({
      success: false
    });
  }
});

export default router;
