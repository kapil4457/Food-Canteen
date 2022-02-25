import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
	clearErrors,
	updateProduct,
	getProductDetails,
} from "../actions/productAction";
import MetaData from "./MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { UPDATE_PRODUCT_RESET } from "../constants/productConstant";
import SideBar from "./SideBar";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
const UpdateProduct = ({ match }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const history = useHistory();
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.product);
	const { products, error } = useSelector((state) => state.productDetails);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [Stock, setStock] = useState(0);
	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const categories = ["Veg", "Non-Veg", "Dessert", "Drink"];
	const productId = match.params.id;

	useEffect(() => {
		if (products && products._id !== productId) {
			dispatch(getProductDetails(productId));
		} else {
			setName(products?.name);
			setDescription(products?.description);
			setPrice(products?.price);
			setCategory(products?.category);
			setStock(products?.Stock);
			setOldImages(products?.images);
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("Product Updated Successfully");
			history.push("/admin/products");
			dispatch({ type: UPDATE_PRODUCT_RESET });
		}
	}, [
		dispatch,
		alert,
		error,
		history,
		isUpdated,
		productId,
		products,
		updateError,
	]);

	const updateProductSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("price", price);
		myForm.set("description", description);
		myForm.set("category", category);
		myForm.set("Stock", Stock);

		images.forEach((image) => {
			myForm.append("images", image);
		});
		dispatch(updateProduct(productId, myForm));
	};

	const updateProductImagesChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setImagesPreview([]);
		setOldImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((old) => [...old, reader.result]);
					setImages((old) => [...old, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	return (
		<>
			<MetaData title="Update Product" />

			{loading ? (
				<Loading />
			) : (
				<Container>
					<div className="dashboard">
						<SideBar />
						<div className="newProductContainer">
							<form
								className="createProductForm"
								encType="multipart/form-data"
								onSubmit={updateProductSubmitHandler}
							>
								<h1>Update Product</h1>

								<div>
									<SpellcheckIcon />
									<input
										type="text"
										placeholder="Product Name"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div>
									<AttachMoneyIcon />
									<input
										type="number"
										placeholder="Price"
										required
										onChange={(e) => setPrice(e.target.value)}
										value={price}
									/>
								</div>

								<div>
									<DescriptionIcon />

									<textarea
										placeholder="Product Description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										cols="30"
										rows="1"
									></textarea>
								</div>

								<div>
									<AccountTreeIcon />
									<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									>
										<option value="">Choose Category</option>
										{categories.map((cate) => (
											<option key={cate} value={cate}>
												{cate}
											</option>
										))}
									</select>
								</div>

								<div>
									<StorageIcon />
									<input
										type="number"
										placeholder="Stock"
										required
										onChange={(e) => setStock(e.target.value)}
										value={Stock}
									/>
								</div>

								<div id="createProductFormFile">
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProductImagesChange}
										multiple
									/>
								</div>

								<div id="createProductFormImage">
									{oldImages &&
										oldImages.map((image, index) => (
											<img
												key={index}
												src={image.url}
												alt="Old Product Preview"
											/>
										))}
								</div>
								<div id="createProductFormImage">
									{imagesPreview.map((image, index) => (
										<img key={index} src={image} alt="Product Preview" />
									))}
								</div>

								<Button
									id="createProductBtn"
									type="submit"
									disabled={loading ? true : false}
								>
									Update
								</Button>
							</form>
						</div>
					</div>
				</Container>
			)}
		</>
	);
};

export default UpdateProduct;
const Container = styled.div`
	.dashboard {
		width: 100vw;
		max-width: 100%;
		display: grid;
		grid-template-columns: 1fr 5fr;

		@media all and (max-width: 800px) {
			grid-template-columns: 1fr;
		}
	}

	.newProductContainer {
		width: 100%;
		box-sizing: border-box;
		border-left: 1px solid rgba(0, 0, 0, 0.158);
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.newProductContainer h1 {
		color: rgba(0, 0, 0, 0.733);
		font: 300 2rem "Roboto";
		text-align: center;
	}

	.createProductForm {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		padding: 3vmax;
		justify-content: space-evenly;
		height: 70%;
		width: 70%;
		background-color: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);

		@media all and (max-width: 800px) {
			height: 90%;
			gap: 1rem;
		}
	}

	.createProductForm > div {
		display: flex;
		width: 100%;
		align-items: center;
	}
	.createProductForm > div > input,
	.createProductForm > div > select,
	.createProductForm > div > textarea {
		padding: 1vmax 4vmax;
		padding-right: 1vmax;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 0.267);
		border-radius: 4px;
		font: 300 0.9vmax "Roboto";
		outline: none;
	}

	.createProductForm > div > svg {
		position: absolute;
		transform: translateX(1vmax);
		font-size: 1.6vmax;
		color: rgba(0, 0, 0, 0.623);
	}

	#createProductFormFile > input {
		display: flex;
		padding: 0%;
	}

	#createProductFormFile > input::file-selector-button {
		cursor: pointer;
		width: 100%;
		z-index: 2;
		height: 5vh;
		border: none;
		margin: 0%;
		font: 400 0.8vmax "Roboto";
		transition: all 0.5s;
		padding: 0 1vmax;
		color: rgba(0, 0, 0, 0.623);
		background-color: rgb(255, 255, 255);
	}

	#createProductFormFile > input::file-selector-button:hover {
		background-color: rgb(235, 235, 235);
	}

	#createProductFormImage {
		width: 100%;
		overflow: auto;
	}

	#createProductFormImage > img {
		width: 3vmax;
		margin: 0 0.5vmax;
	}
	#createProductBtn {
		border: none;
		background-color: tomato;
		color: white;
		font: 300 0.9vmax "Roboto";
		width: 100%;
		padding: 0.8vmax;
		cursor: pointer;
		transition: all 0.5s;
		border-radius: 4px;
		outline: none;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
	}

	#createProductBtn:hover {
		background-color: rgb(179, 66, 46);
	}

	@media screen and (max-width: 600px) {
		.newProductContainer {
			background-color: rgb(255, 255, 255);
		}
		.createProductForm {
			padding: 5vmax;
		}

		.createProductForm > div > input,
		.createProductForm > div > select,
		.createProductForm > div > textarea {
			padding: 2.5vmax 5vmax;
			font: 300 1.7vmax cursive;
		}

		.createProductForm > div > svg {
			font-size: 2.8vmax;
		}

		#createProductFormFile > img {
			width: 8vmax;
			border-radius: 100%;
		}

		#createProductFormFile > input::file-selector-button {
			height: 7vh;
			font: 400 1.8vmax cursive;
		}

		#createProductBtn {
			font: 300 1.9vmax "Roboto";
			padding: 1.8vmax;
		}
	}
`;
