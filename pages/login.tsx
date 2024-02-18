import { oauth } from "@/config";
import useDevice from "@/hooks/device";
import React from "react";

const LoginPage: React.FC = () => {
	const { platform } = useDevice();
	console.log(oauth);
	return platform === "client" ? (
		<main>
			<h1>Login</h1>
			<div
				id="g_id_onload"
				data-client_id="324432272944-9ste1tp3ampi1m1t4coudk3b95981l9r.apps.googleusercontent.com"
				data-context="signin"
				data-ux_mode="popup"
				data-login_uri="/google-callback/oauth/login"
				data-nonce=""
				data-auto_select="true"
				data-itp_support="true"
			></div>

			<div
				className="g_id_signin"
				data-type="standard"
				data-shape="rectangular"
				data-theme="outline"
				data-text="signin_with"
				data-size="large"
				data-logo_alignment="center"
			></div>
			<button
				onClick={() => {
					const randomNumber = Math.random()
						.toString(36)
						.substring(7);
					const milliseconds = new Date().getTime();
					const stateKey = `${randomNumber}-${milliseconds}`;
					localStorage.setItem("oauth-state", stateKey);
					const query = {
						client_id: oauth.google.clientId,
						redirect_uri: oauth.google.redirectUri,
						response_type: "code",
						scope: oauth.google.scopes.join(" "),
						state: stateKey,
					};
					const url = new URL(oauth.google.endpoint);
					url.search = new URLSearchParams(query).toString();
					window.location.href = url.toString();
				}}
			>
				Sign in with Google
			</button>
		</main>
	) : (
		<></>
	);
};

export default LoginPage;
