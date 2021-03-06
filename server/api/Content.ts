import * as Router from "koa-router";
import { Op } from "sequelize";
import * as DB from "../database";

const router = new Router();

const valueKeys: { [key: string]: string } = {
  "Text Short": "text_short",
  "Text Large": "text_large",
  Date: "date",
  "Content(s)": "connected"
};

/**
 * GET
 */
router.get("/api/content", async ctx => {
  try {
    const data = await DB.Content.findAll({
      limit: parseInt(ctx.request.query.limit || 10, 10),
      offset: parseInt(ctx.request.query.offset || 0, 10),
      include: [
        {
          model: DB.Values,
          as: "values",
          include: [
            {
              model: DB.Connection,
              as: "connection",
              include: [
                {
                  model: DB.Content,
                  as: "content",
                  include: [
                    { model: DB.Values, as: "values" },
                    { model: DB.Models, as: "model", include: [{ model: DB.Fields, as: "fields" }] }
                  ]
                }
              ]
            }
          ]
        },
        { model: DB.Models, as: "model", include: [{ model: DB.Fields, as: "fields" }] }
      ],
      order: [[DB.Values, "id", "ASC"]]
    });

    ctx.body = JSON.stringify(data);
  } catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
});

/**
 * Find
 */
router.get("/api/content/search", async ctx => {
  try {
    const term = ctx.request.query.term;

    if (!term) {
      throw new Error("No search term present.");
    }

    const like = `%${ctx.request.query.term}%`;

    const data = await DB.Content.findAll({
      limit: 25,
      offset: 0,
      include: [
        { model: DB.Values, as: "values", where: { text_short: { [Op.like]: like } } },
        { model: DB.Models, as: "model", include: [{ model: DB.Fields, as: "fields" }] }
      ]
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
    const { model_id, values } = ctx.request.body;

    // create values
    // const nextValues = await Promise.all(values.map((set: { type: string, value: string }) => {
    //   return DB.Values.create({ [valueKeys[set.type]]: set.value })
    // }))

    // this is slower, but puts in order
    // tbh not the place to solve this issue
    // TODO
    let nextValues = [];

    for (let set of values) {
      if (Array.isArray(set.value)) {
        for (let val of set.value) {
          const [value, connection, content] = await Promise.all([
            DB.Values.create({}),
            DB.Connection.create(),
            DB.Content.findOne({ where: { id: val } })
          ]);

          await Promise.all([
            (value as any).addConnection(connection) /* next line pls */,
            (content as any).addConnection(connection)
          ]);

          nextValues.push(value);
        }
      } else {
        nextValues.push(await DB.Values.create({ [valueKeys[set.type]]: set.value }));
      }
    }

    // create content and connect values
    const nextContent = await DB.Content.create();
    await Promise.all(nextValues.map(i => (nextContent as any).addValue(i)));

    // content content to model
    const model = await DB.Models.findOne({ where: { id: model_id } });
    await (model as any).addContent(nextContent);

    ctx.body = JSON.stringify({ msg: "Complete" });
  } catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
});

/**
 * DELETE
 */
router.delete("/api/content", async ctx => {
  try {
    const { id } = ctx.request.body;

    await Promise.all([DB.Values.destroy({ where: { content_id: id } }), DB.Content.destroy({ where: { id } })]);

    ctx.body = JSON.stringify({ msg: "Complete" });
  } catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
});

/**
 * Update
 */
router.patch("/api/content", async ctx => {
  try {
    const { content_id, model_id, values } = ctx.request.body;

    // drop values
    await DB.Values.destroy({ where: { content_id } });

    // create new values
    const nextValues = await Promise.all(
      values.map((set: { type: string; value: string }) => {
        return DB.Values.create({ [valueKeys[set.type]]: set.value });
      })
    );

    // connect values
    const nextContent = await DB.Content.findOne({ where: { id: content_id } });
    await Promise.all(nextValues.map(i => (nextContent as any).addValue(i)));

    ctx.body = JSON.stringify({ msg: "Complete" });
  } catch (e) {
    ctx.status = 500;
    ctx.body = JSON.stringify({ msg: e.toString() });
  }
});

export default router;
