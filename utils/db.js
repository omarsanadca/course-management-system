import Sequelize from "sequelize";

const sequelize = new Sequelize('course_management', 'sanad', 'password', {
  host: 'localhost',
  dialect: "mysql"
});

export default sequelize;