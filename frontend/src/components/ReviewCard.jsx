import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
	const options = {
		edit: false,
		color: "rgba(20,20,20,0.1)",
		activeColor: "tomato",
		size: window.innerWidth < 600 ? 20 : 25,
		value: review.rating,
		isHalf: true,
	};

	return (
		<>
			<ReviewCards>
				<div className="user">
					<div className="cover">
						<i className="fa fa-user" aria-hidden="true"></i>
					</div>
				</div>
				<p className="name">{review.name}</p>
				<div className="rate">
					<ReactStars {...options} />
				</div>
				<div className="comment">{review.comment}</div>
			</ReviewCards>
		</>
	);
};

export default ReviewCard;

const ReviewCards = styled.div`
	width: 20vw;
	borer-radius: 5px;
	margin-left: 2rem;
	margin-top: 3rem;
	box-shadow: 1px 2px 5px black;
	height: 40vh;
	border: 1px solid black;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}

	.user {
		height: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		.cover {
			width: 4vw;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 8vh;
			border: 2px solid black;
			border-radius: 50%;
		}
	}

	.name,
	.rate {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.comment {
		padding: 1rem;
	}

	@media all and (max-width: 800px) {
		width: 80%;

		.user {
			.cover {
				width: 15vw;
			}
		}
	}
`;
