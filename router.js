import { Router } from "express";
import { check } from "express-validator";

import rateController from "./rateController.js";
import authController from "./authController.js";
import hotelController from "./hotelController.js";

import authMiddleware from "./Middleware/authMiddleware.js";

const router = new Router();

router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);
router.delete("/deleteUser", authMiddleware, authController.deleteUser);

router.post("/getHotels", hotelController.getHotels);
router.post("/getHotel", hotelController.getHotel);

router.post("/getRates", authMiddleware, rateController.getRates);
router.post("/createRate", authMiddleware, rateController.create);
router.post("/deleteRate", authMiddleware, rateController.delete);

// router.post("/deleteLabels", authMiddleware, rateController.delete);
// router.post("/getLabels", authMiddleware, rateController.getLabels);
// router.post(
//     "/changeLabels",
//     authMiddleware,
//     [
//         check(
//             "barcode",
//             "Имя пользователя должен быть больше 3 и меньше 15 символов"
//         ).isLength({ min: 3, max: 15 }),
//     ],
//     rateController.changeLabels
// );

export default router;
