const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail.js");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../models/UserModels");
const sendToken = require("../utils/jwtToken");
const { use } = require("express/lib/router");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register a User

exports.registerUser = catchAsyncError(async (req, res, next) => {
	const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: "avatars",
		width: 150,
		crop: "scale",
	});

	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		},
	});

	sendToken(user, 201, res);
});

//Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler("Please Enter Email and Password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}

	const isMatch = await user.comparePassword(password);

	if (!isMatch) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}

	sendToken(user, 200, res);
});

//Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ success: true, message: "logged out successfully" });
});

//Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	//Get resetPasswordToken
	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/password/reset/${resetToken}`;

	const message = `You password reset token is :-\n\n ${resetPasswordUrl}\n\n . If you have not requeste this email then please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `Canteen Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email successfully sent to ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
});

//Reset Password
exports.ResetPassword = catchAsyncError(async (req, res, next) => {
	//creating token hash
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				"Reset Password token is invalid or has been expired",
				400
			)
		);
	}
	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not match", 400));
	}
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

//Get User Details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

//Update User password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	const isMatch = await user.comparePassword(req.body.oldPassword);

	if (!isMatch) {
		return next(new ErrorHandler("Old password is incorrect", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not match", 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

//Update User Profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	//Cloudinary
	// if (req.body.avatar !== "") {
	// 	const user = await User.findById(req.user.id);

	// 	const imageId = user.avatar.public_id;

	// 	await cloudinary.v2.uploader.destroy(imageId);

	// 	const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
	// 		folder: "avatars",
	// 		width: 150,
	// 		crop: "scale",
	// 	});

	// 	newUserData.avatar = {
	// 		public_id: myCloud.public_id,
	// 		url: myCloud.secure_url,
	// 	};
	// }

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: true,
	});

	res.status(200).json({ success: true });
});

//Get all users (admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

//Get single user(admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with id : ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

//Update User Role

exports.updateRole = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: true,
	});

	res.status(200).json({ success: true });
});

//Delete User(admin)

exports.DeleteUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with id : ${req.params.id}`)
		);
	}
	const imageId = user.avatar.public_id;

	await cloudinary.v2.uploader.destroy(imageId);
	await user.remove();
	res.status(200).json({ success: true, message: "User deleted successfully" });
});
