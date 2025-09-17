// import { DataTypes } from "sequelize";

// import sequelize from "../utils/db.js";

// export const Course = sequelize.define("Course", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   discount: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },
//   newPrice: {
//     type: DataTypes.VIRTUAL,
//     get() {
//       const originalPrice = this.getDataValue("price");
//       const discount = this.getDataValue("discount");

//       let newPrice = originalPrice;
//       newPrice -= (originalPrice * discount) / 100;

//       return newPrice;
//     },
//     set() {
//       throw new Error("Don't set the newPrice yourself");
//     },
//   },
// });

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: "initializedAt",
      updatedAt: false,
    },
  }
);

courseSchema.virtual("lectures", {
  ref: "Lecture",
  localField: "_id",
  foreignField: "course",
});

export default mongoose.model("Course", courseSchema);
