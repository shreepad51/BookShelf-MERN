import express from "express"; // express router
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
//query string for particular id from front
router.get("/:id/friends", verifyToken, getUserFriends);

// Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
