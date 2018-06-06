import * as Sequelize from "sequelize";

const DBNAME = process.env.DBNAME || "";
const DBUSER = process.env.DBUSER || "";
const DBPASS = process.env.DBPASS || "";
const DBHOST = process.env.DBHOST || "";

const opts = {};
// const opts = { force: true };

const db = new Sequelize(DBNAME, DBUSER, DBPASS, {
  host: DBHOST,
  dialect: "mysql",
  operatorsAliases: false,
  logging: false
});

export const Fields = db.define(
  "fields",
  {
    title: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false }
  },
  {
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
);

export const Models = db.define(
  "models",
  {
    title: { type: Sequelize.STRING, allowNull: false }
  },
  {
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
);

export const Content = db.define(
  "content",
  {},
  {
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
);

export const Values = db.define(
  "values",
  {
    text_short: { type: Sequelize.STRING, allowNull: true },
    text_large: { type: Sequelize.TEXT, allowNull: true },
    date: { type: Sequelize.DATE, allowNull: true }
  },
  {
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
);

export const Connection = db.define(
  "connection",
  {},
  {
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
);

Models.hasMany(Fields, { as: "fields" });
Models.hasMany(Content, { as: "content" });
Content.hasMany(Values, { as: "values" });
Values.hasMany(Connection, { as: "connection" });
Content.hasMany(Connection, { as: "connection" });

Content.belongsTo(Models, { as: "model" });
Connection.belongsTo(Content, { as: "content" });

Models.sync(opts);
Fields.sync(opts);
Content.sync(opts);
Values.sync(opts);
Connection.sync(opts);
