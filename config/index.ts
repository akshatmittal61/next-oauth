export const dbUri: string =
	process.env.NEXT_PUBLIC_APP_DB_URI ?? "mongodb://localhost:27017/nextjs";
export const jwtSecret: string =
	process.env.NEXT_PUBLIC_APP_JWT_SECRET ?? "secret";

export const oauth = {
	google: {
		clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string,
		clientSecret: process.env
			.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET as string,
		endpoint: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENDPOINT as string,
		redirectUri: process.env
			.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI as string,
		scopes: ["email", "profile"].map(
			(scope) => `https://www.googleapis.com/auth/userinfo.${scope}`
		),
	},
};
