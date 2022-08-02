import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mantine/core";
import Axios from "axios";
import {
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Portal,
	Avatar,
	AvatarBadge,
	useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

// useDispatch menyimpan data, useSelector mengambil data
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutAction } from "../actions/userAction";
import { API_URL } from "../helper";

export default function NavbarComponent(props) {
	// loading navbar
	// user -> cart profile -> signout
	// transaction management -> product management -> signout

	// tampung ke variable untuk memudahkan pembacaan
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const eshopLog = localStorage.getItem("eshopLog");
	const { pathname } = useLocation();

	const [cartAmount, setCartAmount] = useState(0);

	let { idusers, username, email, status, role, cart } = useSelector((state) => {
		return {
			idusers: state.userReducer.idusers,
			username: state.userReducer.username,
			status: state.userReducer.status,
			// status: "verified",
			role: state.userReducer.role,
			email: state.userReducer.email,
			cart: state.userReducer.cart,
		};
	});

	const getData = () => {
		Axios.get(`${API_URL}/auth/all`)
			.then((res) => {
				// let index = res.data.findIndex(val => val.idusers === eshopLog)
				// cart = res.data[index].cart;
				// console.log(cart)
				localStorage.setItem('cart', cart.length);
				setCartAmount(cart);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	const navbarStyle = {
		width: "100vw",
		height: "5vh",
		position: "absolute",
		zIndex: "2",
	};

	const onLogout = () => {
		localStorage.setItem("eshopLog", "");

		dispatch(logoutAction());
		// biar gabisa balik lagi ke page sebelumnya
		navigate("/", { replace: true });
	};

	const handleRole = (username, status) => {
		let result =
			role === "user" ? (
				<Menu>
					<MenuButton as={Button} className="bg-transparent">
						<Avatar size={"sm"} name={username}></Avatar>
					</MenuButton>
					<Portal>
						<MenuList>
							<Badge
								variant="outline"
								className={
									status === "verified"
										? "d-flex mx-3 text-success"
										: "d-flex mx-3 text-red"
								}
								color={status === "verified" ? "teal" : "red"}
							>
								{status === "verified" ? `Welcome, ${username}!` : "verify your email"}
							</Badge>

							<MenuDivider />
							{pathname !== '/user/cart' && 
								<MenuItem
									className="lead text-muted fs-6"
									onClick={() => navigate(`/user/cart?id=${idusers}`)}
								>
									Cart
									<span className="d-flex float-end">
										<Badge
											variant="outline"
											className={"d-flex mx-3 text-red float end"}
											color={"black"}
										>
											{localStorage.getItem('cart')}
										</Badge>
									</span>
								</MenuItem>
							}

							{
								pathname !== '/transaction' && 
								<MenuItem
									className="lead text-muted fs-6"
									onClick={() => {
										Axios.get(`http://localhost:2022/transaction?user_id=${idusers}`)
											.then((res) => {
												// console.log(res.data);
												if (res.data.length > 0) {
													navigate(`/transaction?user_id=${idusers}`);
												} else if (res.data.length < 1) {
													toast({
														title: "NO TRANSACTION FOUND",
														description: `You don't have any transaction yet!`,
														status: "error",
														duration: 3000,
														isClosable: true,
														position: "top",
													});
												}
											})
											.catch((err) => console.log(err));
									}}
								>
									Transaction
								</MenuItem>
							}
							<MenuItem
								className="lead text-muted fs-6"
								// onClick={() => }
							>
								Profile
							</MenuItem>
							<MenuDivider />
							<MenuItem
								className="fw-bold text-dark"
								onClick={() => {
									onLogout();
									navigate("/", { replace: true });
								}}
							>
								Sign out
							</MenuItem>
						</MenuList>
					</Portal>
				</Menu>
			) : (
				<Menu>
					<MenuButton as={Button} className="bg-transparent">
						<Avatar size={"sm"} name={username}></Avatar>
					</MenuButton>
					<Portal>
						<MenuList>
							<Badge
								variant="outline"
								className={
									status === "VERIFIED"
										? "d-flex mx-3 text-success"
										: "d-flex mx-3 text-red"
								}
								color={status === "VERIFIED" ? "teal" : "red"}
							>
								{status === "VERIFIED" ? `Welcome, ${username}!` : "verify your email"}
							</Badge>

							<MenuDivider />
							<MenuItem
								className="lead text-muted fs-6"
								onClick={() => navigate("/products/admin")}
							>
								Product Management
							</MenuItem>
							<MenuItem
								className="lead text-muted fs-6"
								// onClick={() => }
							>
								Transaction Management
							</MenuItem>
							<MenuDivider />
							<MenuItem
								className="fw-bold text-dark"
								onClick={() => {
									onLogout();
									navigate("/", { replace: true });
								}}
							>
								Sign out
							</MenuItem>
						</MenuList>
					</Portal>
				</Menu>
			);

		return result;
	};

	if (props.theme === "light") {
		return (
			<div className="navbar navbar-expand-lg navbar-dark shadow-5-strong" style={navbarStyle}>
				<div className="container">
					<span className="navbar-brand" onClick={() => navigate("/")}>
						<span className="fw-bold text-white">E-SHOP</span>
						<span className="lead ms-1 text-white">| Furniture</span>
					</span>

					<button
						className="navbar-toggler"
						type="button"
						aria-controls="eshopNavbar"
						aria-label="Toggle Navigation"
						data-bs-target="#eshopNavbar"
						data-bs-toggle="collapse"
						aria-expanded="false"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse text-white" id="eshopNavbar">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li>
								<span
									className="nav-link text-white"
									onClick={() => navigate("/products/user")}
								>
									Product
								</span>
							</li>
						</ul>
						{!eshopLog ? (
							<div className="d-flex">
								<div className="btn-group">
									<button
										className="btn btn-light text-dark"
										onClick={() => navigate("/login")}
									>
										Sign In
									</button>
									<button
										className="btn btn-dark"
										type="button"
										onClick={() => navigate("/register")}
									>
										Sign Up
									</button>
								</div>
							</div>
						) : (
							handleRole(username, status)
						)}
					</div>
				</div>
			</div>
		);
	} else if (props.theme === "dark") {
		return (
			<div className="navbar navbar-expand-lg navbar-light shadow-5-strong" style={navbarStyle}>
				<div className="container">
					<span className="navbar-brand" onClick={() => navigate("/")}>
						<span className="fw-bold text-dark">E-SHOP</span>
						<span className="lead ms-1 text-dark">| Furniture</span>
					</span>

					<button
						className="navbar-toggler"
						type="button"
						aria-controls="eshopNavbar"
						// aria-label='Toggle Navigation'
						data-bs-target="#eshopNavbar"
						data-bs-toggle="collapse"
						aria-expanded="false"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse text-white" id="eshopNavbar">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li>
								<span
									className="nav-link text-dark"
									onClick={() => navigate("/products/user")}
								>
									Product
								</span>
							</li>
						</ul>
						{!username ? (
							<div className="d-flex">
								<div className="btn-group">
									<button
										className="btn btn-light text-dark"
										onClick={() => navigate("/login")}
									>
										Sign In
									</button>
									<button
										className="btn btn-dark"
										type="button"
										onClick={() => navigate("/register")}
									>
										Sign Up
									</button>
								</div>
							</div>
						) : (
							handleRole(username, status)
						)}
					</div>
				</div>
			</div>
		);
	}
}
