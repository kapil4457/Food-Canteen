import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";
import Cartlogo from "./cart.png";
// import UserOptions from "./UserOptions.jsx";
import { useSelector } from "react-redux";

const Header = () => {
	const [height, setHeight] = useState("11vh");
	const [menu, setmenu] = useState("none");
	const { isAuthenticated, user } = useSelector((state) => state.user);
	const showMenu = () => {
		if (height === "11vh") {
			setHeight("20vh");
			setmenu("flex");
		}

		if (height === "20vh") {
			setHeight("11vh");
			setmenu("none");
		}
	};
	return (
		<>
			<Container style={{ height: height }}>
				<Left>
					<div className="leftwitham">
						<NavLink to="/">
							<img src={logo} alt="Web Logo" />
							<div>Food Canteen</div>
						</NavLink>
					</div>
					<RightHam onClick={showMenu}>
						<i class="fa-solid fa-bars"></i>
					</RightHam>
				</Left>

				<Right style={{ display: menu }}>
					<NavLink exact to="/" activeClassName="active">
						Home
					</NavLink>
					|
					<NavLink exact to="/products" activeClassName="active">
						All Items
					</NavLink>
					|
					<NavLink exact to="/cart" activeClassName="">
						<img src={Cartlogo} alt="cart Logo" />
					</NavLink>
					{!isAuthenticated ? (
						<NavLink className="profile" activeClassName="" exact to="/login">
							<i className="fa fa-user" aria-hidden="true"></i>
						</NavLink>
					) : (
						<></>
					)}
				</Right>
			</Container>
		</>
	);
};

export default Header;

const RightHam = styled.div`
	height: 100%;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Container = styled.div`
	background-color: rgba(247, 92, 30, 0.6);
	height: 11vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	transition: all 0.5s;

	@media all and (max-width: 800px) {
		.btn {
			width: 100%;
			height: 100%;
		}
	}
`;
const Left = styled.div`
	padding: 0 2rem;
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	.leftwitham {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		a {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			text-decoration: none;
		}
	}
	img {
		background-color: white;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		box-shadow: 1px 2px 3px gray;
	}
	div {
		font-size: 1.4rem;
		font-family: roboto;
	}

	@media screen and (max-width: 800px) {
		img {
			width: 2rem;
			height: 2rem;
		}
		div {
			font-size: 1rem;
		}
	}
`;
const Right = styled.div`
	padding: 0 0.5rem;
	gap: 2rem;
	width: 100%;
	align-items: center;
	text-align: center;
	justify-content: center;
	font-size: 1.1rem;
	font-family: roboto;
	font-weight: bold;
	text-transform: uppercase;
	transition: all 0.5s;

	a {
		color: rgba(0, 0, 0, 0.6);
		text-decoration: none;
		img {
			width: 4rem;
			height: 4rem;
		}
	}
	.profile {
		width: 3rem;
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid rgba(0, 0, 0);
		border-radius: 50%;
		height: 3rem;
		img {
			width: 2rem;
			height: 2rem;
		}
	}

	.active {
		border-bottom: 2px solid red;
		color: black;
	}
	@media all and (max-width: 800px) {
		font-size: 0.9 rem;
		gap: 1rem;

		img {
			width: 1rem;
			height: rem;
		}
	}
`;
