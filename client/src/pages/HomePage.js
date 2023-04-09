import React, { useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";

const HomePage = () => {
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values) => {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			setLoading(true);
			await axios.post("/transactions/add-transaction", {
				...values,
				userid: user._id,
			});
			setLoading(false);
			message.success("Transaction added Successfully");
			setShowModal(false);
		} catch (error) {
			setLoading(false);
			message.error("Failed to add transaction");
		}
	};

	return (
		<Layout>
			{loading && <Spinner />}
			<div className='filters'>
				<div>Range Filters: </div>
				<div>
					<button
						className='btn btn-primary'
						onClick={() => {
							setShowModal(true);
						}}
					>
						Add New
					</button>
				</div>
			</div>
			<div className='content'></div>
			<Modal
				title='Add Transaction'
				open={showModal}
				onCancel={() => {
					setShowModal(false);
				}}
				footer={false}
			>
				<Form layout='vertical' onFinish={handleSubmit}>
					<Form.Item label='Amount*:' name='amount'>
						<Input type='text' required />
					</Form.Item>
					<Form.Item label='Type*:' name='type'>
						<Select>
							<Select.Option value='income'>Income</Select.Option>
							<Select.Option value='expense'>Expense</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label='Category*:' name='category'>
						<Select>
							<Select.Option value='salary'>Salary</Select.Option>
							<Select.Option value='tip'>Tip</Select.Option>
							<Select.Option value='project'>Project</Select.Option>
							<Select.Option value='food'>Food</Select.Option>
							<Select.Option value='movie'>movie</Select.Option>
							<Select.Option value='bills'>Bills</Select.Option>
							<Select.Option value='medical'>Medical</Select.Option>
							<Select.Option value='rent'>Rent</Select.Option>
							<Select.Option value='tax'>Tax</Select.Option>
							<Select.Option value='others'>Others</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label='Date*:' name='date'>
						<Input type='date' required />
					</Form.Item>
					<Form.Item label='Refrence:' name='refrence'>
						<Input type='text' />
					</Form.Item>
					<Form.Item label='Description*:' name='description'>
						<Input type='text' required />
					</Form.Item>
					<div className='d-flex justify-content-end'>
						<button type='submit' className='btn btn-primary'>
							SAVE
						</button>
					</div>
				</Form>
			</Modal>
		</Layout>
	);
};

export default HomePage;
