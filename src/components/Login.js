import { useAuth } from '../contexts/AuthContext';
import React, { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			setError('');
			setLoading(true);
			await login(email, password);
			history.push('/');
		} catch {
			setError('Failed to login');
		}

		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Log In</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								required
							/>
						</Form.Group>
						<Button
							disabled={loading}
							className='w-100'
							type='submit'
						>
							Log In
						</Button>
					</Form>
					<div className='w-100 text-center mt-2'>
						<Link to='/forgot-password'>Forgot Password?</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Don't have an account? <Link to='/signup'>Sign Up!</Link>
			</div>
		</>
	);
}