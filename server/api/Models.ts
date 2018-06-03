import * as Router from "koa-router";
import * as Sequelize from "sequelize";
import * as DB from "../database";
import { promises } from "fs";

const router = new Router();

// TODO validate

/**
 * GET
 */
router.get("/api/models", async ctx => {
  try {
    const data = await DB.Models.findAll({
      limit: parseInt(ctx.request.query.limit || 10, 10),
      offset: parseInt(ctx.request.query.offset || 0, 10),
      include: [{ model: DB.Fields, as: "fields" }]
    });

    ctx.body = JSON.stringify(data);
  } catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
});

/**
 * CREATE
 */

router.post("/api/models", async ctx => {
  try {
    const title = ctx.request.body.title;
    const inputs = ctx.request.body.inputs;
    const pfield = inputs.map((data: { title: string; type: string }) => DB.Fields.create(data));
    const model = await DB.Models.create({ title });
    const fields = await Promise.all(pfield);
    const passoc = fields.map(field => (model as any).addField(field));
    ctx.body = JSON.stringify({ msg: "Complete" });
  } catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
});

/**
 * UPDATE
 */
router.patch("/api/models", async ctx => {
  ctx.body = "TODO1";
});

/**
 * DELETE
 */
router.delete("/api/models", async ctx => {
  try {
    await DB.Models.destroy({ where: { id: ctx.request.body.id } });
    ctx.body = JSON.stringify({ msg: "Complete" });
  } catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
});

export default router;
