import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.png";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
const SideBar = () => {
	return (
		<>
			<Sidebar>
				<Head>
					<NavLink to="/">
						<img src={logo} alt="Food Canteen" />
					</NavLink>
				</Head>
				<Linking>
					<NavLink to="/admin/dashboard">
						<p>
							<DashboardIcon /> Dashboard
						</p>
					</NavLink>
					<Link>
						<TreeView
							defaultCollapseIcon={<ExpandMoreIcon />}
							defaultExpandIcon={<ImportExportIcon />}
						>
							<TreeItem nodeId="1" label="Products">
								<NavLink to="/admin/products">
									<TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
								</NavLink>
								<NavLink to="/admin/product/new">
									<TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
								</NavLink>
							</TreeItem>
						</TreeView>
					</Link>
					<NavLink to="/admin/orders">
						<p>
							<ListAltIcon />
							Orders
						</p>
					</NavLink>
					<NavLink to="/admin/users">
						<p>
							<PeopleIcon />
							Users
						</p>
					</NavLink>
				</Linking>
			</Sidebar>
		</>
	);
};

export default SideBar;
const Sidebar = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 4rem 0;
	height: 100vh;

	a:first-child {
		padding: 0;
	}
	img {
		border-radius: 50%;
		width: 10rem;
		transition: all 0.5s;
		&:hover {
			box-shadow: 1pc 1pc 2pc gray;
		}
	}
	a {
		text-decoration: none;
		transition: all 0.5s;
		color: rgba(0, 0, 0, 0.493);
		padding: 1rem 2rem;
		&:hover {
			color: tomato;
			transform: scale(1.1);
		}
		p {
			display: flex;
			align-items: center;
			svg {
				margin-right: 0.5rem;
			}
		}
	}

	.MuiTypography-root {
		background-color: white;
	}

	@media all and (max-width: 847px) {
		flex-direction: row;
		height: 30vh;
		a {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media all and (max-width: 770px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	@media all and (max-width: 676px) {
		display: grid;
		grid-template-columns: 1fr;
		height: 60vh;
	}
`;

const Head = styled.div``;
const Linking = styled.div`
	@media all and (max-width: 676px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	@media all and (max-width: 450px) {
		a {
			display: flex;
			justify-content: center;
			align-items: center;
			// width: 13%;
		}
	}
`;
