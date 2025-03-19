import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
} from "../controllers/userController.js";

import { authanticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authanticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authanticate, getCurrentUserProfile)
  .put(authanticate, updateCurrentUserProfile);

// Admin routes
router
  .route("/:id")
  .delete(authanticate, authorizeAdmin, deleteUserById)
  .get(authanticate, authorizeAdmin, getUserById)
  .put(authanticate , authorizeAdmin , updateUserById)

export default router;
