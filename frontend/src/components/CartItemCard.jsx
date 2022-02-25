import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CartItemCard = ({ item, deleteCartItems }) => {
	return (
		<>
			<CartItemCardMain>
				<img src={item.image} alt={item.name} />
				<div>
					<div>
						<NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
						<span>{`Price : ₹${item.price}`}</span>
					</div>
					<p onClick={() => deleteCartItems(item.product)}>Remove</p>
				</div>
			</CartItemCardMain>
		</>
	);
};

export default CartItemCard;
const CartItemCardMain = styled.div`
	display: flex;
	padding: 1vmax;
	height: 8vmax;
	align-items: flex-start;

	img {
		width: 5vmax;
	}
	div {
		height: 100%;
		display: flex;
		gap: 1rem;
		margin: 0.3vmax 1vmax;
		align-items: center;
		justify-content: center;

		div {
			display: flex;
			gap: 1rem;
			margin: 0.3vmax 1vmax;
			flex-direction: column;
			@media all and (max-width: 800px) {
				flex-direction: row;
			}
		}

		a {
			font: 300 0.9vmax curasive;
			color: rgba(24, 24, 24, 0.815);
			text-decoration: none;
		}
		span {
			font: 300 0.9vmax "Roboto";
			color: rgba(24, 24, 24, 0.815);
		}
		p {
			color: white;
			cursor: pointer;
			background-color: rgba(255, 57, 57, 0.8);

			width: 6vw;
			height: 4vh;
			display: flex;
			justify-content: center;
			align-items: center;
			@media all and (max-width: 800px) {
				width: 15vw;
				font-size: 12px;
			}
		}
	}
`;
