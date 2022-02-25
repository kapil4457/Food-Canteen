import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps.jsx";
import MetaData from "./MetaData.jsx";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ConfirmOrder = () => {
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const history = useHistory();
	const subtotal = cartItems.reduce(
		(acc, item) => acc + item.quantity * item.price,
		0
	);
	const shippingCharges = subtotal > 1000 ? 0 : 200;

	const tax = subtotal * 0.18;

	const totalPrice = subtotal + shippingCharges + tax;

	const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;
	const proceedToPayment = () => {
		const data = {
			subtotal,
			shippingCharges,
			tax,
			totalPrice,
		};

		sessionStorage.setItem("orderInfo", JSON.stringify(data));
		history.push("/process/payment");
	};
	return (
		<>
			<MetaData title="Confirm Order" />
			<CheckoutSteps activeStep={1} />
			<ConfirmOrderPage>
				<div>
					<ConfirmShippingArea>
						<Typography>Shipping Info</Typography>
						<ConfirmShippingAreaBox>
							<div>
								<p>Name : </p>
								<span>{user.name}</span>
							</div>
							<div>
								<p>Phone Number : </p>
								<span> {shippingInfo.phoneNo}</span>
							</div>
							<div>
								<p>Address : </p>
								<span>{address}</span>
							</div>
						</ConfirmShippingAreaBox>
					</ConfirmShippingArea>
					<ConfirmCartItems>
						<Typography>Your Cart Items : </Typography>
						<ConfirmCartItemsContainer>
							{cartItems &&
								cartItems.map((item) => (
									<div key={item.product}>
										<img src={item.image} alt="Product" />
										<NavLink to={`/product/${item.product}`}>
											{item.name}
										</NavLink>
										<span>
											{item.quantity} X ₹{item.price} ={" "}
											<b>₹{item.quantity * item.price}</b>
										</span>
									</div>
								))}
						</ConfirmCartItemsContainer>
					</ConfirmCartItems>
				</div>
				{/*  */}
				<div>
					<OrderSummary>
						<Typography className="title">Order Summary</Typography>
						<div className="main">
							<div>
								<p>Subtotal :</p>
								<span>₹{subtotal}</span>
							</div>
							<div>
								<p>Shipping Charges :</p>
								<span>₹{shippingCharges}</span>
							</div>
							<div>
								<p>GST :</p>
								<span>₹{tax}</span>
							</div>
						</div>

						<OrderSummaryTotal>
							<p>
								<b>Total :</b>
							</p>
							<span>₹{totalPrice}</span>
						</OrderSummaryTotal>
						<div className="btn">
							<button onClick={proceedToPayment}>Proceed to Payment</button>
						</div>
					</OrderSummary>
				</div>
			</ConfirmOrderPage>
		</>
	);
};

export default ConfirmOrder;
const ConfirmOrderPage = styled.div`
	height: 100vh;
	display: grid;
	grid-template-columns: 6fr 3fr;
	
	
	@media all and (max-width: 800px) {
		grid-template-columns: 1fr;

	}

	}
`;
const ConfirmShippingArea = styled.div`
	padding: 5vmax;
	padding-bottom: 0;
	p {
		font: 400 1.8vmax "Roboto";
	}
`;
const ConfirmShippingAreaBox = styled.div`
	margin: 2vmax;
	div {
		display: flex;
		margin: 1vmax 0;
		p {
			font: 400 1vmax "Roboto";
			color: black;
		}
		span {
			font: 400 1vmax "Roboto";
			color: #575757;
		}
	}
`;
const ConfirmCartItems = styled.div`
	padding: 5vmax;
	padding-top: 2vmax;
	@media all and (max-width: 800px) {
		padding-bottom: 0;
	}
	p {
		font: 400 1.8vmax "Roboto";
	}
`;
const ConfirmCartItemsContainer = styled.div`
	margin-top: 5vh;
	max-height: 20vmax;
	overflow-y: auto;
	padding: 0 2rem;
	border-radius: 4px;
	box-shadow: 0.5pc 0.5pc 1.5pc gray;

	div {
		display: flex;
		justify-content: space-between;
		margin: 2vmax 0;
		align-items: center;
		font: 400 1vmax "Roboto";
		img {
			width: 3vmax;
		}
		a {
			width: 60%;
			text-decoration: none;
			color: #575757;
			margin: 0 2vmax;
		}
		span {
			font: 100 1vmax "Roboto";
			color: #5e5e5e;
		}
	}
`;
const OrderSummary = styled.div`
	height: 100%;
	border-left: 1px solid rgba(0, 0, 0, 0.247);
	padding: 7vmax;
	.title {
		text-align: center;
		font: 400 1.8vmax "Roboto";
		padding: 1vmax;
		width: 100%;
		margin: auto;
		border-bottom: 1px solid rgba(0, 0, 0, 0.267);
		box-sizing: border-box;
	}
	.main {
		div {
			font: 400 1vmax "Roboto";
			display: flex;
			justify-content: space-between;
			margin: 2vmax 0;
			span {
				color: #5e5e5e;
			}
		}
	}

	.btn {
		width: 100%;
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			border: none;
			background-color: rgba(199, 89, 10, 0.7);
			color: white;
			border-radius: 5px;
			cursor: pointer;
			height: 5vh;
			outline: none;
			width: 70%;
			transition: all 0.5s;
			&:hover {
				box-shadow: 1px 1px 4px gray;
				transform: scale(1.01);
				background-color: rgba(199, 89, 10, 0.9);
			}
		}
	}
`;
const OrderSummaryTotal = styled.div`
	display: flex;
	font: 400 1vmax "Roboto";
	justify-content: space-between;
	border-bottom: 1px solid rgba(0, 0, 0, 0.363);
	padding: 2vmax 0;
`;
