import React, { useEffect } from "react";
import { clearErrors, getOrderDetails } from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./MetaData";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import styled from "styled-components";
import Loading from "./Loading";

const OrderDetails = ({ match }) => {
	const { order, error, loading } = useSelector((state) => state.orderDetails);
	const dispatch = useDispatch();
	const alert = useAlert();
	console.log(order._id);
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getOrderDetails(match.params.id));
	}, [dispatch, error, alert, match.params.id]);
	return (
		<>
			<MetaData title="Order Details" />
			{loading === false ? (
				<>
					<div className="orderDetailsPage">
						<div className="orderDetailsContainer">
							<Typography component="h1">
								Order #{order && order._id}
							</Typography>
							<Typography>Shipping Info</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p>Name:</p>
									<span>{order && order.user.name}</span>
								</div>
								<div>
									<p>Phone:</p>
									<span>
										{order.shippingInfo && order.shippingInfo.phoneNo}
									</span>
								</div>
								<div>
									<p>Address:</p>
									<span>
										{order.shippingInfo &&
											`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
									</span>
								</div>
							</div>
							<Typography>Payment</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order.paymentInfo &&
											order.paymentInfo.status === "succeeded"
												? "greenColor"
												: "redColor"
										}
									>
										{order.paymentInfo &&
										order.paymentInfo.status === "succeeded"
											? "PAID"
											: "NOT PAID"}
									</p>
								</div>

								<div>
									<p>Amount:</p>
									<span>{order.totalPrice && order.totalPrice}</span>
								</div>
							</div>

							<Typography>Order Status</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order.orderStatus && order.orderStatus === "Delivered"
												? "greenColor"
												: "redColor"
										}
									>
										{order.orderStatus && order.orderStatus}
									</p>
								</div>
							</div>
						</div>

						<div className="orderDetailsCartItems">
							<Typography>Order Items:</Typography>
							<div className="orderDetailsCartItemsContainer">
								{order.orderItems &&
									order.orderItems.map((item) => (
										<div key={item.product}>
											<img src={item.image} alt="Product" />
											<NavLink to={`/product/${item.product}`}>
												{item.name}
											</NavLink>{" "}
											<span>
												{item.quantity} X ₹{item.price} ={" "}
												<b>₹{item.price * item.quantity}</b>
											</span>
										</div>
									))}
							</div>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default OrderDetails;
