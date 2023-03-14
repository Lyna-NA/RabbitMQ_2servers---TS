import sequelize from "./database";

export default class SequelizeManager {
  authenticate(): void {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connected Successfully");
      })
      .catch((error) => {
        console.log("Connection Failed");
      });
  }

  syncModels(callback: (result: string, success: boolean) => void): void {
    sequelize
      .sync({ force: true })
      .then(() => {
        callback("Tables Created!", true);
      })
      .catch(() => {
        callback("Failed!", false);
      });
  }
}