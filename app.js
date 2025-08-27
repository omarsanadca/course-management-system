import express from "express";

import sequelize from "./utils/db.js";

import { Course } from "./models/course.model.js";
import { Profile } from "./models/profile.model.js";
import { User } from "./models/user.model.js";

import usersRoutes from "./routes/users.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import profilesRoutes from "./routes/profile.routes.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "SERVER OK!" });
});

/* app routes */
app.use("/api/users/", usersRoutes);
app.use("/api/courses/", coursesRoutes);
app.use("/api/profiles/", profilesRoutes);

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
