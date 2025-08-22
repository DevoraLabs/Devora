import './CreateStartupModal.css';
import { useForm } from 'react-hook-form';
import Cross from '../../assets/cross.png';
import $api from '../../http/index';
import { useUser } from '../../context/UserContext';

function CreateStartupModal({ onClose }) {
	const { username } = useUser();
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		$api.post('/startups/create', {
			...data,
			founder: username,
		})
			.then((res) => {
				onClose();
			})
			.catch((err) => {
				console.error('Ошибка создания стартапа:', err);
			});
	};

	return (
		<div className="create-startup">
			<form onSubmit={handleSubmit(onSubmit)}>
				<button className="create-startup-cross" onClick={onClose}>
					<img src={Cross} alt="cross" />
				</button>

				<h3>Название:</h3>
				<input {...register('name')} />

				<h3>Описание:</h3>
				<textarea {...register('description')} />

				<h3>Необходимое количество человек в команде:</h3>
				<input {...register('team')} />

				<button type="submit" className="create-startup-share">
					Поделиться
				</button>
			</form>
		</div>
	);
}

export default CreateStartupModal;
