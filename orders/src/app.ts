import express, { Request, Response, NextFunction } from "express";
import HttpError from "./models/HttpError";
import axios from "axios";
import userRoutes from "./routes/user-routes";
import User from './models/User';
import SequelizeManager from "./utils/sequelize-manager";

const manager = new SequelizeManager();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);

app.use("/", (req: Request, res: Response) => {
  throw new HttpError(404, "Not Found");
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.code).json({ status: false, message: error.message });
});

manager.authenticate();

manager.syncModels(async (message: string, status: boolean) => {
  if (status) {
    app.listen(5000);
    
    // const response = await axios.get('http://localhost:5001/api/users')
    // const users = response.data.data.map(user => ({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email
    // }));
    // console.log("Users from Users Server: ", users);
    
    
    // const existingUserIDs = (await User.findAll({
    //    attributes: ['id']
    // })).map(user => user.id);

    // const newUsers = users.filter(user => {
    //    return !existingUserIDs.includes(user.id);
    // });

    // User.bulkCreate(newUsers)
  }
});

require("./receiver");