import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";

export default function FooterComponent(props) {

	const navigate = useNavigate();
	const containerStyle = {
		backgroundColor: "#f5f5f5",
		minHeight: "15vh",
        zIndex: "3",
        borderTop: "1px solid rgb(124,126,129, 0.3)",
        position: "relative"
	};

	return (
		<div
			className="container-fluid p-5 mt-5 mt-sm-5 mt-md-0"
			style={containerStyle}
		>
			<div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 mb-5 mb-sm-5 mb-md-0">
                        <span className="footer-brand" onClick={() => navigate("/")}>
                            <span className="fw-bold fs-5 text-secondary">E-SHOP</span>
                            <span className="lead ms-1 fs-5 text-secondary">| Furniture</span>
                        </span>
                        <p className="text-muted lead pt-1 mt-5" style={{fontSize: "0.75rem"}}><span className="fw-bold">© 2022 E-SHOP</span> | Furniture - All rights reserved.</p>
                    </div>
                    <div className="col-4 col-sm-4 col-md-2">
                        <div className="row">
                            <h1 className="fw-bold fs-6">Products</h1>
                            <a href="#" className="mt-1 text-secondary">Livingroom</a>
                            <a href="#" className="mt-1 text-secondary">Bedroom</a>
                            <a href="#" className="mt-1 text-secondary">Kitchen</a>
                        </div>
                    </div>
                    <div className="col-4 col-sm-4 col-md-2">
                        <div className="row">
                            <h1 className="fw-bold fs-6">Company</h1>
                            <a href="#" className="mt-1 text-secondary">About Us</a>
                            <a href="#" className="mt-1 text-secondary">Career</a>
                        </div>
                    </div>
                    <div className="col-4 col-sm-4 col-md-2">
                        <div>
                            <h1 className="fw-bold fs-6 mb-2">Follow Us:</h1>
                            <div className="mt-3">
                                <a href="#" ><AiOutlineFacebook className="d-inline me-2 text-secondary" size={25}/></a>
                                <a href="#" ><AiOutlineInstagram className="d-inline me-2 text-secondary" size={25}/></a>
                                <a href="#" ><AiOutlineTwitter className="d-inline me-2 text-secondary" size={25}/></a>
                            </div>
                        </div>
                    </div>
                </div>
				
			</div>
		</div>
	);
}
