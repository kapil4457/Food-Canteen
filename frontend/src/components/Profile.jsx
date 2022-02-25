import React, { useEffect } from "react";
import MetaData from "./MetaData";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Profile = () => {
	const history = useHistory();
	const { user, isAuthenticated, loading } = useSelector((state) => state.user);

	useEffect(() => {
		if (isAuthenticated === false) {
			history.push("/login");
		}
	}, [isAuthenticated]);
	return (
		<>
			<MetaData title={`Profile : ${user.name}`} />
			{loading ? (
				<Loading />
			) : (
				<>
					<h1
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "15vh",
						}}
					>
						My Profile
					</h1>
					<Container>
						<Head>
							<img src={user.avatar.url} alt={user.name} />
							<NavLink to="me/update">Edit Profile</NavLink>
						</Head>
						<Main>
							<div>
								<h4>Full Name : </h4>
								<p>{user.name}</p>
							</div>
							<div>
								<h4>Email : </h4>
								<p>{user.email}</p>
							</div>
							<div>
								<h4>Joined on : </h4>
								<p>{String(user.createdAt).substr(0, 10)}</p>
							</div>
							<div className="btns">
								<NavLink to="/orders">My Orders</NavLink>
								<NavLink to="password/update">Change Password</NavLink>
							</div>
						</Main>
					</Container>
				</>
			)}
		</>
	);
};

export default Profile;
const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	margin-bottom: 5rem;
	.btns {
		width: 100%;
		display: flex;
		gap: 2rem;
	}

	@media all and (max-width: 800px) {
		flex-direction: column;
	}
`;
const Head = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5rem;
	object-fit: content;

	img {
		width: 14rem;
		height: 14rem;
		border-radius: 50%;
		border: 1px solid gray;
		box-shadow: 1px 2px 9px gray;
	}
	a {
		text-decoration: none;
		color: white;
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5vh;
		background-color: rgba(250, 157, 120);
		transition: all 0.5s;
		&:hover {
			background-color: tomato;
		}
	}

	@media all and (max-width: 800px) {
		width: 100%;
		a {
			height: 8vh;
		}
	}
`;
const Main = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	gap: 3rem;
	align-items: center;
	div {
		width: 100%;
		a {
			margin-bottom: 2rem;
			width: 30%;
			height: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			text-decoration: none;
			color: white;
			background-color: rgba(250, 157, 120);
			&:hover {
				background-color: tomato;
			}
		}
	}
	h4 {
		font-size: 1.6rem;
		font-weight: 500;
	}
	p {
		font-family: "Lato", sans-serif;
	}

	@media all and (max-width: 800px) {
		margin-top: 3rem;
		width: 100%;
		padding: 0 2rem;
		.btns {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			a {
				width: 50%;
			}
		}
	}
`;
