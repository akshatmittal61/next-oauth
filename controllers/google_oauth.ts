import { oauth } from "@/config";
import { ApiRequest, ApiResponse } from "@/types/api";
import axios from "axios";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
async function verify(token: string) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: oauth.google.clientId, // Specify the CLIENT_ID of the app that accesses the backend
	});
	const payload = ticket.getPayload();
	// const userid = payload["sub"];
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
	return payload;
}
// verify().catch(console.error);

export const signInWithGoogle = async (req: ApiRequest, res: ApiResponse) => {
	try {
		console.log(req.query);
		const oauthRequest = {
			url: new URL("https://oauth2.googleapis.com/token"),
			params: {
				client_id: oauth.google.clientId,
				client_secret: oauth.google.clientSecret,
				code: req.body.code,
				grant_type: "authorization_code",
				redirect_uri: oauth.google.redirectUri,
			},
		};
		const oauthResponse = await axios.post(
			oauthRequest.url.toString(),
			null,
			{
				params: oauthRequest.params,
			}
		);
		const oauthResponseData = oauthResponse.data;
		const user = await verify(oauthResponseData.id_token);
		return res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
