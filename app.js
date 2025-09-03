import express from "express";
import morgan from "morgan";

import sequelize from "./utils/db.js";

import { Course } from "./models/course.model.js";
import { Profile } from "./models/profile.model.js";
import { User } from "./models/user.model.js";

import usersRoutes from "./routes/users.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import profilesRoutes from "./routes/profile.routes.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

app.get("/", async (req, res) => {
  res.json({ message: "SERVER OK!", headers: req.headers });
});

/* app routes */
app.use("/api/users/", usersRoutes);
app.use("/api/courses/", coursesRoutes);
app.use("/api/profiles/", profilesRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Server Error!!";
  let note = undefined;
  if (statusCode === 500) {
    note = "Our server is not working ok these days, we will fix it in 7 days";
  }
  res
    .status(statusCode)
    .json({ message: errorMessage, errors: err.errors || [], note });
});

/* Relationships */
User.hasOne(Profile);
Profile.belongsTo(User);

User.belongsToMany(Course, { through: "CourseEnrollment" });
Course.belongsToMany(User, { through: "CourseEnrollment" });

const PORT = 4000;

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
