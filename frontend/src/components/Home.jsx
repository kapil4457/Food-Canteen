import React, { useEffect } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard.jsx";
import MetaData from "./MetaData";
import { clearErrors, getProduct } from "../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NavLink } from "react-router-dom";
import UserOptions from "./UserOptions.jsx";
import Loading from "./Loading.jsx";
const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { isAuthenticated, user, loading } = useSelector((state) => state.user);
	const { error, products } = useSelector((state) => state.products);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProduct());
	}, [dispatch, error, alert]);

	return (
		<>
			<MetaData title={"Food Canteen"} />

			{loading ? (
				<Loading />
			) : (
				<Container>
					<FeaturedProducts>
						{isAuthenticated ? (
							<UserOptions user={user} className="btn" />
						) : (
							<></>
						)}
						<HeadCont>
							<Head>
								<div>Most Popular</div>
							</Head>
						</HeadCont>

						<ProductContainer>
							{products &&
								products.map((product) => (
									<ProductCard product={product} key={product._id} />
								))}
						</ProductContainer>
					</FeaturedProducts>
				</Container>
			)}
		</>
	);
};

export default Home;

const Container = styled.div`
	margin-bottom: 6rem;
	width: 100%;
`;
const FeaturedProducts = styled.div`
	padding-top: 2rem;
	width: 100%;
`;

const Head = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.3rem;
	font-weight: 500;
	padding-bottom: 8px;
	color: gray;
	border-bottom: 1px solid black;
	@media all and (max-width: 800px) {
		width: 40%;
	}
`;

const HeadCont = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ProductContainer = styled.div`
	padding-top: 3rem;
	display: grid;
	grid-template-columns: repeat(4, 25%);
	justify-content: center;
	align-items: center;

	@media all and (max-width: 800px) {
		grid-template-columns: repeat(1, 100%);
		gap: 2rem;
	}
`;
