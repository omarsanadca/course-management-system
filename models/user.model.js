import { DataTypes } from "sequelize";

import sequelize from "../utils/db.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue("name", val.toUpperCase());
    },
    get() {
      const rawData = this.getDataValue("name");
      if (!rawData) return null;
      return "Mr." + rawData;
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "student",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullData: {
    type: DataTypes.VIRTUAL,
    get() {
      const name = this.getDataValue("name");
      const email = this.getDataValue("email");

      return "Full Data -> " + name + " | " + email;
    },
    set() {
      throw new Error("Don't set the data `fullData`");
    },
  },
});
