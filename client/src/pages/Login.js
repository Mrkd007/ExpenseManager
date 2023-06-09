import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	// Form submit
	const submitHandler = async (values) => {
		try {
			setLoading(true);
			let { data } = await axios.post("/users/login", values);
			console.log(data);
			if (data) {
				setLoading(false);
				message.success("Login Successfull");
				localStorage.setItem("user", JSON.stringify({ ...data, password: "" }));
				navigate("/");
			} else {
				throw data;
			}
		} catch (error) {
			setLoading(false);
			message.error("Invalid credentials");
		}
	};

	// prevent for login user
	useEffect(() => {
		if (localStorage.getItem("user")) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<>
			<div className='register-page'>
				{loading && <Spinner />}
				<Form layout='vertical' onFinish={submitHandler}>
					<h1>Login Form</h1>
					<Form.Item label='Email' name='email'>
						<Input type='email' />
					</Form.Item>
					<Form.Item label='Password' name='password'>
						<Input type='password' />
					</Form.Item>
					<div className='d-flex justify-content-between'>
						<Link to='/register'>Not a User ? Click here to register</Link>
						<button className='btn btn-primary'>Login</button>
					</div>
				</Form>
			</div>
		</>
	);
};

export default Login;
