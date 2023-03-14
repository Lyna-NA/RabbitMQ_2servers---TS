import express from "express";
import UserController from "../controllers/user-controller";

const router = express.Router();

/**
 * @method GET
 * @controllerMethod index
 */
router.get("/", UserController.index);

/**
 * @method GET
 * @param :id
 * @controllerMethod show
 */
router.get("/:id", UserController.show);

/**
 * @method POST
 * @controllerMethod store
 */
router.post("/", UserController.store);

/**
 * @method PUT
 * @param :id
 * @controllerMethod update
 */
router.put("/:id", UserController.update);

export default router;