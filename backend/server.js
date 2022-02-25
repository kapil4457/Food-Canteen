const app = require("./app");
const connectDatabase = require("./database");
const cloudinary = require("cloudinary");
//handling uncaught exceptions

process.on("uncaughtException", (err) => {
	console.log(err.message);
	console.log("Shutting down due to unhandled Promise Rejection ");
	process.exit(1);
});

//Config file

if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config({ path: "backend/config/config.env" });
}

// connecting to the database
connectDatabase();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error  :${err.message}`);
	console.log("Shutting down due to unhandled Promise Rejection ");
	server.close(() => {
		process.exit(1);
	});
});
