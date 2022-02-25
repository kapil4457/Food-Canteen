import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousal from "react-material-ui-carousel";
// http://192.168.0.103:3000
//   On Your Network:  http://192.168.0.103:3000
// "proxy": "http://localhost:4000",
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getProductDetails,
	newReviewDetails,
} from "../actions/productAction";
import ReviewCard from "./ReviewCard.jsx";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import { addItemsToCart } from "../actions/cartAction";
import { Rating } from "@material-ui/lab";

import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../constants/productConstant";
import Loading from "./Loading";
const ProductDetails = ({ match }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { products, error, loading } = useSelector(
		(state) => state.productDetails
	);
	const { success, error: reviewError } = useSelector(
		(state) => state.newReview
	);
	const options = {
		size: "large",
		value: products?.ratings,
		readOnly: true,
		precision: 0.5,
	};
	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};
	const increaseQuantity = () => {
		if (products.Stock <= quantity) return;

		setQuantity(quantity + 1);
	};
	const decreaseQuantity = () => {
		if (quantity === 1) return;
		setQuantity(quantity - 1);
	};

	const addToCartHandler = () => {
		dispatch(addItemsToCart(match.params.id, quantity));
		alert.success("Item added to Cart");
	};
	const reviewSubmitHandler = () => {
		const myForm = new FormData();
		myForm.set("rating", rating);
		myForm.set("comment", comment);
		myForm.set("productId", match.params.id);
		dispatch(newReviewDetails(myForm));
		setOpen(false);
	};
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (success) {
			alert.success("Review Submitted");
			dispatch({ type: NEW_REVIEW_RESET });
		}

		if (reviewError) {
			alert.error(reviewError);
			dispatch(clearErrors());
		}
		dispatch(getProductDetails(match.params.id));
	}, [dispatch, match.params.id, error, alert, reviewError, success]);
	return (
		<>
			<MetaData title={products?.name} />

			{loading ? (
				<Loading />
			) : (
				<>
					<Container>
						<div className="carousalDiv">
							{
								<Carousal className="carousal">
									{products?.images &&
										products?.images.map((item, i) => (
											<img
												src={item.url}
												alt={`${i}Slide`}
												className="CarouselImage"
												key={products?._id}
											/>
										))}
								</Carousal>
							}
						</div>
						<div>
							<DetailsBlock className="detailsBlock">
								<div className="block-1">
									<h2>{products?.name}</h2>
									<p>Product # : {products?._id}</p>
								</div>
								<div className="block-2">
									<Rating {...options} />
									<span>({products?.numOfReviews} Reviews)</span>
								</div>
								<div className="block-3">
									<h1>{`Price : ₹${products?.price}`}</h1>
									<div className="block-3-1">
										<div className="block-3-1-1">
											<button onClick={decreaseQuantity}>-</button>
											<input readOnly type="number" value={quantity} />
											<button onClick={increaseQuantity}>+</button>
										</div>
										<button
											disabled={products?.Stock < 1 ? true : false}
											className="addToCart"
											onClick={addToCartHandler}
										>
											Add to Cart
										</button>
									</div>
									<div className="status">
										<span>Status : </span>
										<b
											className={
												products?.Stock < 1 ? "redColor" : "greenColor"
											}
										>
											{products?.Stock < 1 ? "Out Of Stock" : "In Stock"}
										</b>
									</div>
								</div>
								<div className="block-4">
									<div className="des">Description : </div>
									<span className="description">{products?.description}</span>
								</div>
								<div className="subBtnHold">
									<button onClick={submitReviewToggle} className="submitReview">
										Submit Review
									</button>
								</div>
							</DetailsBlock>
						</div>
					</Container>

					<Reviews>
						<Dialog
							aria-labelledby="simple-dialog-title"
							open={open}
							onClose={submitReviewToggle}
						>
							<DialogTitle>Submit Review</DialogTitle>
							<DialogContent className="submitDialog">
								<Rating
									onChange={(e) => setRating(e.target.value)}
									value={rating}
									size="large"
								/>
								<textarea
									className="submitDialogTextArea"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									cols="30"
									rows="5"
								></textarea>
								<DialogActions>
									<Button color="secondary" onClick={submitReviewToggle}>
										Cancel
									</Button>
									<Button onClick={reviewSubmitHandler}>Submit</Button>
								</DialogActions>
							</DialogContent>
						</Dialog>
						<HeadCont>
							<Head>
								<h3>REVIEWS</h3>
							</Head>
						</HeadCont>
						<ReviewCont>
							{products?.reviews && products?.reviews[0] ? (
								<div className="reviews">
									{products?.reviews &&
										products?.reviews.map((review) => (
											<ReviewCard review={review} />
										))}
								</div>
							) : (
								<HeadCont2>
									<Head2>
										<h1> No reviews Yet</h1>
									</Head2>
								</HeadCont2>
							)}
						</ReviewCont>
					</Reviews>
				</>
			)}
		</>
	);
};

export default ProductDetails;
const ReviewCont = styled.div`
	.reviews {
		padding-top: 3rem;
		display: grid;
		grid-template-columns: repeat(4, 25%);
	}
	@media all and (max-width: 800px) {
		.reviews {
			grid-template-columns: repeat(1, 100%);
		}
	}
`;
const Container = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	.carousalDiv {
		width: 50vw;
		height: 80vh;
		display: flex;
		align-items: center;
	}

	.carousal {
		margin-left: 5rem;
		width: 100%;
		height: 80%;
		img {
			width: 90%;
		}
	}

	@media screen and (max-width: 800px) {
		flex-direction: column;
		.carousalDiv {
			width: 100%;
			display: flex;
			align-items: center;
			height: 50vh;
		}
		.carousal {
			margin-left: 3rem;
			width: 100%%;
		}
	}
`;

const DetailsBlock = styled.div`
	width: 100%;
	display: flex;
	width: 50vw;
	height: 80vh;
	justify-content: center;
	gap: 1rem;
	flex-direction: column;

	.status {
		padding-top: 1rem;

		.redColor {
			color: red;
		}

		.greenColor {
			color: green;
		}
	}

	.block-3-1 {
		button {
			width: 1.6vw;
			border: none;
			outline: none;
			border-radius: 5px;
			height: 3vh;
			cursor: pointer;
		}
		display: flex;
		flex-direction: column;
		gap: 1rem;

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		input[type="number"] {
			-moz-appearance: textfield;
		}
		input {
			width: 4vw;
			border: none;
			height: 3vh;
			background: rgba(255, 255, 255, 0.6);
			text-align: center;
		}
		.addToCart {
			width: 6vw;
			height: 4vh;
			transition: all 0.5s ease;
			&:hover {
				transform: scale(1.1);
				background-color: rgba(152, 249, 137);
			}
		}

		.block-3-1-1 {
			display: flex;
			gap: 0.4rem;
			input {
				outline: none;
			}
		}
	}

	.des {
		font-size: 1.7rem;
		font-weight: 500;
	}
	.description {
		color: rgba(0, 0, 0, 0.5);
	}

	.submitReview {
		width: 9rem;
		height: 2.5rem;
		border-radius: 5px;
		border: none;
		outline: none;
		background-color: rgba(152, 249, 137);
		cursor: pointer;
	}

	@media all and (max-width: 800px) {
		justify-content: flex-start;
		width: 100%;

		.block-1 {
			h2,
			p {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}

		.block-2 {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.block-3 {
			display: flex;
			flex-direction: column;
			align-items: center;
			.block-3-1 {
				button {
					width: 3rem;
					height: 2rem;
				}
				input {
					height: 2rem;
				}
				.addToCart {
					width: 8rem;
				}
			}
		}
		.block-4 {
			padding: 0 2rem;
			display: flex;
			flex-direction: column;
			margin-bottom: 3rem;
		}
		.subBtnHold {
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}

	@media all and (max-width: 800px) {
		height: 70vh;
	}
`;

const Reviews = styled.div`
	padding-top: 2rem;

	margin-bottom: 3rem;
	h3 {
		font-size: 2rem;
		font-family: monospace;
		color: gray;
	}
`;

const HeadCont = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Head = styled.div`
	width: 20%;
	border-bottom: 2px solid gray;
	display: flex;
	justify-content: center;
	align-items: center;

	@media all and (max-width: 800px) {
		width: 70%;
	}
`;

const HeadCont2 = styled.div`
	padding-top: 3rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Head2 = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	h1 {
		font-weight: 100;
		font-family: roboto;
		color: gray;
	}
	@media all and (max-width: 800px) {
		width: 65%;
	}
`;
