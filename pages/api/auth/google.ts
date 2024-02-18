import { RESPONSE_MESSAGES } from "@/constants/enum";
import { signInWithGoogle } from "@/controllers/google_oauth";
import connectDB from "@/db";
import { ApiRequest, ApiResponse } from "@/types/api";

const handler = async (req: ApiRequest, res: ApiResponse) => {
	try {
		await connectDB();
		const { method } = req;
		switch (method) {
			case "POST":
				return signInWithGoogle(req, res);
			default:
				res.setHeader("Allow", ["POST"]);
				return res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export default handler;
