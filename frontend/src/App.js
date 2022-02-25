import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Products from "./components/Products.jsx";
import LoginSignUp from "./components/LoginSignUp.jsx";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import Profile from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Cart from "./components/Cart.jsx";
import Shipping from "./components/Shipping.jsx";
import ConfirmOrder from "./components/ConfirmOrder.jsx";
import Payment from "./components/Payment.jsx";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/OrderSuccess.jsx";
import MyOrders from "./components/MyOrders.jsx";
import DashBoard from "./components/DashBoard.jsx";
import ProductList from "./components/ProductList.jsx";
import NewProduct from "./components/NewProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import OrderList from "./components/OrderList.jsx";
import ProcessOrder from "./components/ProcessOrder.jsx";
import UserList from "./components/UserList.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

function App() {
	const [stripeApiKey, setStripeApiKey] = useState("");

	async function getStripeApiKey() {
		const { data } = await axios.get("/api/v1/stripeapikey");
		setStripeApiKey(data.stripeApiKey);
	}

	useEffect(() => {
		store.dispatch(loadUser());
		getStripeApiKey();
	}, []);
	window.addEventListener("contextmenu", (e) => e.preventDefault());

	return (
		<>
			<Header />
			{stripeApiKey && (
				<Elements stripe={loadStripe(stripeApiKey)}>
					<ProtectedRoute exact path="/process/payment" component={Payment} />
				</Elements>
			)}
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/products" component={Products} />
				<Route exact path="/login" component={LoginSignUp} />
				<ProtectedRoute exact path="/account" component={Profile} />
				<ProtectedRoute exact path="/me/update" component={UpdateProfile} />
				<Route exact path="/product/:id" component={ProductDetails} />
				<ProtectedRoute
					exact
					path="/password/update"
					component={UpdatePassword}
				/>
				<Route exact path="/password/forgot" component={ForgotPassword} />
				<Route exact path="/password/reset/:token" component={ResetPassword} />
				<Route exact path="/cart" component={Cart} />
				<ProtectedRoute exact path="/shipping" component={Shipping} />
				<ProtectedRoute exact path="/success" component={OrderSuccess} />
				<ProtectedRoute exact path="/orders" component={MyOrders} />
				<ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/dashboard"
					component={DashBoard}
				/>
				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/products"
					component={ProductList}
				/>
				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/product/new"
					component={NewProduct}
				/>
				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/product/:id"
					component={UpdateProduct}
				/>
				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/order/:id"
					component={ProcessOrder}
				/>
				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/orders"
					component={OrderList}
				/>
				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/users"
					component={UserList}
				/>

				<ProtectedRoute
					isAdmin={true}
					exact
					path="/admin/user/:id"
					component={UpdateUser}
				/>
			</Switch>

			<Footer />
		</>
	);
}

export default App;
