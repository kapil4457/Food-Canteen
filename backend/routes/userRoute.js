const express = require("express");
const {
	registerUser,
	loginUser,
	logout,
	forgotPassword,
	ResetPassword,
	getUserDetails,
	updatePassword,
	updateProfile,
	getAllUser,
	getSingleUser,
	updateRole,
	DeleteUser,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(ResetPassword);

router.route("/logout").post(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
	.route("/admin/users")
	.get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);

router
	.route("/admin/user/:id")
	.get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
	.put(isAuthenticatedUser, authorizeRole("admin"), updateRole)
	.delete(isAuthenticatedUser, authorizeRole("admin"), DeleteUser);

module.exports = router;
