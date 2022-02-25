import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../actions/productAction";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import Loading from "./Loading";

const categories = ["Veg", "Non-Veg", "Dessert", "Drinks"];
const Products = () => {
	const [search, setSearch] = useState("");
	const [price, setPrice] = useState([0, 500]);
	const [Disabled1, setDisabled1] = useState("block");
	const [Disabled2, setDisabled2] = useState("block");
	const [currentPage, setCurrentPage] = useState(1);
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState(0);
	const dispatch = useDispatch();
	const { products, error, loading } = useSelector((state) => state.products);
	const alert = useAlert();
	const PriceHandler = (event, newPrice) => {
		setPrice(newPrice);
	};
	const searchHandler = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const disabling = () => {
		if (currentPage === 1) {
			setDisabled1("none");
		} else {
			setDisabled1("block");
		}
	};

	const disabling2 = () => {
		if (products?.length === 0) {
			setDisabled2("none");
		} else {
			setDisabled2("block");
		}
	};

	const NextPageNo = (e) => {
		setCurrentPage(currentPage + 1);
	};

	const PrevPageNo = (e) => {
		setCurrentPage(currentPage - 1);
	};
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}

		disabling();
		disabling2();
		dispatch(getProduct(search, currentPage, price, category, rating));
	}, [dispatch, search, currentPage, price, category, rating, alert, error]);

	return (
		<>
			<MetaData title="All Foods" />

			<>
				<Mid>
					<i className="fa fa-search" aria-hidden="true"></i>

					<input
						type="text"
						placeholder="Search"
						value={search}
						onChange={(e) => searchHandler(e)}
					/>
				</Mid>
				<Container>
					<h2 className="productsHeading">All Products</h2>
					<Cont>
						<Filter>
							<div className="one">
								<Typography>Price</Typography>
								<Slider
									value={price}
									onChange={PriceHandler}
									valueLabelDisplay="auto"
									aria-labelledby="rang-slider"
									min={0}
									max={500}
									className="slider"
								/>
							</div>
							<div className="two">
								<Typography>Categories</Typography>
								<ul>
									{categories.map((category) => (
										<li
											className="category-link"
											key={category}
											onClick={() => setCategory(category)}
										>
											{category}
										</li>
									))}
								</ul>
							</div>
							<div className="three">
								<fieldset>
									<Typography component="legend">Ratings Above</Typography>
									<Slider
										value={rating}
										onChange={(e, newRating) => {
											setRating(newRating);
										}}
										aria-labelledby="continuous-slider"
										valueLabelDisplay="auto"
										min={0}
										max={5}
									/>
								</fieldset>
							</div>
						</Filter>
						{loading ? (
							<Loading />
						) : (
							<div className="products">
								{products &&
									products.map((product) => (
										<ProductCard key={product._id} product={product} />
									))}
							</div>
						)}
					</Cont>

					<PaginationBox>
						<button onClick={PrevPageNo} style={{ display: `${Disabled1}` }}>
							Prev
						</button>
						<button onClick={NextPageNo} style={{ display: `${Disabled2}` }}>
							Next
						</button>
					</PaginationBox>
				</Container>
			</>
		</>
	);
};

export default Products;
const Cont = styled.div`
	display: grid;
	grid-template-columns: 20% 80%;

	@media all and (max-width: 800px) {
		display: flex;
		flex-direction: column;
	}
`;
const Filter = styled.div`
	width: 100%;
	display: flex;
	gap: 2rem;
	align-items: center;
	flex-direction: column;
	margin-bottom: 2vh;
	.slider {
		width: 15vmax;
		@media all and (max-width: 800px) {
			width: 30vmax;
		}
	}

	.bar {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}

	.one,
	.two,
	.three {
		width: 100%;
		padding-left: 2rem;
	}

	.three {
		fieldset {
			width: 70%;
			padding: 0 1rem;
		}
	}
`;

const Mid = styled.div`
	margin-top: 3vh;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	input {
		width: 20vw;
		height: 4vh;
		border: none;
		outline: none;
		background-color: transparent;
		border-bottom: 1px solid black;
	}

	@media all and (max-width: 800px) {
		input {
			width: 70vw;
		}
	}
`;
const Container = styled.div`
	margin-bottom: 6rem;

	.productsHeading {
		margin: 2vmax auto;
		width: 15vw;
		border-bottom: 1px solid rgba(0, 0, 0, 0.171);
		padding: 2vmax;
		color: rgba(0, 0, 0, 0.678);
		font: 500 1.5vmax "Roboto";
		text-align: center;
		@media all and (max-width: 800px) {
			width: 30vw;
			font: 500 2vmax "Roboto";
		}
	}

	.products {
		display: flex;
		gap: 3rem;
		flex-wrap: wrap;
		justify-content: left;
		min-height: 30vh;
	}

	.paginationBox {
		display: flex;
		justify-content: center;
		margin: 6vmax;
	}

	.pagination {
		display: flex;
		justify-content: center;
		padding: 0;
	}

	.page-item {
		background-color: rgb(255, 255, 255);
		list-style: none;
		border: 1px solid rgba(0, 0, 0, 0.178);
		padding: 1vmax 1.5vmax;
		transition: all 0.3s;
		cursor: pointer;
	}
	.page-item:first-child {
		border-radius: 5px 0 0 5px;
	}

	.page-item:last-child {
		border-radius: 0 5px 5px 0;
	}
	.page-link {
		text-decoration: none;
		font: 300 0.7vmax "Roboto";
		color: rgb(80, 80, 80);
		transition: all 0.3s;
	}

	.page-item:hover {
		background-color: rgb(230, 230, 230);
	}

	.page-item:hover .page-link {
		color: rgb(0, 0, 0);
	}

	.pageItemActive {
		background-color: tomato;
	}

	.pageLinkActive {
		color: white;
	}

	.filterBox {
		width: 10vmax;
		position: absolute;
		top: 10vmax;
		left: 4vmax;
	}

	.categoryBox {
		padding: 0%;
	}

	.category-link {
		list-style: none;
		color: rgba(0, 0, 0, 0.61);
		font: 400 1.2vmax "Roboto";
		margin: 0.4vmax;
		cursor: pointer;
		transition: all 0.5s;
	}
	.category-link:hover {
		color: tomato;
	}

	.filterBox > fieldset {
		border: 1px solid rgba(0, 0, 0, 0.329);
	}

	@media screen and (max-width: 800px) {
		.filterBox {
			width: 20vmax;
			position: static;
			margin: auto;
		}

		.page-link {
			font: 300 1.7vmax "Roboto";
		}
		.category-link {
			font: 400 1.8vmax "Roboto";
		}
	}
`;

const PaginationBox = styled.div`
	margin-top: 2vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;

	button {
		width: 6vw;
		height: 5vh;
		border: none;
		outline: none;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.2);
		cursor: pointer;
		&:hover {
			background-color: rgba(0, 0, 0, 0.4);
		}

		@media all and (max-width: 800px) {
			width: 20vw;
		}
	}
`;
