import { Router } from "express";
import { userController } from "./user.controller.js";
import { userDao } from "./user.dao.js";


const router = Router();

router.get("/", userController.getAll);
router.get("/mocks/:amount", userController.createUsersMocks);
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await userDao.remove(id);
    res.status(200).json("ususuario eliminado");
});

export default router;