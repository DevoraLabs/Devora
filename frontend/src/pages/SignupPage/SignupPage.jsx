import { useForm } from 'react-hook-form';
import './SignupPage.css';
import $api from '../../http/index';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignupPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSignup = (data) => {
		setLoading(true);

		//setTimeout(() => {
		//	setLoading(false);
		//}, 3000);

		$api.post('/auth/signup', data)
			.then((res) => {
				console.log('Signup success:', res.data.user);
				navigate('/login');
			})
			.catch((err) => {
				console.error('Signup error:', err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="signup-container">
			<form onSubmit={handleSubmit(onSignup)}>
				<input
					{...register('username', {
						required: 'Имя обязательно',
					})}
					type="text"
					placeholder="Имя пользователя"
				/>

				{errors.username && (
					<p className="error-message">{errors.username.message}</p>
				)}

				<input
					{...register('password', {
						required: 'Пароль обязателен',
						minLength: { value: 6, message: 'Минимум 6 символов' },
					})}
					type="password"
					placeholder="Пароль"
				/>

				{errors.password && (
					<p className="error-message">{errors.password.message}</p>
				)}

				<button type="submit" disabled={loading}>
					{loading ? (
						<span className="loader"></span>
					) : (
						'Зарегистрироваться'
					)}
				</button>
			</form>

			<Link to="/login">Уже есть аккаунт</Link>
		</div>
	);
}

export default SignupPage;
