import React from "react";
import styled from "styled-components";
import logo from "./logo.png";

const Footer = () => {
	return (
		<>
			<Container>
				<LeftFooter>
					<div className="head">
						<h4>DOWNLOAD OUR APP</h4>
						<p>Download App for Android or IOS</p>
					</div>
					<div className="logos">
						<div className="one">
							<i className="fab fa-google-play"></i>
							<p>Play Store</p>
						</div>
						<div className="one">
							<i className="fab fa-app-store"></i>
							<p> App Store</p>
						</div>
					</div>
				</LeftFooter>

				<MidFooter>
					<div className="two">
						<img src={logo} alt="" />
						<p>High Quality food served fresh</p>
					</div>
					<div className="copy">Copyrights 2022 &copy; Food Canteen</div>
				</MidFooter>
				<RightFooter>
					<div>Follow us</div>
					<div className="socials">
						<div className="one">
							<i className="fa-brands fa-instagram"></i>
							<p>Instagram</p>
						</div>
						<div className="one">
							<i className="fa-brands fa-twitter"></i>
							<p>Twitter</p>
						</div>
						<div className="one">
							<i className="fa-brands fa-facebook-f"></i>
							<p>Facebook</p>
						</div>
					</div>
				</RightFooter>
			</Container>
		</>
	);
};

export default Footer;

const Container = styled.footer`
	width: 100%;
	overflow-x: hidden;
	background-color: rgba(211, 211, 211);
	box-shadow: 1px 1px 9px gray;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;

	@media all and (max-width: 800px) {
		flex-direction: column;
		gap: 2rem;
	}
`;
const LeftFooter = styled.div`
	display: flex;
	text-align: center;
	gap: 1rem;
	font-family: roboto;

	.head {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.logos {
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.one {
			height: 2rem;
			width: 10rem;
			border-radius: 8px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: gray;
			color: white;
			cursor: pointer;
			gap: 0.5rem;
			p {
				font-weight: bold;
			}
			&:hover {
				box-shadow: 1px 1px 3px black;
				color: rgba(24, 49, 83, 0.7);
			}
		}
	}

	@media all and (max-width: 800px) {
		padding-top: 2rem;
		.head {
			font-size: 12px;
		}
	}
`;
const MidFooter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-family: roboto;
	align-items: center;
	width: 40rem;
	.two {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.copy {
		padding-left: 5rem;
	}
	img {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background-color: white;
	}

	@media all and (max-width: 800px) {
		img {
			width: 2rem;
			height: 2rem;
		}
		.copy {
			padding-left: 1rem;
		}
	}
`;
const RightFooter = styled.div`
	display: flex;
	gap: 1rem;
	font-family: roboto;
	flex-direction: column;
	text-align: center;
	.socials {
		display: flex;
		gap: 1rem;
		.one {
			height: 3rem;
			cursor: pointer;

			width: 5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			box-shadow: 1px 1px 3px gray;
		}
	}
`;
