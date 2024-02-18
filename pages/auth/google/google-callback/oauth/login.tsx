import http from "@/utils/http";
import React from "react";

const GoogleAuthPage: React.FC = (props: any) => {
	console.log(props);
	return <>{`${props.user.email} ${props.user.name}`}</>;
};

export default GoogleAuthPage;

export const getServerSideProps = async (context: any) => {
	const { query } = context;
	console.log(query);
	try {
		const res = await http.post("/auth/google", query);
		console.log("server side", res.data);
		return {
			props: {
				user: res.data.user,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			redirect: {
				destination: "/500",
				permanent: false,
			},
		};
	}
};
