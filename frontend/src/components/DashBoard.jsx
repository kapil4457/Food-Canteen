import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getAllOrders } from "../actions/orderAction.js";
import { getAdminProducts } from "../actions/productAction.js";
import { getAllUsers } from "../actions/userAction.js";
import Loading from "./Loading.jsx";
import SideBar from "./SideBar.jsx";

const DashBoard = () => {
	const dispatch = useDispatch();

	const { products } = useSelector((state) => state.products);

	const { orders } = useSelector((state) => state.allOrders);
	const { users, loading } = useSelector((state) => state.allUsers);
	let totalAmount = 0;
	orders &&
		orders.forEach((item) => {
			totalAmount += item.totalPrice;
		});
	useEffect(() => {
		dispatch(getAdminProducts());
		dispatch(getAllOrders());
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<>
			<Dashboard>
				<SideBar />
				{loading ? (
					<Loading />
				) : (
					<DashBoardContainer>
						<Typography component="h1">Dashboard</Typography>
						<DashBoardSummary>
							<div className="Head">
								<p>
									Total Amount <br /> {totalAmount}
								</p>
							</div>
							<DashBoardSummaryBox2>
								<NavLink to="/admin/products">
									<p>Product</p>
									<p>{products && products.length} </p>
								</NavLink>
								<NavLink to="/admin/orders">
									<p>Orders</p>
									<p>{orders && orders?.length} </p>
								</NavLink>
								<NavLink to="/admin/users">
									<p>Users</p>
									<p>{users && users.length}</p>
								</NavLink>
							</DashBoardSummaryBox2>
						</DashBoardSummary>
					</DashBoardContainer>
				)}
			</Dashboard>
		</>
	);
};

export default DashBoard;

const Dashboard = styled.div`
	width: 100%;
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 5fr;
	@media all and (max-width: 847px) {
		grid-template-columns: 1fr;
	}
`;
const DashBoardContainer = styled.div`
	border-left: 1px solid rgba(0, 0, 0, 0.13);

	h1 {
		color: rgba(0, 0, 0, 0.735);
		font: 300 2rem "Roboto";
		margin: auto;
		padding: 1.5rem;
		width: 50%;
		text-align: center;
	}
`;
const DashBoardSummary = styled.div`
	margin: 2rem 0;

	.Head > p {
		background-color: rgba(70, 117, 218, 0.932);
		color: white;
		width: 80%;
		margin: 0 2rem;
		padding: 1.5rem;
		text-align: center;
		font: 300 1.3rem "Roboto";
	}
`;
const DashBoardSummaryBox2 = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: center;
	a {
		border-radius: 50%;
		width: 10rem;
		height: 10rem;
		box-shadow: 0.3pc 0.3pc 0.6pc gray, -0.3pc -0.3pc 0.6pc gray;
		color: black;
		display: flex;
		margin: 2rem;
		padding: 1.5rem;
		text-decoration: none;
		font: 300 2rem "Roboto";
		text-align: center;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	@media all and (max-width: 670px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	@media all and (max-width: 450px) {
		grid-template-columns: 1fr;
		align-self: center;
	}
`;
