import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

/* model */
// import { Course } from "./models/course.model.js";
// import { Profile } from "./models/profile.model.js";
// import { User } from "./models/user.model.js";

/* routes */
import usersRoutes from "./routes/users.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import profilesRoutes from "./routes/profile.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import lectureRoutes from "./routes/lecture.routes.js";

/* middlewares */
import isAuthenticated from "./middlewares/is-authenticated.js";
import isAdmin from "./middlewares/is-admin.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/", async (req, res, next) => {
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
== 3. we must sort (from most specific to the general) [all methods]
*/

/* app routes */
app.use("/api/users/", isAuthenticated, usersRoutes);
app.use("/api/courses/", coursesRoutes);
app.use("/api/profiles/", isAuthenticated, profilesRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/admin/", isAuthenticated, isAdmin, adminRoutes);
app.use(
  "/api/admin/courses/",
  isAuthenticated,
  isAdmin,
  lectureRoutes
);

app.use(errorMiddleware);

/* Relationships */
// User.hasOne(Profile);
// Profile.belongsTo(User);

// User.belongsToMany(Course, { through: "CourseEnrollment" });
// Course.belongsToMany(User, { through: "CourseEnrollment" });

const PORT = 4000;

mongoose
  .connect(
    "mongodb+srv://sanad:sanad1234@node-ca.vosqn34.mongodb.net/course_management_system?retryWrites=true&w=majority&appName=node-ca"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
