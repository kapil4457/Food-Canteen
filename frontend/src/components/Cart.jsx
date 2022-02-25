import React from "react";
import CartItemCard from "./CartItemCard.jsx";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartAction.js";
import { NavLink, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Alert } from "@material-ui/lab";
import MetaData from "./MetaData.jsx";

const Cart = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();
	const { cartItems } = useSelector((state) => state.cart);

	const increaseQuantity = (id, quantity, stock) => {
		if (stock <= quantity) return;
		dispatch(addItemsToCart(id, quantity + 1));
	};

	const decreaseQuantity = (id, quantity, stock) => {
		if (quantity === 1) return;
		dispatch(addItemsToCart(id, quantity - 1));
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemsFromCart(id));
		alert.success("Item removed ");
	};

	const checkOutHandler = () => {
		history.push("/login?redirect=shipping");
	};

	return (
		<>
			<MetaData title="Cart" />

			{cartItems.length === 0 ? (
				<NoItems>
					<div>No items in your cart</div>
					<NavLink to="/products">Continue Shopping</NavLink>
				</NoItems>
			) : (
				<CartPage>
					<CartHeader>
						<p>Product</p>
						<p>Quantity</p>
						<p>SubTotal</p>
					</CartHeader>

					{cartItems &&
						cartItems.map((item) => (
							<div key={item.product}>
								<CartContainer>
									<CartItemCard item={item} deleteCartItems={deleteCartItems} />
									<div className="cartInput">
										<button
											onClick={() =>
												decreaseQuantity(
													item.product,
													item.quantity,
													item.stock
												)
											}
										>
											-
										</button>
										<input type="number" readOnly value={item.quantity} />
										<button
											onClick={() =>
												increaseQuantity(
													item.product,
													item.quantity,
													item.stock
												)
											}
										>
											+
										</button>
									</div>
									<CartSubtotal>{`₹${
										item.price * item.quantity
									}`}</CartSubtotal>
								</CartContainer>
							</div>
						))}

					<CartGrossProfit>
						<div></div>
						<div className="cartGrossProfitBox">
							<p>Gross Total</p>
							<p>{`₹${cartItems.reduce(
								(acc, item) => acc + item.quantity * item.price,
								0
							)}`}</p>
						</div>

						<div></div>
						<div className="checkOutBtn">
							<button onClick={checkOutHandler}>Check Out</button>
						</div>
					</CartGrossProfit>
				</CartPage>
			)}
		</>
	);
};

export default Cart;

const NoItems = styled.div`
	height: 74vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2rem;
	align-items: center;
	div {
		font-size: 3rem;
		color: gray;
	}
	a {
		width: 13%;
		text-decoration: none;
		color: white;
		height: 5vh;
		background-color: green;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media all and (max-width: 800px) {
		div {
			font-size: 2rem;
		}
		a {
			width: 50%;
			height: 7vh;
		}
	}
`;
const CartGrossProfit = styled.div`
	display: grid;
	grid-template-columns: 2fr 1.2fr;

	@media all and (max-width: 800px) {
		grid-template-columns: 0fr 1fr;
	}
	.cartGrossProfitBox {
		border-top: 3px solid #a090a0;
		box-sizing: border-box;
		margin: 1vmax 4vmax;
		display: flex;
		font: 300 1vmax "Roboto";
		padding: 2vmax 0;
		justify-content: space-between;
	}

	.checkOutBtn {
		display: flex;
		justify-content: flex-end;

		button {
			background-color: #98f989;
			border: none;
			padding: 0.8vmax 4vmax;
			border-radius: 4px;
			cursor: pointer;
			margin: 1vmax 4vmax;
			transition: all 0.5s ease;
			&:hover {
				background-color: rgba(188, 299, 177);
				transform: scale(1.1);
			}

			@media all and (max-width: 800px) {
				height: 2rem;
			}
		}
	}
`;

const CartSubtotal = styled.p`
	display: flex;
	padding: 0.5vmax;
	box-sizing: border-box;
	justify-content: flex-end;
	align-items: center;
	height: 8vmax;
	font: 300 1vmax curasive;
	color: rgba(0, 0, 0, 0.753);
`;

const CartContainer = styled.div`
	width: 90%;
	margin: auto;
	display: grid;
	grid-template-columns: 4fr 1fr 1fr;

	.cartInput {
		height: 8vmax;
		display: flex;
		align-items: center;

		button {
			border: none;
			background-color: rgba(0, 0, 0, 0.616);
			transiton: all 0.5s;
			color: white;
			cursor: pointer;
			padding: 0.5vmax;

			&:hover {
				background-color: rgba(0, 0, 0, 0.767);
			}

			@media all and (max-width: 800px) {
				width: 1.3rem;
			}
		}

		input {
			border: none;
			padding: 0.5vmax;
			width: 3rem;
			outline: none;
			text-align: center;
			font: 400 0.8vmax "Roboto";
			color: rgba(0, 0, 0, 0.74);
			@media all and (max-width: 800px) {
				width: 2rem;
			}
		}
	}
`;
const CartPage = styled.div`
	margin-top: 5vh;
	margin-bottom: 30vh;
`;
const CartHeader = styled.div`
	background-color: rgba(66, 33, 66, 0.5);
	width: 90%;
	box-sizing: border-box;
	margin: auto;
	color: white;
	display: grid;
	grid-template-columns: 4fr 1fr 1fr;
	font: 300 0.7vmax "Roboto";
	p {
		margin: 10px;
		&:last-child {
			text-align: end;
		}
	}
`;
