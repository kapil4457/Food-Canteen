import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../actions/orderAction";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "./MetaData";
import Loading from "./Loading";
const MyOrders = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, orders } = useSelector((state) => state.myOrders);
	const { user, loading } = useSelector((state) => state.user);

	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 0.6 },
		{
			field: "status",
			headerName: "Status",
			minWidth: 100,
			flex: 0.3,
			cellClassName: (params) => {
				return params.getValue(params.id, "status") === "Delivered"
					? "greenColor"
					: "redColor";
			},
		},
		{
			field: "itemQty",
			headerName: "Items Qty",
			type: "number",
			minWidth: 150,
			flex: 0.3,
		},
		{
			field: "amount",
			headerName: "Amount",
			type: "number",
			minWidth: 270,
			flex: 0.5,
		},
		{
			field: "date",
			headerName: "Date",
			minWidth: 250,
			flex: 0.3,
		},
		// {
		// 	field: "action",
		// 	headerName: "Actions",
		// 	type: "number",
		// 	minWidth: 150,
		// 	sortable: false,
		// 	flex: 0.3,
		// 	renderCell: (params) => {
		// 		return (
		// 			<NavLink to={`/order/${params.getValue(params.id, "id")}`}>
		// 				<LaunchIcon />
		// 			</NavLink>
		// 		);
		// 	},
		// },
	];
	const rows = [];

	orders &&
		orders.forEach((item, index) => {
			rows.push({
				itemQty: item.orderItems.length,
				id: item._id,
				status: item.orderStatus,
				amount: item.totalPrice,
				date: item.createdAt,
			});
		});

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(myOrders());
	}, [dispatch, alert, error]);
	return (
		<>
			<MetaData title={`${user.name}-Orders`} />

			{loading ? (
				<Loading />
			) : (
				<MyOrdersPage>
					<Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="myOrdersTable"
						autoHeight
					/>
				</MyOrdersPage>
			)}
		</>
	);
};

export default MyOrders;
const MyOrdersPage = styled.div`
	width: 100%;
	margin-bottom: 2rem;
	padding: 0 4vmax;
	display: flex;
	height: 100vh;
	box-sizing: border-box;
	flex-direction: column;

	#myOrdersHeading {
		text-align: center;
		font: 400 1.2vmax "Roboto";
		background-color: rgba(44, 44, 44);
		color: rgba(255, 255, 255);
		transition: all 0.5s;
	}

	a {
		color: rgba(0, 0, 0, 0.527);
		transition: all 0.5s;

		&:hover {
			color: tomato;
		}
	}

	.MuiDataGrid-columnHeader {
		background-color: tomato;
		color: white;
	}
`;
