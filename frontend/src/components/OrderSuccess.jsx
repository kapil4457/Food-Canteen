import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const OrderSuccess = () => {
	return (
		<>
			<OrderSuccesss>
				<CheckCircleIcon />
				<Typography>You Order has been placed Successfully</Typography>
				<NavLink to="/orders">View Orders</NavLink>
			</OrderSuccesss>
		</>
	);
};

export default OrderSuccess;

const OrderSuccesss = styled.div`
	margin: auto;
	padding: 10vmax;

	height: 74vh;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	svg {
		font-size: 7vmax;
		color: green;
	}
	p {
		font-size: 2vmax;
	}
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		cursor: pointer;
		box-shadow: 0.2pc 0.2pc 0.5pc gray;
		text-decoration: none;
		width: 10vw;
		height: 9vh;
		background-color: rgba(51, 51, 51);
		color: white;
		margin: 2vmax;

		@media all and (max-width: 800px) {
			width: 40vw;
		}
	}
`;
