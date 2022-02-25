import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import MetaData from "./MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { getAllUsers, clearErrors, deleteUser } from "../actions/userAction";
import { DELETE_USER_RESET } from "../constants/userConstant";

const UserList = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();
	const { error, users } = useSelector((state) => state.allUsers);

	const {
		error: deleteError,
		isDeleted,
		message,
	} = useSelector((state) => state.profile);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			alert.success(message);
			history.push("/admin/users");
			dispatch({ type: DELETE_USER_RESET });
		}

		dispatch(getAllUsers());
	}, [dispatch, alert, error, history, deleteError, isDeleted, message]);

	const columns = [
		{ field: "id", headerName: "User ID", minWidth: 180, flex: 0.6 },

		{
			field: "email",
			headerName: "Email",
			minWidth: 200,
			flex: 0.4,
		},
		{
			field: "name",
			headerName: "Name",
			minWidth: 150,
			flex: 0.5,
		},

		{
			field: "role",
			headerName: "Role",
			minWidth: 150,
			flex: 0.3,
			cellClassName: (params) => {
				return params.getValue(params.id, "role") === "admin"
					? "greenColor"
					: "redColor";
			},
		},

		{
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<NavLink to={`/admin/user/${params.getValue(params.id, "id")}`}>
							<EditIcon />
						</NavLink>

						<Button
							onClick={() =>
								deleteUserHandler(params.getValue(params.id, "id"))
							}
						>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	users &&
		users.forEach((item) => {
			rows.push({
				id: item._id,
				role: item.role,
				email: item.email,
				name: item.name,
			});
		});
	return (
		<>
			<MetaData title="All Users(Admin)" />
			<Dashboard>
				<SideBar />
				<ProductListContainer>
					<h1 id="productListHeading">All Users</h1>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="productListTable"
						autoHeight
					/>
				</ProductListContainer>
			</Dashboard>
		</>
	);
};

export default UserList;
const Dashboard = styled.div`
	width: 100vw;
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 5fr;
	@media all and (max-width: 800px) {
		grid-template-columns: 1fr;
	}
`;
const ProductListContainer = styled.div`
	button:hover {
		color: tomato;
	}
`;
