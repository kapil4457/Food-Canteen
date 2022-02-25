const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//Create Product  -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
	let images = [];
	if (typeof req.body.images === "string") {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	const imagesLink = [];

	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
			folder: "products",
		});
		imagesLink.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLink;
	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

//Get all product

exports.getAllProduct = catchAsyncError(async (req, res, next) => {
	const resultPerPage = 8;
	const ProductCount = await Product.countDocuments();
	const apiFeature = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);
	let products = await apiFeature.query;
	res.status(200).json({ success: true, products, ProductCount });
});

//Get all Products (Admin)
exports.getAdminProduct = catchAsyncError(async (req, res, next) => {
	const products = await Product.find();
	res.status(200).json({ success: true, products });
});

// Get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	} else {
		res.status(200).json({ success: true, product });
	}
});
//Update Porducts  --Admin

exports.updateProduct = catchAsyncError(async (req, res) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	//Images
	let images = [];
	if (typeof req.body.images === "string") {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	if (images !== undefined) {
		// Deleting images from cloudinary

		for (let i = 0; i < product.images.length; i++) {
			await cloudinary.v2.uploader.destroy(product.images[i].public_id);
		}
	}

	//Adding new images
	const imagesLink = [];

	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
			folder: "products",
		});
		imagesLink.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}
	req.body.images = imagesLink;

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res
		.status(200)
		.json({ success: true, message: "Product updated successfully" });
});

// Delete a Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	} else {
		// Deleting images from cloudinary
		for (let i = 0; i < product.images.length; i++) {
			await cloudinary.v2.uploader.destroy(product.images[i].public_id);
		}
		await product.remove();
		res
			.status(200)
			.json({ status: true, message: "Product deleted successfully" });
	}
});

// Create new review and update it
exports.createProductReview = catchAsyncError(async (req, res, next) => {
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};
	console.log(review);
	const product = await Product.findById(productId);
	console.log(product);
	const isReviewed = product.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		product.reviews.forEach((rev) => {
			if (rev.user.toString() === req.user._id.toString()) {
				rev.rating = rating;
				rev.comment = comment;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}
	let avg = 0;
	product.reviews.forEach((rev) => {
		avg += rev.rating;
	});

	product.ratings = avg / product.reviews.length;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({ success: true });
});

//Get all reviews of a product

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	if (!product) {
		return next(new Error("Product not found", 404));
	}

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

//Delete reviews

exports.deleteReview = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);

	if (!product) {
		return next(new Error("Product not found", 404));
	}

	const reviews = product.reviews.filter(
		(rev) => rev._id.toString() !== req.query.id.toString()
	);

	let avg = 0;
	reviews.forEach((rev) => {
		avg += rev.rating;
	});

	const ratings = avg / reviews.length;
	const numOfReviews = reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{ reviews, ratings, numOfReviews },
		{
			new: true,
			runValidators: true,
			useFindAndModify: true,
		}
	);

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});
