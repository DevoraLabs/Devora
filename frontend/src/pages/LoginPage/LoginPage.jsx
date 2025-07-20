import { useForm } from 'react-hook-form';
import './LoginPage.css';
import $api from '../../http/index';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from "../../state/user/userSlice";
import { useDispatch } from 'react-redux';

function LoginPage() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogin = (data) => {
		setLoading(true);

		//setTimeout(() => {
		//	setLoading(false);
		//}, 3000);

		$api.post('/auth/login', data)
			.then(res => {
				localStorage.setItem('accessToken', res.data.accessToken);
				console.log('Login success:', res.data.user);
				dispatch(login(res.data.user.username));
				navigate('/');
			}) 
			.catch(err => {
				console.error("Login error:", err);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit(onLogin)}>
				<input
					{...register('username', {
						required: 'Имя обязательно',
					})}
					type='text'
					placeholder='Имя пользователя'
				/>

				{errors.username && (
					<p className="error-message">{errors.username.message}</p>
				)}

				<input
					{...register('password', {
						required: 'Пароль обязателен',
						minLength: { value: 6, message: 'Минимум 6 символов' }
					})}
					type='password'
					placeholder='Пароль'
				/>

				{errors.password && (
					<p className="error-message">{errors.password.message}</p>
				)}

				<button type='submit' disabled={loading}>
					{loading ? <span className="loader"></span> : 'Логин'}
				</button>
			</form>

            <Link to="/signup">
                Создать аккаунт
            </Link>
		</div>
	)
}

export default LoginPage