import express from "express";
import morgan from "morgan";

import sequelize from "./utils/db.js";

/* model */
import { Course } from "./models/course.model.js";
import { Profile } from "./models/profile.model.js";
import { User } from "./models/user.model.js";

/* routes */
import usersRoutes from "./routes/users.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import profilesRoutes from "./routes/profile.routes.js";
import authRoutes from "./routes/auth.routes.js";

/* middlewares */
import isAuthenticated from "./middlewares/is-authenticated.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "SERVER OK!", headers: req.headers });
});

/*

app.use("/a/data", (req, res) => {
  res.send("/a/data");
});

app.use("/a", (req, res) => {
  res.send("/a");
});

== 1. req run from line 1 to ...
== 2. use() // match the prefix
== 3. we must sort (from most specific to the general)
*/

/* app routes */
app.use("/api/users/", isAuthenticated, usersRoutes);
app.use("/api/courses/", coursesRoutes);
app.use("/api/profiles/", isAuthenticated, profilesRoutes);
app.use("/api/auth/", authRoutes);

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
