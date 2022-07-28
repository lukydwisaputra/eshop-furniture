import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import NavbarComponent from "../Components/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "@mantine/core";

const ProductDetails = () => {
	// increment decrement min.1 max jumlah stock
	// click buy langsung ke page cart
	

	let eshopLog = localStorage.getItem("eshopLog");

	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [index, setIndex] = useState(-1);

	const navigate = useNavigate();

	let { state } = useLocation();
	const { id, name, images, description, brand, stock, price, category } = data;

	// console.log('state', state)
	// console.log(useLocation())

	const user = useSelector((state) => {
		return {
			cart: state.userReducer.cart,
		};
	});

	const getData = () => {
		Axios.get(`http://localhost:2022/products?id=${state.id}`)
			.then((res) => {
				const idx = user.cart.map((val) => val.product.name).indexOf(name);
				setData(res.data[0]);
				setTimeout(() => {
					setIsLoading(false);
				}, 250);

				setIndex(idx);
				if (index && user.cart.length) {
					setQuantity(user.cart[idx].quantity);
					// console.log(user.cart[idx].quantity)
				}
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getData();
		printData();
	}, []);

	const printData = () => {
		if (!isLoading) {
			return (
				<div style={{ width: "100vw", minHeight: "85vh" }}>
					<NavbarComponent theme={"dark"} />
					<div className="d-block justify-content-center">
						{/* <img src={require("../Pages/image.jpeg")} style={heroImage} alt="backgroundImage"/> */}
						<div className="container px-5" style={{ marginTop: "15vh" }}>
							<div className="row rounded my-5">
								<div className="row">
									<div className="col-12 col-sm-12 col-md-12 col-lg-6">
										<img
											style={{ width: "100%" }}
											className="m-auto mt-md-5 mt-lg-0"
											src={images}
											alt="productName"
										/>
									</div>
									<div className="col-12 col-sm-12 col-md-12 col-lg-6 m-auto">
										<h1 className="featurette-heading fs-3 fw-bold mb-2">
											{name}
											<span className="text-muted"> | {category}</span>
										</h1>
										<p
											className="lead fs-5 fw-bold mb-5"
											style={{ textAlign: "justify", maxWidth: "500px" }}
										>
											Rp. {parseInt(price).toLocaleString("id")}
										</p>
										<h1 className="featurette-heading fs-6 fw-bold mb-2">
											Product Description
										</h1>
										<p
											className="lead fs-6 mb-4"
											style={{ textAlign: "justify", maxWidth: "500px" }}
										>
											{description}
										</p>
										<p
											className="lead fs-6 mb-2"
											style={{ textAlign: "justify", maxWidth: "500px" }}
										>
											<span className="fw-bold">Brand</span> : {brand}
										</p>
										<p
											className="lead fs-6 mb-5"
											style={{ textAlign: "justify", maxWidth: "500px" }}
										>
											<span className="fw-bold">Stock</span> : {stock}
										</p>
										<div className=" mb-5">
											<button
												className="btn btn-sm btn-outline-dark"
												onClick={() => {
													// decr();
													if (quantity > 1) {
														setQuantity(quantity - 1);
													}
												}}
											>
												{" "}
												-
											</button>

											<p className="d-inline mx-2">{quantity}</p>

											<button
												className="btn btn-sm btn-outline-dark"
												onClick={() => {
													// incr();
													if (quantity < stock) {
														setQuantity(quantity + 1);
													}
												}}
											>
												{" "}
												+
											</button>
										</div>
										<button
											className="btn btn-secondary d-inline fw-bold"
											onClick={() => {
												Axios.get(`http://localhost:2022/users?id=${eshopLog}`)
													.then((res) => {
														const index = res.data[0].cart
															.map((val) => val.product.name)
															.indexOf(name);

														if (index === -1) {
															// console.log("index", index);
															// masukin array baru
															const currentData = res.data[0].cart;
															const newData = [
																...currentData,
																{ product: data, quantity: quantity },
															];
															// console.log(newData);

															Axios.patch(
																`http://localhost:2022/users/${eshopLog}`,
																{ cart: newData }
															)
																.then((response) => {
																	// console.log(response);
																	navigate(`/user/cart?id=${eshopLog}`, {
																		state: response.data,
																	});
																})
																.catch((err) => console.log(err));
														} else {
															// tambahkan quantity saja
															// console.log("index", index);
															let onCartQuantity = res.data[0].cart[index].quantity;
															let newQuantity =
																onCartQuantity + quantity > stock
																	? stock
																	: onCartQuantity + quantity;
															// console.log(newQuantity);

															let currentData = res.data[0].cart;
															currentData.splice(index, 1, {
																product: data,
																quantity: newQuantity,
															});
															let newData = [...currentData];
															// console.log(newData);

															Axios.patch(
																`http://localhost:2022/users/${eshopLog}`,
																{ cart: newData }
															)
																.then((response) => {
																	// console.log(response);
																	navigate(`/user/cart?id=${eshopLog}`, {
																		state: response.data,
																	});
																})
																.catch((err) => console.log(err));
														}
													})
													.catch((err) => console.log(err));
											}}
										>
											Buy Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ width: "100vw", height: "100vh" }}
				>
					<Loader className="m-auto justify" color="gray" size="xl" variant="bars" />
				</div>
			);
		}
	};

	return <>{printData()}</>;
};

export default ProductDetails;
