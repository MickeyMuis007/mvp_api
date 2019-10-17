import colors from "color";
import objectPath from "object-path";
import { Sequelize } from "sequelize";

import config from "../../../config";

const mySqlDetails = objectPath.get(config, "database.my_sql");
console.log(`My SQL Details: ${JSON.stringify(mySqlDetails)}`.bgCyan);
const sequelize = new Sequelize(mySqlDetails.name, mySqlDetails.username, mySqlDetails.password, {
  dialect: "mysql",
  host: "localhost"
});

export default sequelize;
