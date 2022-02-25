import React, { useEffect, useState } from "react";
import { SpeedDialAction, SpeedDial } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../actions/userAction";
import { Backdrop } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const UserOptions = ({ user }) => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const alert = useAlert();

	const options = [
		{ icon: <ListAltIcon />, name: "Orders", func: orders },
		{ icon: <PersonIcon />, name: "Profile", func: account },
		{
			icon: (
				<ShoppingCartIcon
					style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
				/>
			),
			name: `Cart(${cartItems.length})`,
			func: cart,
		},
		{ icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
	];
	if (user.role === "admin") {
		options.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: dashboard,
		});
	}

	function cart() {
		history.push("/cart");
	}

	function dashboard() {
		history.push("/admin/dashboard");
	}
	function orders() {
		history.push("/orders");
	}
	function account() {
		history.push("/account");
	}
	function logoutUser() {
		alert.success("Logged out successfully");
		dispatch(logout());
		window.location.reload();
		history.push("/");
	}

	return (
		<>
			<Backdrop open={open} style={{ zIndex: "2" }} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				direction="down"
				draggable
				icon={
					<img
						src={user.avatar.url ? user.avatar.url : "profile.png"}
						className="speedDialIcon"
						alt="Profile"
					/>
				}
				className="speedDial"
			>
				{options.map((item) => (
					<SpeedDialAction
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
						key={item.name}
						tooltipOpen={window.innerWidth <= 600 ? true : false}
					/>
				))}
			</SpeedDial>
		</>
	);
};

export default UserOptions;
