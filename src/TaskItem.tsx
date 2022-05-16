import React, { useState } from "react";
import firebase from "firebase/app";
import { db } from "./firebase";

interface PROPS {
	id: string;
	title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
	const [title, setTitle] = useState(props.title);

	const editTask = () => {
		db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
	};

	const deleteTask = () => {
		db.collection("tasks").doc(props.id).delete();
	};

	return (
		<div className="flex justify-between items-end text-2xl">
			<h2>{props.title}</h2>
			<div>
				<form className="flex flex-col">
					<label className="text-left text-red-200 text-xl">edit task</label>
					<div>
						<input
							className="border-b-2 border-red-300 py-1"
							value={title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setTitle(e.target.value)
							}
						/>
						<button
							className="ml-2 bg-red-300 text-white py-2 px-3 text-base"
							onClick={editTask}>
							編集
						</button>
						<button
							className="ml-2 bg-red-300 text-white py-2 px-3 text-base"
							onClick={deleteTask}>
							完了
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TaskItem;
