import { Request, Response } from "express";
import User from "../models/User";

interface UserData {
  id: number,
  name: string;
  email: string;
}

const UserController = {
  index: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await User.findAll();
      res.status(200).json({ status: true, data: response });
    } catch (error) {
      res.status(500).json({ status: false, message: "Server Error" });
    }
  },

  show: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await User.findByPk(req.params.id);
      if (!response) throw new Error();
      res.status(200).json({ status: true, data: response });
    } catch (error) {
      res
        .status(404)
        .json({ status: false, message: "Document not found!" });
    }
  },
  
  store : async (userData: UserData): Promise<{status: boolean, message: string, data: any}> => {
    let result = await User.create(userData);
  
    return({
      status: true,
      message: "Success",
      data: result,
    });
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await User.update(
        {
          name: req.body.name,
          email: req.body.email,
        },
        { where: { id: req.params.id } }
      );
      if (result[0] === 0) throw new Error();
      res.status(200).json({ status: true, message: "Success" });
    } catch (error) {
      res
        .status(404)
        .json({ status: false, message: "Failed, Document not found" });
    }
  },

  destroy: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await User.destroy({ where: { id: req.params.id } });
      const isDeleted = result === 1;
      res.status(isDeleted ? 204 : 404).json({
        status: isDeleted,
        message: isDeleted ? "Success" : "Not found",
      });
    } catch (error) {
      res
        .status(404)
        .json({ status: false, message: "Failed, Document not found" });
    }
  },
};

export default UserController;