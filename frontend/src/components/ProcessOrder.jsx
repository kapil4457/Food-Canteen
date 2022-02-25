import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "./MetaData.jsx";
import styled from "styled-components";
import Loading from "./Loading.jsx";
import SideBar from "./SideBar.jsx";
import {
	clearErrors,
	getOrderDetails,
	updateOrder,
} from "../actions/orderAction.js";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../constants/orderConstant.js";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import "./processOrder.css";
const ProcessOrder = ({ match }) => {
	const { order, error, loading } = useSelector((state) => state.orderDetails);
	const { error: updateError, isUpdated } = useSelector((state) => state.order);
	const dispatch = useDispatch();
	const alert = useAlert();

	const [status, setStatus] = useState("");

	const updateOrderSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("status", status);
		dispatch(updateOrder(match.params.id, myForm));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			console.log(error);
			dispatch(clearErrors());
		}
		if (updateError) {
			alert.error(updateError);
			console.log(updateError);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			alert.success("Order Updated Successfully");
			dispatch({ type: UPDATE_ORDER_RESET });
		}

		dispatch(getOrderDetails(match.params.id));
	}, [dispatch, alert, error, match.params.id, isUpdated, updateError]);
	return (
		<>
			<MetaData title="Process Order" />
			{loading ? (
				<Loading />
			) : (
				<Container>
					<div className="dashboard">
						<SideBar />
						<div className="newProductContainer">
							<div
								className="confirmOrderPage"
								style={{
									display:
										order?.orderStatus === "Delivered" ? "block" : "grid",
								}}
							>
								<div>
									<div className="confirmshippingArea">
										<Typography className="heading">Shipping Info</Typography>
										<div className="orderDetailsContainerBox">
											<div>
												<p>Name:</p>
												<span>{order?.user && order?.user.name}</span>
											</div>
											<div>
												<p>Phone:</p>
												<span>
													{order?.shippingInfo && order?.shippingInfo.phoneNo}
												</span>
											</div>
											<div>
												<p>Address:</p>
												<span>
													{order?.shippingInfo &&
														`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
												</span>
											</div>
										</div>

										<Typography className="heading">Payment</Typography>
										<div className="orderDetailsContainerBox">
											<div>
												<p
													className={
														order?.paymentInfo &&
														order?.paymentInfo.status === "succeeded"
															? "greenColor"
															: "redColor"
													}
												>
													{order?.paymentInfo &&
													order?.paymentInfo.status === "succeeded"
														? "PAID"
														: "NOT PAID"}
												</p>
											</div>

											<div>
												<p>Amount:</p>
												<span>{order?.totalPrice && order?.totalPrice}</span>
											</div>
										</div>

										<Typography className="heading">Order Status</Typography>
										<div className="orderDetailsContainerBox">
											<div>
												<p
													className={
														order?.orderStatus &&
														order?.orderStatus === "Delivered"
															? "greenColor"
															: "redColor"
													}
												>
													{order?.orderStatus && order?.orderStatus}
												</p>
											</div>
										</div>
									</div>
									<div className="confirmCartItems">
										<Typography className="heading">
											Your Cart Items:
										</Typography>
										<div className="confirmCartItemsContainer">
											{order?.orderItems &&
												order?.orderItems.map((item) => (
													<div key={item.product}>
														<img src={item.image} alt="Product" />
														<Link to={`/product/${item.product}`}>
															{item.name}
														</Link>{" "}
														<span>
															{item.quantity} X ₹{item.price} ={" "}
															<b>₹{item.price * item.quantity}</b>
														</span>
													</div>
												))}
										</div>
									</div>
								</div>
								<div
									style={{
										display:
											order?.orderStatus === "Delivered" ? "none" : "block",
									}}
								>
									<form
										className="updateOrderForm"
										onSubmit={updateOrderSubmitHandler}
									>
										<h1>Process Order</h1>

										<div>
											<AccountTreeIcon />
											<select onChange={(e) => setStatus(e.target.value)}>
												<option value="">Choose Category</option>
												{order?.orderStatus === "Processing" && (
													<option value="Shipped">Shipped</option>
												)}

												{order?.orderStatus === "Shipped" && (
													<option value="Delivered">Delivered</option>
												)}
											</select>
										</div>

										<Button
											id="createProductBtn"
											type="submit"
											disabled={
												loading ? true : false || status === "" ? true : false
											}
										>
											Process
										</Button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</Container>
			)}
		</>
	);
};

export default ProcessOrder;
const Container = styled.div`
	.heading {
		font-size: 1.3rem;
	}
	.updateOrderForm {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		h1 {
			font-weight: 400;
			font-size: 2rem;
		}

		select {
			width: 80%;
			height: 2rem;
		}
		#createProductBtn {
			width: 70%;
			height: 2rem;
			box-shadow: 2px 2px 4px gray;
			margin-left: 2rem;
		}
	}

	.dashboard {
		@media all and (max-width: 800px) {
			grid-template-columns: 1fr;
		}
	}

	.confirmOrderPage {
		@media all and (max-width: 800px) {
			grid-template-columns: 1fr;
		}
	}
	margin-bottom: 5rem;
`;
