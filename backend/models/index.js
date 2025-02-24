const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
);

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
});
const Owner = sequelize.define("Owner", {
  name: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  email: DataTypes.STRING,
});

const Property = sequelize.define("Property", {
  photos: DataTypes.ARRAY(DataTypes.INTEGER),
  address: DataTypes.STRING,
  type: DataTypes.STRING,
  price: DataTypes.INTEGER,
  area: DataTypes.INTEGER,
  bedrooms: DataTypes.INTEGER,
  bathrooms: DataTypes.INTEGER,
  is_finished: DataTypes.BOOLEAN,
  status: DataTypes.STRING,
  owner_id: DataTypes.INTEGER,
});

const File = sequelize.define("File", {
  data: DataTypes.BLOB,
  mime: DataTypes.STRING,
});

const Markup = sequelize.define("Markup", {
  date: DataTypes.DATE,
  property_id: DataTypes.INTEGER,
  staff_id: DataTypes.INTEGER,
  value: DataTypes.INTEGER,
});

const Contract = sequelize.define("Contract", {
  property_id: DataTypes.INTEGER,
  staff_id: DataTypes.INTEGER,
  file: DataTypes.BLOB,
});

const LoginLink = sequelize.define("LoginLink", {
  user_id: DataTypes.INTEGER,
  token: DataTypes.STRING,
});

// Связи между моделями
Owner.hasMany(Property, { foreignKey: "owner_id" });
Property.belongsTo(Owner, { foreignKey: "owner_id" });

Property.hasMany(Markup, { foreignKey: "property_id" });
Markup.belongsTo(Property, { foreignKey: "property_id" });

User.hasMany(Markup, { foreignKey: "staff_id" });
Markup.belongsTo(User, { foreignKey: "staff_id" });

User.hasMany(Contract, { foreignKey: "staff_id" });
Contract.belongsTo(User, { foreignKey: "staff_id" });

Property.hasMany(Contract, { foreignKey: "property_id" });
Contract.belongsTo(Property, { foreignKey: "property_id" });

module.exports = {
  sequelize,
  User,
  Owner,
  Property,
  Markup,
  Contract,
  File,
  LoginLink,
};
