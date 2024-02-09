import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	color: '#000',
	border: 'none',
	borderRadius: '20px',
	boxShadow: 24,
	p: 4,
};

export default function EditTodo({
	openEdit,
	handleCloseEditModal,
	editData,
	todoList,
	setTodoList,
}) {
	const [newTodo, setNewTodo] = useState('');
	useEffect(() => {
		setNewTodo(editData.name);
	}, [editData]);

	const updateTodo = () => {
		const data = todoList.map((todo) => {
			if (todo.id == editData.id) {
				return {
					...todo,
					name: newTodo,
				};
			}
			return todo;
		});
		setTodoList(data);
		handleCloseEditModal();
	};
	return (
		<Modal
			open={openEdit}
			onClose={handleCloseEditModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h2"
					sx={{ textAlign: 'center' }}
				>
					Update Todo
				</Typography>
				<input
					style={{
						padding: 14,
						borderRadius: 4,
						fontSize: 18,
						width: '90%',
						margin: '10px auto',
					}}
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<button onClick={() => handleCloseEditModal()}>Cancel</button>
					<button onClick={() => updateTodo()} className="modal-btn">
						Update
					</button>
				</Box>
			</Box>
		</Modal>
	);
}
