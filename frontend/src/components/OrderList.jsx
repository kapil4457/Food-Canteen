import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { clearErrors } from "../actions/productAction";
import MetaData from "./MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { deleteOrder, getAllOrders } from "../actions/orderAction";
import { DELETE_ORDER_RESET } from "../constants/orderConstant";

const OrderList = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();
	const { error, orders } = useSelector((state) => state.allOrders);
	const { error: deleteError, isDeleted } = useSelector((state) => state.order);
	const deleteOrderHandler = (id) => {
		dispatch(deleteOrder(id));
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
			alert.success("Order Deleted Successfully");
			history.push("/admin/orders");
			dispatch({ type: DELETE_ORDER_RESET });
		}

		dispatch(getAllOrders());
	}, [dispatch, alert, error, history, deleteError, isDeleted]);

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
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<NavLink to={`/admin/order/${params.getValue(params.id, "id")}`}>
							<EditIcon />
						</NavLink>

						<Button
							onClick={() =>
								deleteOrderHandler(params.getValue(params.id, "id"))
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

	orders &&
		orders.forEach((item) => {
			rows.push({
				id: item._id,
				itemQty: item.orderItems.length,
				amount: item.totalPrice,
				status: item.orderStatus,
			});
		});
	return (
		<>
			<MetaData title="All Orders(Admin)" />
			<Dashboard>
				<SideBar />
				<ProductListContainer>
					<h1 id="productListHeading">All Orders</h1>
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

export default OrderList;
const Dashboard = styled.div`
	width: 100vw;
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 5fr;
	h1 {
		font: 300 2rem "Roboto";
	}
	@media all and (max-width: 800px) {
		grid-template-columns: 1fr;
	}
`;
const ProductListContainer = styled.div`
	button:hover {
		color: tomato;
	}
`;
