import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import EditTodo from './EditTodo';

export default function App() {
	const [todoText, setTodoText] = useState('');
	const [todoList, setTodoList] = useState([]);
	const [error, setError] = useState('');
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState([]);
	const handleOpenEditModal = () => setOpenEdit(true);
	const handleCloseEditModal = () => setOpenEdit(false);
	const removeTodo = (id) => {
		const data = todoList.filter((todo) => todo.id !== id);
		setTodoList(data);
	};

	useEffect(() => {
		if (todoText.trim() != '') {
			setError('');
		}
	}, [todoText]);

	const addTodo = (e) => {
		e.preventDefault();
		if (todoText.trim() == '') {
			setError('Todo text is required...');
		} else {
			setError('');
			setTodoList([
				...todoList,
				{
					id: Math.random(),
					name: todoText.trim(),
					completed: false,
				},
			]);
			setTodoText('');
		}
	};

	return (
		<div className="example">
			<div style={{ fontSize: 40, margin: '20px 0px' }}>Todo App</div>
			<div style={{ paddingBottom: 20 }}>
				<form className="controls" onSubmit={(e) => addTodo(e)}>
					<div>
						<input
							style={{
								padding: 14,
								borderRadius: 4,
								border: 'none',
								fontSize: 18,
							}}
							type="text"
							value={todoText}
							onChange={(e) => setTodoText(e.target.value)}
						/>
					</div>
					<motion.button
						whileTap={{ scale: 0.95 }}
						whileHover={{ scale: 1.2 }}
						onClick={(e) => addTodo(e)}
					>
						Add Todo
					</motion.button>
				</form>
				<div style={{ margin: '5px 0px', color: '#000' }}>{error}</div>
			</div>
			<motion.div className="todoDiv">
				<AnimatePresence mode={'sync'}>
					{todoList.reverse().map((todo) => (
						<motion.div
							key={todo.id}
							style={{ display: 'flex', alignItems: 'center', gap: 10 }}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ type: 'spring' }}
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								whileHover={{ scale: 1.1 }}
								onClick={() => {
									handleOpenEditModal();
									setEditData(todo);
								}}
							>
								<MdEdit fontSize={30} />
							</motion.div>
							<motion.div
								whileTap={{ scale: 0.9 }}
								whileHover={{ scale: 1.1 }}
								onClick={() => {
									removeTodo(todo.id);
								}}
							>
								<MdDelete fontSize={30} />
							</motion.div>
							<motion.div className="todo">{todo.name}</motion.div>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
			<EditTodo
				openEdit={openEdit}
				handleCloseEditModal={handleCloseEditModal}
				editData={editData}
				todoList={todoList}
				setTodoList={setTodoList}
			/>
		</div>
	);
}
