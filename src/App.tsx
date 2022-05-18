import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import TaskItem from "./TaskItem";
import { auth } from "./firebase";

const App: React.FC = (props: any) => {
	const [tasks, setTasks] = useState([{ id: "", title: "" }]);
	const [input, setInput] = useState("");

	useEffect(() => {
		const unSub = auth.onAuthStateChanged((user) => {
			!user && props.history.push("login");
		});
		return () => unSub();
	});

	useEffect(() => {
		const unSub = db.collection("tasks").onSnapshot((snapshot) => {
			setTasks(
				snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
			);
		});
		return () => unSub();
	}, []);

	const newTask = (e: any) => {
		db.collection("tasks").add({ title: input });
		setInput("");
	};

	return (
		<div className="text-center">
			<h1 className="text-5xl my-5">TodoList</h1>
			<button
				className="bg-red-300 py-2 px-3 ml-1 text-white cursor-pointer mb-5"
				onClick={async () => {
					try {
						await auth.signOut();
						props.history.push("login");
					} catch (error: any) {
						alert(error.message);
					}
				}}>
				Logout
			</button>
			<form>
				<input
					className="border-2 border-red-300 py-1 px-2 mb-5"
					value={input}
					placeholder="input new todo"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setInput(e.target.value)
					}
				/>
				<button
					className="bg-red-300 py-2 px-3 ml-1 text-white cursor-pointer"
					disabled={!input}
					onClick={newTask}>
					追加
				</button>
			</form>
			<div className="w-1/2 mx-auto">
				<ul>
					{tasks.map((task) => (
						<TaskItem key={task.id} id={task.id} title={task.title} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
