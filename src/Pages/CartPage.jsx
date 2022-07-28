import React, { useState, useEffect } from "react";
import NavbarComponent from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
	// id date invoice item keranjang subtotal status

	const [data, setData] = useState([]);
	const [user, setUser] = useState({});
	const [total, setTotal] = useState(0);
	const [shipping, setShipping] = useState(0);
	const [shippingoption, setShippingOption] = useState('')
	const [pay, setPay] = useState(0);
	let { state } = useLocation();

	let eshopLog = localStorage.getItem("eshopLog");
	const navigate = useNavigate();

	const getData = () => {
		Axios.get(`http://localhost:2022/users/${eshopLog}`)
			.then((res) => {
				setData(res.data.cart);
				setUser(res.data)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getTotalPurchase = () => {
		Axios.get(`http://localhost:2022/users/${eshopLog}`)
			.then((res) => {
				if (res.data.cart.length > 0) {
					let cart = res.data.cart;
					// console.log('CART', res.data.cart);
					let _total = 0;
					cart.forEach((value) => {
						_total += value.product.price * value.quantity;
					});
					// console.log('total', total)
					setTotal(_total);
				} else {
					setTotal(0);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getTotalPurchase();
		getData();
	}, []);

	const incr = (index, stock) => {
		Axios.get(`http://localhost:2022/users?id=${eshopLog}`)
			.then((res) => {
				let onCartQuantity = res.data[0].cart[index].quantity;
				let newQuantity = onCartQuantity + 1 > stock ? stock : onCartQuantity + 1;
				// console.log("stock", stock);

				let currentData = res.data[0].cart;
				currentData.splice(index, 1, { product: data[index], quantity: newQuantity });
				user.cart[index].quantity = newQuantity;
				// console.log(state);

				Axios.patch(`http://localhost:2022/users/${eshopLog}`, user)
					.then((response) => {
						// console.log(response);
						getTotalPurchase();
						getData();
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const decr = (index) => {
		Axios.get(`http://localhost:2022/users?id=${eshopLog}`)
			.then((res) => {
				let onCartQuantity = res.data[0].cart[index].quantity;
				let newQuantity = onCartQuantity - 1 < 1 ? 1 : onCartQuantity - 1;

				let currentData = res.data[0].cart;
				currentData.splice(index, 1, { product: data[index], quantity: newQuantity });
				user.cart[index].quantity = newQuantity;
				// console.log(state);

				Axios.patch(`http://localhost:2022/users/${eshopLog}`, user)
					.then((response) => {
						// console.log(response);
						getTotalPurchase();
						getData();
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const deleteCart = (index) => {
		Axios.get(`http://localhost:2022/users?id=${eshopLog}`)
			.then((res) => {
				user.cart.splice(index, 1);
				// console.log(state);

				Axios.patch(`http://localhost:2022/users/${eshopLog}`, user)
					.then((response) => {
						// console.log(response);
						getTotalPurchase();
						getData();
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const printData = () => {
		return data.map((value, index) => {
			let product = value.product;
			return (
				<div className="row mt-3" key={product.id}>
					<div className="row">
						<div className="col-5">
							<div className="row">
								<div className="col-4">
									<img src={product.images} alt="product" />
								</div>
								<div className="col-6">
									<div className="row mt-2">
										<small>
											{" "}
											<span className="fw-bold">{product.name}</span> | {product.brand}
										</small>
									</div>
									<div className="row">
										<small>Stock: {product.stock}</small>
									</div>
									<div className="row mt-3">
										<small className="text-secondary" onClick={() => deleteCart(index)}>
											remove
										</small>
									</div>
								</div>
							</div>
						</div>
						<div className="col-3 fw-bold m-auto">
							<button
								className="btn btn-sm fw-bold btn-outline-secondary"
								onClick={() => {
									decr(index);
								}}
							>
								{" "}
								-
							</button>

							<small className="d-inline mx-3">{value.quantity}</small>

							<button
								className="btn btn-sm fw-bold btn-outline-secondary"
								onClick={() => {
									incr(index, product.stock);
								}}
							>
								{" "}
								+
							</button>
						</div>
						<div className="col-2 fw-bold m-auto">
							<small>Rp. {parseInt(product.price).toLocaleString("id")}</small>
						</div>
						<div className="col-2 fw-bold m-auto">
							<small>
								Rp.{" "}
								{(parseInt(value.quantity) * parseInt(product.price)).toLocaleString("id")}
							</small>
						</div>
					</div>
					<hr className="my-3" />
				</div>
			);
		});
	};

	const updateStock = () => {
		Axios.get(`http://localhost:2022/users/${eshopLog}`)
			.then((res) => {
				let id = Math.floor(1000 + Math.random() * 9000); // 4 digits

				let monthString = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				];
				let date = new Date();

				let created_date = `${date.getDate()} ${
					monthString[date.getMonth()]
				} ${date.getFullYear()}`;
				let created_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

				let invoice = {
					id,
					user_id: res.data.id,
					order_items: res.data.cart,
					total_purchase: total,
					shipping: shippingoption,
					shipping_cost: shipping,
					created_date,
					created_time,
					status: "UNPAID",
				};

				// console.log(invoice);

				Axios.post(`http://localhost:2022/transaction`, invoice)
					.then((response) => {
						// console.log(response);
						getTotalPurchase();
						getData();
					})
					.catch((err) => console.log(err));

				data.forEach((value, index) => {
					Axios.get(`http://localhost:2022/products/${value.product.id}`)
						.then((response) => {
							let product = response.data; // db product
							let quantity = value.quantity; // cart qty
							product.stock = product.stock - quantity;

							Axios.patch(`http://localhost:2022/products/${value.product.id}`, product)
								.then((response) => {
									// console.log(response);
									getTotalPurchase();
									getData();
								})
								.catch((err) => console.log(err));

							getTotalPurchase();
							getData();
						})
						.catch((err) => console.log(err));
				});

				user.cart = [];
				Axios.patch(`http://localhost:2022/users/${eshopLog}`, user)
					.then((response) => {
						// console.log(response);
						getTotalPurchase();
						getData();
					})
					.catch((err) => console.log(err));

				navigate(`/transaction?user_id=${res.data.id}`, { state: invoice });
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<NavbarComponent theme={"dark"} />
			<div className="container" style={{ width: "100vw", minHeight: "85vh" }}>
				<div className="row" style={{ marginTop: "10vh" }}>
					<div className="col-12 col-sm-12 col-md-12 col-lg-8">
						<h1 className="featurette-heading fs-5 fw-bold mb-2 pt-4">
							Shopping Cart
							<span className="d-flex float-end"> {data.length} Items</span>
						</h1>
						<hr className="mb-3" />

						<div className="row">
							<div className="row">
								<div className="col-5 fw-bold text-secondary">
									<small>PRODUCT DETAILS</small>
								</div>
								<div className="col-3 fw-bold text-secondary">
									<small>QUANTITY</small>
								</div>
								<div className="col-2 fw-bold text-secondary">
									<small>PRICE</small>
								</div>
								<div className="col-2 fw-bold text-secondary">
									<small>TOTAL</small>
								</div>
							</div>
						</div>
						<hr className="mt-3" />

						{printData()}
					</div>
					<div className="col-12 col-sm-12 col-md-12 col-lg-4">
						<div className="form-group p-4 m-auto card" style={{ maxWidth: "350px" }}>
							<h1 className="featurette-heading fs-5 fw-bold mb-2">Order Summary</h1>
							<hr />
							<small className="mt-4 mb-2 fw-bold">
								ITEMS: {data.length}
								<span className="d-flex float-end">
									Rp. {total ? total.toLocaleString("id") : total},-
								</span>
							</small>
							<small className="text-muted fw-bold text-secondary mt-3 mb-1">SHIPPING</small>
							<select
								className="form-select"
								aria-label="Default select example"
								defaultValue={0.05 * total}
								onChange={(e) => {
									let selected = e.target.value;
									if(selected === 'regular') {
										setShipping(0.05 * total);
										setShippingOption('regular')
										setPay(total + shipping)
									} else if (selected === 'next_day') {
										setShipping(0.075 * total);
										setShippingOption('next_day')
										setPay(total + shipping)
									} else if (selected === 'same_day') {
										setShipping(0.1 * total);
										setShippingOption('same_day')
										setPay(total + shipping)
									} else {
										setShipping(0);
									}
								}}
							>
								<option value={null}>Choose Delivery Option</option>
								<option value={'regular'}>Regular - Rp. {(0.05 * total).toLocaleString("id")},-</option>
								<option value={'next_day'}>Next Day - Rp.  {(0.075 * total).toLocaleString("id")},-</option>
								<option value={'same_day'}>Same Day - Rp. {(0.1 * total).toLocaleString("id")},-</option>
							</select>
							<br />
							<small className="text-muted fw-bold text-secondary mt-3 mb-1">
								PROMO CODE
							</small>
							<input className="form-control" placeholder="Enter promo code" type="text" />
							<button className="btn btn-sm btn-secondary mt-2 mb-4" style={{ width: "75px" }}>
								<small className="fw-bold">APPLY</small>
							</button>
							<hr />
							<small className="mt-4 mb-2 fw-bold">
								TOTAL COST:
								<span className="d-flex float-end fw-bold">
									Rp. {total ? (total + shipping).toLocaleString("id") : 0} ,-
								</span>
							</small>
							<button
								type="button"
								className="btn btn-sm btn-dark mt-3"
								style={{ width: "100%" }}
								onClick={() => {
									updateStock();
								}}
							>
								CHECKOUT
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CartPage;
