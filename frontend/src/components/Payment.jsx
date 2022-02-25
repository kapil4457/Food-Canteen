import { Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "./MetaData";
import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { clearErrors, createOrder } from "../actions/orderAction";
import Loading from "./Loading";

const Payment = () => {
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
	const payBtn = useRef(null);
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();
	const stripe = useStripe();
	const elements = useElements();
	const paymentData = {
		amount: Math.round(orderInfo.totalPrice) * 100,
	};

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user, loading } = useSelector((state) => state.user);
	const { error } = useSelector((state) => state.newOrder);
	const order = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.subTotal,
		taxPrice: orderInfo.tax,
		shippingPrice: orderInfo.shippingCharges,
		totalPrice: orderInfo.totalPrice,
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		payBtn.current.disabled = true;
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/v1/payment/process",
				paymentData,
				config
			);

			const client_secret = data.client_secret;
			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: shippingInfo.address,
							city: shippingInfo.city,
							state: shippingInfo.state,
							postal_code: shippingInfo.pinCode,
							country: shippingInfo.country,
						},
					},
				},
			});

			if (result.error) {
				payBtn.current.disabled = false;
				alert.error(result.error.message);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					order.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};
					dispatch(createOrder(order));
					history.push("/success");
				} else {
					alert.error("There was some error while processing the payment ");
				}
			}
		} catch (error) {
			payBtn.current.disabled = false;
			alert.message(error.response.data.message);
		}
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, alert]);
	return (
		<>
			<MetaData title="Payment" />
			<CheckoutSteps activeStep={2} />

			{loading ? (
				<Loading />
			) : (
				<PaymentContainer>
					<form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
						<Typography>Card Info</Typography>
						<div>
							<CreditCardIcon />
							<CardNumberElement className="paymentInput" />
						</div>
						<div>
							<EventIcon />
							<CardExpiryElement className="paymentInput" />
						</div>
						<div>
							<VpnKeyIcon />
							<CardCvcElement className="paymentInput" />
						</div>

						<input
							type="submit"
							value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
							ref={payBtn}
							className="paymentFormBtn"
						/>
					</form>
				</PaymentContainer>
			)}
		</>
	);
};

export default Payment;
const PaymentContainer = styled.div`
	overflow-x: hidden;
	display: grid;
	place-items: center;
	height: 65vh;
	margin: 2vmax;

	.paymentForm {
		display: flex;
		gap: 2rem;
		flex-direction: column;
		width: 22%;
		height: 100%;

		@media all and (max-width: 800px) {
			width: 80%;
		}

		p {
			font: 400 2vmax "Roboto";
			border-bottom: 1px solid rgba(0, 0, 0, 0.13);
			color: rgba(0, 0, 0, 0.753);
			text-align: center;
			padding: 1vmax 0;
		}

		.paymentInput {
			padding: 1vmax 4vmax;
			padding-right: 1vmax;
			border-radius: 4px;
			outline: none;
			box-sizing: border-box;
			border: 1px solid rgba(0, 0, 0, 0.267);
			width: 100%;
		}

		div {
			svg {
				position: absolute;
				transform: translateX(1vmax) translateY(0.7vmax);
				font-size: 1.6vmax;
				color: rgba(0, 0, 0, 0.623);
			}
		}
	}

	.paymentFormBtn {
		color: white;
		font: 300 0.9vmax "Roboto";
		border: none;
		background-color: tomato;
		width: 100%;
		padding: 0.8vmax;
		cursor: pointer;
		transition: all 0.5s;
		outline: none;

		&:hover {
			background-color: rgba(179, 66, 46);
		}

		@media all and (max-width: 800px) {
			height: 2rem;
			font: 300 1.5vmax "Roboto";
		}
	}
`;
