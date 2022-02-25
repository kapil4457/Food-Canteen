import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
	const options = {
		size: "medium",
		value: product?.ratings,
		readOnly: true,
		precision: 0.5,
	};
	return (
		<>
			<Container>
				<NavLink to={`/product/${product._id}`}>
					<img src={product.images[0].url} alt={product.name} />
					<p>{product.name}</p>
					<div className="rate">
						<div className="stars">
							<Rating className="stars" {...options} />
						</div>
						<span className="noR">({product.numOfReviews} Reviews)</span>
					</div>
					<span className="price">{`₹${product.price}`}</span>
				</NavLink>
			</Container>
		</>
	);
};

export default ProductCard;

const Container = styled.div`
	height: 50vh;
	width: 18vw;
	justify-self: center;
	margin-left: 2rem;

	a {
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: black;

		img {
			height: 35vh;
			width: 100%;
		}

		p {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.rate {
			display: flex;
			align-items: center;
			gap: 1rem;
			.noR {
				color: gray;
				font-size: 0.9rem;
			}
		}
		.price {
			height: 3rem;
			display: flex;
			align-items: center;
			color: red;
			font-weight: bold;
		}
	}

	&:hover {
		box-shadow: 1px 2px 5px black;
		transition: all 0.4s ease;
		transform: translateY(-1vmax);
	}

	@media all and (max-width: 800px) {
		border: 1px solid black;
		// margin-bottom: 2rem;
		width: 80%;
		.rate {
			justify-content: center;
		}
		.price {
			justify-content: center;
		}
	}
`;
