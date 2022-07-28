import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@chakra-ui/react";
import NavbarComponent from "../Components/Navbar";
import { loginAction } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { API_URL } from "../helper";

export default function LoginPage(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const bgContent = {
		backgroundColor: "#f5f5f5",
		maxHeight: "85%",
		margin: "2vw",
	};

	const imgStyle = {
		backgroundImage: `url("https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1656642129288_4_1.jpeg")`,
		backgroundImageSize: "cover",
		width: "100%",
	};

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [passwordType, setPasswordType] = useState("password");

	const handlepasswordType = () => {
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	const toast = useToast();

	const onLogin = () => {
		Axios.post(`${API_URL}/auth/login`, {inputEmail, inputPassword})
			.then((res) => {
				console.log(res)
				localStorage.setItem("eshopLog", res.data.idusers);
				dispatch(loginAction(res.data));
				// biar gabisa balik lagi ke page sebelumnya
				navigate("/", { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div style={{ height: "85vh" }}>
			<NavbarComponent theme={"dark"} />
			<div className="d-block justify-content-center">
				{/* <img src={require("../Pages/image.jpeg")} style={heroImage} alt="backgroundImage"/> */}
				<div className="container card border-0" style={{ marginTop: "15vh" }}>
					<div className="row rounded" style={bgContent}>
						<div
							className="col-sm-12 col-md-12 col-lg-8 d-md-block p-5"
							style={{ margin: "auto" }}
						>
							{/* <h5 className="text-primary fw-bold fs-4 mt-3 ">Zoho.</h5> */}
							<img
								src={
									"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1610955834__0.jpeg"
								}
								style={imgStyle}
								className="rounded"
								alt="contentImage"
							/>
						</div>
						<div
							className="col-sm-12 col-md-12 col-lg-4 p-5 rounded"
							style={{ backgroundColor: "white", border: "20px solid #f5f5f5" }}
						>
							{/* <h6 className="text-secondary fw-bold fs-sm-1 fs-md-2 my-2">START FOR FREE</h6> */}
							<h2 className="fw-bold fs-3">Sign in to Zoho.</h2>
							<h6 className="pt-2 text-secondary text-start">
								Not a member yet?
								<span>
									<a className="text-secondary text-decoration-none fw-bold" 
										onClick={() => navigate("/register", { replace: true })}>
										{" " + "Sign up"}
									</a>
								</span>
							</h6>

							<div className="form-group pt-md-4">
								<label className="text-muted fw-bold text-secondary">E-mail</label>
								<input
									className="form-control"
									placeholder="johndoe@mail.com"
									type="email"
									onChange={(email) => setInputEmail(email.target.value)}
								/>
								<br />
								<label className="text-muted fw-bold text-secondary">Password</label>
								<div className="form-control input-group">
									<input
										className="form-control input-group-append border-0"
										placeholder="6+ characters"
										type={passwordType}
										onChange={(password) => setInputPassword(password.target.value)}
									/>
									<span
										className="input-group-append border-0 bg-transparent pt-2"
										onClick={() => {
											handlepasswordType();
										}}
									>
										{passwordType === "password" ? (
											<AiOutlineEyeInvisible />
										) : (
											<AiOutlineEye />
										)}
									</span>
								</div>
								<small className="text-muted ms-1 mt-2 mb-3">Forgot password?</small>
								<br />
								<button
									type="button"
									className="btn btn-secondary mt-3"
									style={{ width: "100%" }}
									onClick={() => {
										onLogin();
									}}
								>
									Sign in
								</button>
								<p className="text-center text-secondary mt-1">or</p>
								<button
									type="button"
									className="btn text-secondary bg-light"
									style={{ width: "100%" }}
								>
									<FcGoogle className="d-inline me-3" />
									<span className="d-inline">Sign in with Google</span>
								</button>
							</div>
							<div className="row">
								<div className="col-12"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
