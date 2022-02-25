import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MetaData from "./MetaData";
import MailOutlineIcon from "@material-ui/icons/Mail";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PersonIcon from "@material-ui/icons/Person";
import SideBar from "./SideBar";
import { useHistory } from "react-router-dom";
import { getUserDetails, updateUser, clearErrors } from "../actions/userAction";
import { UPDATE_USER_RESET } from "../constants/userConstant";
import Loading from "./Loading";

const UpdateUser = ({ match }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const history = useHistory();

	const { loading, error, user } = useSelector((state) => state.userDetails);
	const {
		loading: updateLoading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.profile);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const userId = match.params.id;
	useEffect(() => {
		if (user && user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("User Updated Successfully");
			history.push("/admin/users");
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

	const updateUserSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("role", role);

		dispatch(updateUser(userId, myForm));
	};

	return (
		<>
			<MetaData title="Update User(Admin)" />

			{loading ? (
				<Loading />
			) : (
				<Container>
					<div className="dashboard">
						<SideBar />
						{loading ? (
							<Loading />
						) : (
							<div className="newProductContainer">
								<form
									className="createProductForm"
									onSubmit={updateUserSubmitHandler}
								>
									<h1>Update User</h1>

									<div>
										<PersonIcon />
										<input
											type="text"
											placeholder="Name"
											required
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div>
										<MailOutlineIcon />
										<input
											type="email"
											placeholder="Email"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>

									<div>
										<VerifiedUserIcon />
										<select
											value={role}
											onChange={(e) => setRole(e.target.value)}
										>
											<option value="">Choose Role</option>
											<option value="admin">Admin</option>
											<option value="user">User</option>
										</select>
									</div>

									<Button
										id="createProductBtn"
										type="submit"
										disabled={
											updateLoading ? true : false || role === "" ? true : false
										}
									>
										Update
									</Button>
								</form>
							</div>
						)}
					</div>
				</Container>
			)}
		</>
	);
};

export default UpdateUser;
const Container = styled.div`
	.dashboard {
		width: 100vw;
		max-width: 100%;
		display: grid;
		grid-template-columns: 1fr 5fr;

		@media all and (max-width: 800px) {
			grid-template-columns: 1fr;
		}
	}

	.newProductContainer {
		width: 100%;
		box-sizing: border-box;
		border-left: 1px solid rgba(0, 0, 0, 0.158);
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.newProductContainer h1 {
		color: rgba(0, 0, 0, 0.733);
		font: 300 2rem "Roboto";
		text-align: center;
	}

	.createProductForm {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		padding: 3vmax;
		justify-content: space-evenly;
		height: 70%;
		width: 50%;
		background-color: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);

		@media all and (max-width: 800px) {
			width: 80%;
		}
	}

	.createProductForm > div {
		display: flex;
		width: 100%;
		align-items: center;
	}
	.createProductForm > div > input,
	.createProductForm > div > select,
	.createProductForm > div > textarea {
		padding: 1vmax 4vmax;
		padding-right: 1vmax;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 0.267);
		border-radius: 4px;
		font: 300 0.9vmax "Roboto";
		outline: none;
	}

	.createProductForm > div > svg {
		position: absolute;
		transform: translateX(1vmax);
		font-size: 1.6vmax;
		color: rgba(0, 0, 0, 0.623);
	}

	#createProductFormFile > input {
		display: flex;
		padding: 0%;
	}

	#createProductFormFile > input::file-selector-button {
		cursor: pointer;
		width: 100%;
		z-index: 2;
		height: 5vh;
		border: none;
		margin: 0%;
		font: 400 0.8vmax "Roboto";
		transition: all 0.5s;
		padding: 0 1vmax;
		color: rgba(0, 0, 0, 0.623);
		background-color: rgb(255, 255, 255);
	}

	#createProductFormFile > input::file-selector-button:hover {
		background-color: rgb(235, 235, 235);
	}

	#createProductFormImage {
		width: 100%;
		overflow: auto;
	}

	#createProductFormImage > img {
		width: 3vmax;
		margin: 0 0.5vmax;
	}
	#createProductBtn {
		border: none;
		background-color: tomato;
		color: white;
		font: 300 0.9vmax "Roboto";
		width: 100%;
		padding: 0.8vmax;
		cursor: pointer;
		transition: all 0.5s;
		border-radius: 4px;
		outline: none;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
	}

	#createProductBtn:hover {
		background-color: rgb(179, 66, 46);
	}

	@media screen and (max-width: 600px) {
		.newProductContainer {
			background-color: rgb(255, 255, 255);
		}
		.createProductForm {
			padding: 5vmax;
		}

		.createProductForm > div > input,
		.createProductForm > div > select,
		.createProductForm > div > textarea {
			padding: 2.5vmax 5vmax;
			font: 300 1.7vmax cursive;
		}

		.createProductForm > div > svg {
			font-size: 2.8vmax;
		}

		#createProductFormFile > img {
			width: 8vmax;
			border-radius: 100%;
		}

		#createProductFormFile > input::file-selector-button {
			height: 7vh;
			font: 400 1.8vmax cursive;
		}

		#createProductBtn {
			font: 300 1.9vmax "Roboto";
			padding: 1.8vmax;
		}
	}
`;
