import * as Router from "koa-router";
import * as DB from "../database";

const router = new Router();

const valueKeys: { [key: string]: string } = {
  "Text Short": "text_short",
  "Text Large": "text_large",
  "Date": "date"
}

/**
 * GET
 */
router.get("/api/content", async ctx => {
  try {
    const data = await DB.Content.findAll({
      limit: parseInt(ctx.request.query.limit || 10, 10),
      offset: parseInt(ctx.request.query.offset || 0, 10),
      include: [{ model: DB.Values, as: "values" }]
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
router.post("/api/content", async ctx => {
  try {
    const { model_id, values } = ctx.request.body

    // create values
    const nextValues = await Promise.all(values.map((set: { type: string, value: string }) => {
      return DB.Values.create({ [valueKeys[set.type]]: set.value })
    }))

    // create content and connect values
    const nextContent = await DB.Content.create()
    await Promise.all(nextValues.map(i => (nextContent as any).addValue(i)))

    // content content to model
    const model = await DB.Models.findOne({ where: { id: model_id } })
    await (model as any).addContent(nextContent)

    ctx.body = JSON.stringify({ msg: "Complete" });
  }
  catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
})

/**
 * DELETE
 */

// router.delete("/api/content", async ctx => {
//   const opts = { ...ctx.request.body };
//   ctx.body = JSON.stringify({ ...opts });
// });

// /**
//  * UPDATE
//  */

// router.patch("/api/content", async ctx => {
//   const opts = { ...ctx.request.body };
//   ctx.body = JSON.stringify({ ...opts });
// });

export default router;
