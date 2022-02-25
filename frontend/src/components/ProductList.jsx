import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
	clearErrors,
	getAdminProducts,
	deleteProduct,
} from "../actions/productAction";
import MetaData from "./MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { DELETE_PRODUCT_RESET } from "../constants/productConstant";

const ProductList = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();
	const { error, products } = useSelector((state) => state.products);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.product
	);
	const deleteProductHandler = (id) => {
		dispatch(deleteProduct(id));
	};
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			alert.success("Product Deleted Successfully");
			history.push("/admin/dashboard");
			dispatch({ type: DELETE_PRODUCT_RESET });
		}

		dispatch(getAdminProducts());
	}, [dispatch, alert, error, history, deleteError, isDeleted]);

	const columns = [
		{ field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

		{
			field: "name",
			headerName: "Name",
			minWidth: 250,
			flex: 0.7,
		},
		{
			field: "stock",
			headerName: "Stock",
			type: "number",
			minWidth: 150,
			flex: 0.3,
		},

		{
			field: "price",
			headerName: "Price",
			type: "number",
			minWidth: 270,
			flex: 0.5,
		},

		{
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<NavLink to={`/admin/product/${params.getValue(params.id, "id")}`}>
							<EditIcon />
						</NavLink>

						<Button
							onClick={() =>
								deleteProductHandler(params.getValue(params.id, "id"))
							}
						>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	products &&
		products.forEach((item) => {
			rows.push({
				id: item._id,
				stock: item.Stock,
				price: item.price,
				name: item.name,
			});
		});
	return (
		<>
			<MetaData title="All Products(Admin)" />
			<Dashboard>
				<SideBar />
				<ProductListContainer>
					<h1 id="productListHeading">All Products</h1>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="productListTable"
						autoHeight
					/>
				</ProductListContainer>
			</Dashboard>
		</>
	);
};

export default ProductList;
const Dashboard = styled.div`
	width: 100vw;
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 5fr;
	h1 {
		font: 300 2rem "Roboto";
	}
	@media all and (max-width: 830px) {
		grid-template-columns: 1fr;
	}
`;
const ProductListContainer = styled.div`
	button:hover {
		color: tomato;
	}
`;
