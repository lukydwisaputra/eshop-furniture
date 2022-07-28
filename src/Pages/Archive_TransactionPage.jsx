import React, { useState, useEffect } from "react";
import NavbarComponent from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { Table } from "@mantine/core";

function InvoicePage() {
	const [data, setData] = useState({});
    const [cart, setCart] = useState([]);

	let eshopLog = localStorage.getItem("eshopLog");

	const getData = () => {
		Axios.get(`http://localhost:2022/transaction?user_id=${eshopLog}`)
			.then((res) => {
				setData(res.data[0]);
                setCart(res.data[0].order_items);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	const printData = () => {
        if (cart.length > 0) {
            return cart.map((value, index) => {
                return (
                    <tr key={`${index}-${value.product.name}`}>
                        <td>{index + 1}</td>
                        <td>
                            {data.created_date} - {data.created_time}
                        </td>
                        <td>{value.product.name}</td>
                        <td>{value.quantity}</td>
                        <td>Rp. {(value.product.price).toLocaleString('id')},-</td>
                        <td>Rp. {(value.product.price * value.quantity).toLocaleString('id')},-</td>
                    </tr>  
                )
            });
        }
	};

	return (
		<>
			<NavbarComponent theme={"dark"} />
			<div className="container mt-5" style={{ height: "85vh" }}>
				<div className="row">
					<div className="col-6">
						<h1 className="featurette-heading fs-5 fw-bold mb-3 pt-5">Transaction Details</h1>
					</div>
					<div className="col-6 mt-2">
						<h1 className="featurette-heading fs-6 fw-bold mb-2 pt-4 text-secondary text-end">
							<span className="text-dark">
								{" "}
								INV-{data.id}-{data.user_id}
							</span>
							<small className="text-right d-block mt-2 fw-regular">
								STATUS: <span className="text-danger"> {data.status} </span>
							</small>
						</h1>
					</div>
				</div>
				<main style={{ marginTop: "5vh" }}>
					<Table>
						<thead>
							<tr>
								<th>No.</th>
								<th>Date</th>
								<th>Item Name</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Subtotal</th>
							</tr>
						</thead>

						<tbody>{printData()}</tbody>
					</Table>
					<div className="container mt-5">
						<small className="fw-bold text-secondary">
							TOTAL PAYMENT:{" "}
							<span className="text-dark">
								{" "}
								Rp. {parseInt(data.total_purchase).toLocaleString('id')},-
							</span>
						</small>
					</div>
					<button className="btn btn-sm btn-dark mt-3 ms-2">confirm payment</button>
				</main>
			</div>
		</>
	);
}

export default InvoicePage;
