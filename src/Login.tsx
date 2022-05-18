import React, { useState, useEffect } from "react";
import { auth } from "./firebase";

const Login: React.FC = (props: any) => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unSub = auth.onAuthStateChanged((user) => {
			user && props.history.push("/");
		});
		return () => unSub();
	}, [props.history]);

	return (
		<div className="text-center h-screen w-1/3 mx-auto flex flex-col justify-center items-center">
			<h1 className="text-5xl">{isLogin ? "Login" : "Regster"}</h1>
			<br />
			<form className="w-2/3 flex justify-between items-center mb-2">
				<label className="m-0 p-0">email</label>
				<input
					className="border-2 border-red-300 py-1 px-2"
					name="email"
					value={email}
					onChange={(e: any) => {
						setEmail(e.target.value);
					}}
				/>
			</form>
			<form className="w-2/3 flex justify-between items-center">
				<label>password</label>
				<input
					className="border-2 border-red-300 py-1 px-2"
					name="password"
					value={password}
					onChange={(e: any) => {
						setPassword(e.target.value);
					}}
				/>
			</form>
			<br />
			<button
				className="bg-red-300 py-2 px-3 ml-1 text-white cursor-pointer"
				onClick={
					isLogin
						? async () => {
								try {
									await auth.signInWithEmailAndPassword(email, password);
									props.history.push("/");
								} catch (error: any) {
									alert(error.message);
								}
						  }
						: async () => {
								try {
									await auth.createUserWithEmailAndPassword(email, password);
									props.history.push("/");
								} catch (error: any) {
									alert(error.message);
								}
						  }
				}>
				{isLogin ? "Login" : "Regster"}
			</button>
			<br />
			<p className="cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
				{isLogin ? "Create new account ?" : "Back to login"}
			</p>
		</div>
	);
};

export default Login;
