import mongoose from "mongoose";
import { dbUri } from "@/config";

const connection = {
	isConnected: false,
};

const connectDB = async () => {
	if (connection.isConnected) {
		return;
	}

	const db = await mongoose
		.connect(dbUri)
		.then((db) => {
			console.log("Connected to MongoDB");
			return db;
		})
		.catch((err) => {
			console.error("Error connecting to MongoDB", err);
			return err;
		});

	connection.isConnected = db.connections[0].readyState === 1;
};

export default connectDB;
