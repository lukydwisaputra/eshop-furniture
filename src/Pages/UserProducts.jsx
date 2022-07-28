import React, { useState, useEffect, useId } from "react";
import Axios from "axios";
import NavbarComponent from "../Components/Navbar";
import { Button, Input, FormControl, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productAction } from "../actions/productAction";

function UserProduct() {
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState({});

	const id = useId();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getData = () => {
		Axios.get("http://localhost:3232/products")
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	const productDetails = (productId) => {
		Axios.get(`http://localhost:2022/products/${productId}`)
			.then((res) => {
				localStorage.setItem("productDetails", res.data.id);
				dispatch(productAction(res.data));
			})
			.catch((err) => {
				console.og(err);
			});
	};

	const printData = () => {
		return data.map((value, index) => {
			return (
				<div className="col-6 col-sm-6 col-md-6 col-lg-4 mt-3" key={`${id}-${value.name}`}>
					<a
						className="container card"
						style={{ height: "100%" }}
						onClick={() => {
							productDetails(value.id);
							navigate(`/product?id=${value.id}`, {state: value});
							// window.open(`/product/${value.name}`);
						}}
					>
						<img
							style={{
								width: "100%",
								margin: "auto",
								borderBottom: "1px solid rgb(124,126,129, 0.3)",
							}}
							className="p-5"
							src={value.images}
							alt={value.name + "-image"}
						/>
						<div className="col-12 mb-3 text-center mt-3">
							<h1 className="fs-6 fw-bold text-secondary p-1">{value.name}</h1>
							<p className="fs-6 text-secondary p-1">
								Rp. {parseInt(value.price).toLocaleString("id")}
							</p>
						</div>
					</a>
				</div>
			);
		});
	};

	const productCard = () => {
		return (
			<>
				<div className="col-12 col-sm-12 col-md-12 col-lg-9">
					<div className="row">{printData()}</div>
				</div>
			</>
		);
	};

	const filterBox = () => {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-3">
						<div
							className="container card bg-light rounded mb-3"
							style={{ maxWidth: "300px" }}
						>
							<h1 className="fw-bold text-secondary mt-4 fs-md-5 ms-1">FILTER</h1>
							<FormControl mt={4}>
								<Input
									id="filter-name"
									type={"text"}
									placeholder="Name"
									className="bg-light mb-2"
									onChange={(input) =>
										setFilterData({ ...filterData, name: input.target.value })
									}
								/>
							</FormControl>
							<FormControl mt={4}>
								<Select
									id="filter-brand"
									className="bg-light mb-2"
									onChange={(input) =>
										setFilterData({ ...filterData, brand: input.target.value })
									}
								>
									<option value="">Select Brand</option>
									<option value="IKEA">IKEA</option>
									<option value="ACE">ACE</option>
								</Select>
							</FormControl>
							<FormControl mt={4}>
								<Select
									id="filter-category"
									className="bg-light mb-2"
									onChange={(input) =>
										setFilterData({ ...filterData, category: input.target.value })
									}
								>
									<option value="">Select Category</option>
									<option value="Dinings">Dinings</option>
									<option value="Livingroom">Livingroom</option>
								</Select>
							</FormControl>
							<div className="row">
								<div className="col-6">
									<FormControl mt={4}>
										<Input
											id="filter-name"
											type={"number"}
											placeholder="Min. Price"
											className="bg-light mb-2"
											onChange={(input) =>
												setFilterData({ ...filterData, minimum: input.target.value })
											}
										/>
									</FormControl>
								</div>
								<div className="col-6">
									<FormControl mt={4}>
										<Input
											id="filter-name"
											type={"number"}
											placeholder="Max. Price"
											className="bg-light mb-2"
											onChange={(input) =>
												setFilterData({ ...filterData, maximum: input.target.value })
											}
										/>
									</FormControl>
								</div>
							</div>
							<div className="row text-center my-3">
								<div className="col-12">
									<Button
										variant="outline"
										className="ms-0 ms-md-12 me-3 me-sm-3 me-md-3 me-lg-5"
										colorScheme="blue"
										onClick={() => {
											let { name, brand, category, minimum, maximum } = filterData;

											name = name ? `name=${name}&` : "";
											brand = brand ? `brand=${brand}&` : "";
											category = category ? `category=${category}&` : "";
											minimum = minimum ? `price_gte=${minimum}&` : "";
											maximum = maximum ? `price_lte=${maximum}` : "";

											Axios.get(
												"http://localhost:2022/products?" +
													name +
													brand +
													category +
													minimum +
													maximum
											)
												.then((res) => {
													setData(null);
													setData(res.data);
													printData();
												})
												.catch((err) => {
													console.log(err);
												});
										}}
									>
										Filter
									</Button>
									<Button
										variant="outline"
										colorScheme="yellow"
										onClick={() => {
											getData();
											printData();
										}}
									>
										Reset
									</Button>
								</div>
							</div>
						</div>
					</div>

					{productCard()}
				</div>
			</div>
		);
	};

	return (
		<>
			<NavbarComponent theme={"dark"} />

			<div style={{ width: "100vw", minHeight: "85vh" }}>
				<div style={{ marginTop: "5vh" }}>
					<div className="container mb-4">
						<div className="row">
							<div className="col-12">
								<h1 className="fs-2 mt-5 mb-3">Our Arrival Products</h1>
								<p className="text-muted">
									Choose product and
									<span className="fw-bold">{" transact more easily."}</span>
								</p>
							</div>
						</div>
					</div>

					{filterBox()}
				</div>
			</div>
		</>
	);
}

export default UserProduct;
