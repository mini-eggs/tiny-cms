import * as Router from "koa-router";

const router = new Router();
const { ADMIN_USER, ADMIN_PASS } = process.env;

router.post("/api/login", async ctx => {
  try {
    const { username, password } = ctx.request.body;

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      throw new Error("Login credentials are incorrect.");
    }

    ctx.cookies.set("error", undefined, {
      path: "/",
      overwrite: true,
      httpOnly: false
    });

    const jwt = await ctx.jwt.encode({ username, password });

    ctx.cookies.set("secure-user", jwt, {
      path: "/",
      overwrite: true,
      httpOnly: false
    });

    ctx.redirect("/#/dashboard");
  } catch (e) {
    ctx.cookies.set("error", e.toString(), {
      path: "/",
      overwrite: true,
      httpOnly: false
    });
    ctx.redirect("/#/error");
  }
});

export default router;
