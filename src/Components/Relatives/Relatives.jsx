import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import './Relatives.css';

const validationSchema = Yup.object().shape({
	relatives: Yup.array().of(
		Yup.object().shape({
			name: Yup.string().required("Name is required"),
			dob: Yup.date().required("Date of Birth is required"),
			gender: Yup.string().required("Gender is required"),
			passenger: Yup.string().required("Passenger Type is required")
		})
	)
});

function Relatives() {
	const formik = useFormik({
		initialValues: {
			relatives: [{ name: '', dob: '', gender: '', passenger: 'Adult' }]
		},
		validationSchema,
		onSubmit: async (values) => {
			const touristId = localStorage.getItem('tourist_id');

			const dataToSend = {
				dependants: values.relatives.map(relative => ({
					...relative,
				}))
			};

			try {
				await axios.post('http://localhost/dependant.php', dataToSend, {
					headers: {
						'Tourist-Id': touristId,
						'Content-Type': 'application/json'
					}
				});
				formik.resetForm();
				toast.success('Relatives are added successfully', {
					duration: 2000,
					position: 'top-center'
				});
			} catch (error) {
				console.error('Error:', error);
				toast.error('Oops, Something went wrong..', {
					duration: 2000,
					position: 'top-center'
				});
			}
		}
	});

	const addRelative = () => {
		const relatives = [...formik.values.relatives, { name: '', dob: '', gender: '', passenger: 'Adult' }];
		formik.setFieldValue('relatives', relatives);
	};

	const removeRelative = (index) => {
		const relatives = [...formik.values.relatives];
		relatives.splice(index, 1);
		formik.setFieldValue('relatives', relatives);
	};

	return (
		<div id="booking" className="section">
			<div className="section-center">
				<div className="container">
					<div className="row">
						<div className="booking-form">
							<div className="booking-bg">
								<div className="form-header">
									<h2>Complete your reservation</h2>
									<p>We're thrilled to have you here. Let's get started on your journey!</p>
								</div>
							</div>
							<form onSubmit={formik.handleSubmit}>
								<div className="relative-details">
									{formik.values.relatives.map((relative, index) => (
										<div key={index} className="row align-items-end mb-3">
											<div className="col-2">
												<div className="form-group">
													<span className="form-label">Name</span>
													<input className="form-control" type="text" name={`relatives[${index}].name`} {...formik.getFieldProps(`relatives[${index}].name`)} required />
													{formik.touched.relatives && formik.touched.relatives[index] && formik.touched.relatives[index].name && formik.errors.relatives && formik.errors.relatives[index] && formik.errors.relatives[index].name ? (
														<div className="text-danger">{formik.errors.relatives[index].name}</div>
													) : null}
												</div>
											</div>
											<div className="col-3">
												<div className="form-group">
													<span className="form-label">Date of Birth</span>
													<input className="form-control" type="date" name={`relatives[${index}].dob`} {...formik.getFieldProps(`relatives[${index}].dob`)} required />
													{formik.touched.relatives && formik.touched.relatives[index] && formik.touched.relatives[index].dob && formik.errors.relatives && formik.errors.relatives[index] && formik.errors.relatives[index].dob ? (
														<div className="text-danger">{formik.errors.relatives[index].dob}</div>
													) : null}
												</div>
											</div>
											<div className="col-3">
												<div className="form-group">
													<span className="form-label">Gender</span>
													<select className="form-control" name={`relatives[${index}].gender`} {...formik.getFieldProps(`relatives[${index}].gender`)} required>
														<option value="">Select Gender</option>
														<option value="male">Male</option>
														<option value="female">Female</option>
													</select>
													<span className="select-arrow"></span>
													{formik.touched.relatives && formik.touched.relatives[index] && formik.touched.relatives[index].gender && formik.errors.relatives && formik.errors.relatives[index] && formik.errors.relatives[index].gender ? (
														<div className="text-danger">{formik.errors.relatives[index].gender}</div>
													) : null}
												</div>
											</div>
											<div className="col-3">
												<div className="form-group">
													<span className="form-label">Passenger Type</span>
													<select className="form-control" name={`relatives[${index}].passenger`} {...formik.getFieldProps(`relatives[${index}].passenger`)} required>
														<option value="Adult">Adult</option>
														<option value="Infant">Infant</option>
														<option value="Child">Child</option>
													</select>
													<span className="select-arrow"></span>
													{formik.touched.relatives && formik.touched.relatives[index] && formik.touched.relatives[index].passenger && formik.errors.relatives && formik.errors.relatives[index] && formik.errors.relatives[index].passenger ? (
														<div className="text-danger">{formik.errors.relatives[index].passenger}</div>
													) : null}
												</div>
											</div>
											<div className="col-1 text-center">
												<button type="button" className="remove-relative-btn m-4" onClick={() => removeRelative(index)}>
													<i className="fas fa-times"></i>
												</button>
											</div>
										</div>
									))}
									<button type="button" className="add-relative-btn btn" onClick={addRelative}>+ Add Relative</button>
								</div>
								<div className="form-btn">
									<button className="submit-btn btn btn-success" type="submit">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Relatives;
