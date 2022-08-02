import "./App.css";
import { useEffect, useState } from "react";
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import FooterComponent from "./Components/Footer";
import ProductsPage from "./Pages/ProductsPage";
import UserProduct from "./Pages/UserProducts";
import LoginPage from "./Pages/LoginPage";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./actions/userAction";
import ProductDetails from "./Pages/ProductDetails";
import { Loader } from "@mantine/core";
import NotFoundPage from "./Pages/NotFoundPage";
import CartPage from "./Pages/CartPage";
import InvoicePage from "./Pages/TransactionPage";
import { API_URL } from "./helper";

export default function App() {
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();

	const keepLogin = () => {
		let eshopLog = localStorage.getItem("eshopLog");
		// console.log(eshopLog)
		if (eshopLog) {
			Axios.get(`${API_URL}/auth/keep`, {
				headers: {
					'Authorization': `Bearer ${eshopLog}`
				}
			})
				.then((res) => {
					if (res.data.token) {
						localStorage.setItem("eshopLog", res.data.token);
						delete res.data.token;
						dispatch(loginAction(res.data));
						setTimeout(() => {
							setIsLoading(false);
						}, 500);
					}
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
				});
		} else setIsLoading(false);
	};

	const user = useSelector((state) => {
		return {
			id: state.userReducer.id,
			role: state.userReducer.role,
			cart: state.userReducer.cart,
		};
	});

	useEffect(() => {
		keepLogin();
	}, []);

	if (isLoading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ width: "100vw", height: "100vh" }}
			>
				<Loader className="m-auto justify" color="gray" size="xl" variant="bars" />
			</div>
		);
	}

	return (
		// React router dom: untuk memanage setiap page
		<div>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				{user.role ? null : (
					<>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
					</>
				)}
				{user.role === "Admin" && (
					<>
						<Route path="/products/admin" element={<ProductsPage />} />
					</>
				)}
				<Route path="/products/user" element={<UserProduct />} />
				<Route path="/product" element={<ProductDetails />} />
				<Route path="/user/cart" element={<CartPage />} />
				<Route path="/transaction" element={<InvoicePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<FooterComponent />
		</div>
	);
}
