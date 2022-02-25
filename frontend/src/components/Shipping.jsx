import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./MetaData.jsx";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { saveShippingInfo } from "../actions/cartAction.js";
import { useHistory } from "react-router-dom";

const Shipping = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();
	const { shippingInfo } = useSelector((state) => state.cart);
	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [state, setState] = useState(shippingInfo.state);
	const [country, setCountry] = useState(shippingInfo.country);
	const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
	const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

	const shippingSubmit = (e) => {
		e.preventDefault();
		if (phoneNo.length < 10 || phoneNo.length > 10) {
			alert.error("Phone number should be 10 digits long");
			return;
		}
		dispatch(
			saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
		);
		history.push("/order/confirm");
	};
	return (
		<>
			<MetaData title="Shipping Details" />
			<CheckoutSteps activeStep={0} />
			<ShippingContainer>
				<ShippingBox>
					<ShippingHeading>Shipping Details</ShippingHeading>
					<ShippingForm encType="multipart/form-data" onSubmit={shippingSubmit}>
						<div>
							<HomeIcon />
							<input
								type="text"
								placeholder="Address"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<div>
							<LocationCityIcon />
							<input
								type="text"
								placeholder="City"
								required
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
						<div>
							<PinDropIcon />
							<input
								type="text"
								placeholder="Pin Code"
								required
								value={pinCode}
								onChange={(e) => setPinCode(e.target.value)}
							/>
						</div>
						<div>
							<PhoneIcon />
							<input
								type="text"
								placeholder="Phone Number"
								required
								value={phoneNo}
								onChange={(e) => setPhoneNo(e.target.value)}
								size="10"
							/>
						</div>
						<div>
							<PublicIcon />

							<select
								required
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value="">Country</option>
								{Country &&
									Country.getAllCountries().map((item) => (
										<option key={item.isoCode} value={item.isoCode}>
											{item.name}
										</option>
									))}
							</select>
						</div>

						{country && (
							<div>
								<TransferWithinAStationIcon />

								<select
									required
									value={state}
									onChange={(e) => setState(e.target.value)}
								>
									<option value="">State</option>
									{State &&
										State.getStatesOfCountry(country).map((item) => (
											<option key={item.isoCode} value={item.isoCode}>
												{item.name}
											</option>
										))}
								</select>
							</div>
						)}

						<input
							type="submit"
							value="Continue"
							className="shippingBtn"
							disabled={state ? false : true}
						/>
					</ShippingForm>
				</ShippingBox>
			</ShippingContainer>
		</>
	);
};

export default Shipping;

const ShippingContainer = styled.div`
	padding-top: 5vh;
	width: 100vw;
	max-width: 100%;
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media all and (max-width: 800px) {
		height: 70vh;
	}
`;
const ShippingBox = styled.div`
	height: 90%;
	padding-top: 2vh;
	width: 25vw;
	overflow: hidden;
	box-sizing: border-box;
	box-shadow: 1pc 1pc 3pc gray;
	@media all and (max-width: 800px) {
		width: 80%;
	}
`;
const ShippingHeading = styled.h2`
	height: 4vh;
	text-align: center;
	color: rgba(0, 0, 0, 0.664);
	width: 50%;
	margin: auto;
	font: 400 1.3vmax "Roboto";
	border-bottom: 1px solid rgba(0, 0, 0, 0.205);
`;
const ShippingForm = styled.form`
	display: flex;
	align-items: center;
	margin: auto;
	padding: 2vmax;
	justify-content: space-evenly;
	height: 90%;
	transition: all 0.5s;
	gap: 1rem;
	flex-direction: column;

	.shippingBtn {
		border: none;
		background-color: rgba(199, 89, 10, 0.7);
		color: white;
		border-radius: 5px;
		cursor: pointer;
		height: 5vh;
		outline: none;
		width: 70%;
		transition: all 0.5s;
		&:hover {
			box-shadow: 1px 1px 4px gray;
			transform: scale(1.01);
			background-color: rgba(199, 89, 10, 0.9);
		}
	}

	div {
		display: flex;
		width: 100%;
		align-items: center;
		input,
		select {
			padding: 1vmax 4vmax;
			padding-right: 1vmax;
			width: 100%;
			box-sizing: border-box;
			border: 1px solid rgba(0, 0, 0, 0.267);
			border-radius: 4px;
			font: 300 0.9vmax curasive;
			outline: none;
		}

		svg {
			position: absolute;
			transform: translateX(1vmax);
			font-size: 1.6vmax;
			color: rgba(0, 0, 0, 0.623);
		}
	}
`;
