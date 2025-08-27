import { DataTypes } from "sequelize";

import sequelize from "../utils/db.js";

export const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});
