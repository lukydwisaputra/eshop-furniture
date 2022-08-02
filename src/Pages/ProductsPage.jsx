import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import NavbarComponent from "../Components/Navbar";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	ButtonGroup,
	Input,
	FormControl,
	FormLabel,
	useDisclosure,
	Textarea,
	Select,
	Image,
} from "@chakra-ui/react";

export default function ProductsPage() {
	const [data, setData] = useState([]);
	const [modalImage, setModalImage] = useState("");
	const [filterName, setFilterName] = useState("");
	const [filterBrand, setFilterBrand] = useState("");
	const [filterCategory, setFilterCategory] = useState("");
	const [productInput, setProductInput] = useState({});

	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = useRef(null);
	const finalRef = useRef(null);

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

	const tableHead = () => {
		return (
			<div className="container mt-2">
				<div className="row">
					<div className="col-1 ">
						<h1 className="fw-bold ms-2">NO.</h1>
					</div>
					<div className="col-2 ">
						<h1 className="fw-bold">PREVIEW</h1>
					</div>
					<div className="col-2 m-auto">
						<h1 className="fw-bold">NAME</h1>
					</div>
					<div className="col-1 m-auto">
						<h1 className="fw-bold">BRAND</h1>
					</div>
					<div className="col-2 m-auto">
						<h1 className="fw-bold">CATEGORY</h1>
					</div>
					<div className="col-2 m-auto">
						<h1 className="fw-bold">PRICE</h1>
					</div>
					<div className="col-2 m-auto">
						<h1 className="fw-bold">ACTION</h1>
					</div>
				</div>
				<hr className="mt-3" />
			</div>
		);
	};

	const modalAddProduct = () => {
		let temp = {};

		return (
			<div className="col-12 col-sm-12 col-md-2 mt-3 mt-md-5 mt-sm-3 mb-3 ">
				<Button
					className="float-md-end"
					colorScheme="blue"
					onClick={() => {
						onOpen();
						setProductInput({});
					}}
				>
					<AiOutlinePlus className="me-2" /> add
				</Button>
				<Modal
					initialFocusRef={initialRef}
					finalFocusRef={finalRef}
					isOpen={isOpen}
					onClose={() => {
						onClose();
						setModalImage("");
					}}
					size={"xl"}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>ADD PRODUCT</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={4}>
							<Image
								className=""
								style={{ width: "20vw" }}
								margin="auto"
								objectFit="cover"
								src={modalImage}
								fallbackSrc="https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI="
								alt="add-product"
							/>
							<FormControl mt={4}>
								<FormLabel>NAME</FormLabel>
								<Input
									type={"text"}
									placeholder="Product Name"
									onChange={(input) => {
										setProductInput({ ...productInput, name: input.target.value });
										// console.log(productInput)
									}}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>DESCRIPTION</FormLabel>
								<Textarea
									style={{ maxHeight: "100px" }}
									placeholder="Product Description"
									onChange={(input) => {
										setProductInput({ ...productInput, description: input.target.value });
										// console.log(productInput)
									}}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>BRAND</FormLabel>
								{/* <Input
                                    type={"text"}
                                    placeholder="Product Brand"
                                    onChange={(input) => {
                                        temp.brand = input.target.value;
                                    }}
                                /> */}
								<select
									className="form-control"
									onChange={(input) => {
										setProductInput({ ...productInput, brand: input.target.value });
										// console.log(productInput)
									}}
								>
									<option value="">Select Brand</option>
									<option value="IKEA">IKEA</option>
									<option value="ACE">ACE</option>
								</select>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>CATEGORY</FormLabel>
								{/* <Input
                                    type={"text"}
                                    placeholder="Product Category"
                                    onChange={(input) => {
                                        temp.category = input.target.value;
                                    }}
                                /> */}
								<select
									className="form-control"
									onChange={(input) => {
										setProductInput({ ...productInput, category: input.target.value });
										// console.log(productInput)
									}}
								>
									<option value="">Select Category</option>
									<option value="Dinings">Dinings</option>
									<option value="Livingroom">Livingroom</option>
								</select>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>PRICE</FormLabel>
								<Input
									type="number"
									placeholder="Product Price"
									onChange={(input) => {
										setProductInput({ ...productInput, price: input.target.value });
										// console.log(productInput)
									}}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>STOCK</FormLabel>
								<Input
									type="number"
									placeholder="Product Price"
									onChange={(input) => {
										setProductInput({ ...productInput, stock: input.target.value });
										// console.log(productInput)
									}}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>IMAGES</FormLabel>
								<Input
									type={"file"}
									placeholder="Image"
									onChange={(input) => {
										setProductInput({ ...productInput, images: input.target.files[0] });
										// console.log(productInput)
										setModalImage(input.target.value);
									}}
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={() => {
									let { name, brand, category, description, stock, price } = productInput;
									let formData = new FormData();
									formData.append(
										"data",
										JSON.stringify({ name, brand, category, description, stock, price })
									);
									formData.append("images", productInput.images);
									Axios.post("http://localhost:3232/products", formData)
										.then(() => {
											getData();
											printData();
											setModalImage("");
											onClose();
											setProductInput({});
										})
										.catch((error) => console.log(error));
								}}
							>
								Submit
							</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									temp = {};
									printData();
									setModalImage("");
									onClose();
									setProductInput({});
								}}
							>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</div>
		);
	};

	const printData = () => {
		return data.map((value, index) => {
			let keys = Math.floor(Math.random() * 1000);
			return (
				<div keys={keys} className="container mt-3">
					<div className="row">
						<div className="col-1 m-auto">
							<h1 className="ms-3">{index + 1}</h1>
						</div>
						<div className="col-2">
							<img
								src={
									value.images.includes("http")
										? value.images
										: `http://localhost:3232${value.images}`
								}
								alt="productName"
								width={"500px"}
							/>
						</div>
						<div className="col-2 m-auto">
							<h1 className="fw-regular">{value.name}</h1>
						</div>
						<div className="col-1 m-auto">
							<h1 className="fw-regular">{value.brand}</h1>
						</div>
						<div className="col-2 m-auto">
							<h1 className="fw-regular">{value.category}</h1>
						</div>
						<div className="col-2 m-auto">
							<h1 className="fw-regular">
								Rp. {parseInt(value.price).toLocaleString("id")}
							</h1>
						</div>
						<div className="col-2 m-auto">
							<ButtonGroup gap={0}>
								<Button colorScheme="yellow" onClick={() => {}}>
									<AiOutlineEdit />
								</Button>
								<Button
									colorScheme="red"
									onClick={() => {
										// console.log(value.idproducts)
										Axios.delete(`http://localhost:3232/products?id=${value.idproducts}`)
											.then(() => {
												getData();
												printData();
											})
											.catch((error) => console.log(error));
									}}
								>
									<AiOutlineDelete />
								</Button>
							</ButtonGroup>
						</div>
					</div>
					<hr className="mt-3" />
				</div>
			);
		});
	};

	const filterBar = () => {
		return (
			<>
				<div className="container card mb-3 p-4">
					<div className="row">
						<div className="col-12">
							<h1 className="fs-5 fw-bold text-secondary">FILTER</h1>
						</div>
					</div>
					<div className="row mb-1">
						<div className="col-4 col-sm-4 col-md-4 col-lg-3">
							<FormControl mt={4}>
								<Input
									id="filter-name"
									type={"text"}
									placeholder="Name"
									onChange={(input) => {
										setFilterName(input.target.value);
									}}
								/>
							</FormControl>
						</div>
						<div className="col-4 col-sm-4 col-md-4 col-lg-3">
							<FormControl mt={4}>
								<Select
									id="filter-brand"
									className="form-control"
									onChange={(input) => setFilterBrand(input.target.value)}
								>
									<option value="">Select Brand</option>
									<option value="IKEA">IKEA</option>
									<option value="ACE">ACE</option>
								</Select>
							</FormControl>
						</div>
						<div className="col-4 col-sm-4 col-md-4 col-lg-3">
							<FormControl mt={4}>
								<Select
									id="filter-category"
									className="form-control"
									onChange={(input) => setFilterCategory(input.target.value)}
								>
									<option value="">Select Category</option>
									<option value="Dinings">Dinings</option>
									<option value="Livingroom">Livingroom</option>
								</Select>
							</FormControl>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-3">
							<Button
								className="ms-0 ms-md-12 me-3 me-sm-3 me-md-3 me-lg-5"
								colorScheme="blue"
								onClick={() => {
									// format filter
									// http://localhost:2022/products?name=HANSOLA&id=1
									// filterName, filterBrand, filterCategory

									let name = filterName ? `name=${filterName}&` : "";
									let brand = filterBrand ? `brand=${filterBrand}&` : "";
									let category = filterCategory ? `category=${filterCategory}&` : "";
									// console.log(name);
									// console.log(brand);
									// console.log(category);

									Axios.get("http://localhost:3232/products?" + name + brand + category)
										.then((res) => {
											// console.log(res.data);
											// console.log(
											// 	"http://localhost:2022/products?" + name + brand + category
											// );
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
			</>
		);
	};

	return (
		<div style={{ width: "100vw", minHeight: "85vh" }}>
			<NavbarComponent theme={"dark"} />
			<div style={{ marginTop: "5vh" }}>
				<div className="container mb-5">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-10">
							<h1 className="fs-2 mt-5 mb-3">Manage your products</h1>
							<p className="text-muted">
								Prepare your product, so that customers can
								<span className="fw-bold text-primary">
									{" " + "transact more easily."}
								</span>
							</p>
						</div>
						{modalAddProduct()}
					</div>
				</div>

				<div>{filterBar()}</div>

				<div
					style={{
						minWidth: "700px",
						overflowX: "auto",
						overflowY: "hidden",
						whiteSpace: "nowrap",
						position: "relative",
						float: "none",
					}}
				>
					{tableHead()}
					{printData()}
				</div>
			</div>
		</div>
	);
}
