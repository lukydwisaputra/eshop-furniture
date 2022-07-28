import React, { useState, useEffect, useRef} from "react";
import NavbarComponent from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Badge } from "@mantine/core";
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
	Image
} from "@chakra-ui/react";

function TransactionPage() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
	const finalRef = useRef(null);
	let eshopLog = localStorage.getItem("eshopLog");

    const userId = localStorage.getItem('eshopLog');
    const { pathname, search } = useLocation();

    const [transactionList, setTransactionList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [selected, setSelected] = useState([])

    const getTransaction = async () => {
        try {
            let res = await axios.get(`http://localhost:2022${pathname}${search}`);
            let transaction = res.data.reverse();
            let txCount = transaction.length;
            
            setTransactionList(transaction);
            setCounter(txCount);
        } catch (error) {
            console.log(error)
        }
    }

    const cancelTransaction = async (index, id) => {
        try {
            let transaction;
            let cart;
            
            axios.get(`http://localhost:2022${pathname}${search}`)
            .then(_transaction => {
                transaction = _transaction.data[index];
                cart = transaction.order_items;
                // console.log('cart', cart)

                cart.forEach( async(value) => {
                    // value.product.stock = value.product.stock + value.quantity;
                    // console.log(value.product.stock)
                    axios.patch(`http://localhost:2022/products/${value.product.id}`, value.product)
                    .then(() => {
                        axios.delete(`http://localhost:2022/transaction/${id}`)
                        .then(() => getTransaction())
                        .catch ((err) => console.log(err))

                    }).catch((err) => console.log(err))
                })
            }).catch((err) => console.log(err))
        } catch (error) {console.log(error)}
    }

    useEffect(() => {
        getTransaction();
        printTransaction();
    }, [])

    const transactionDetails = (id, txDetails) => {
        let index = transactionList.findIndex((val) => val.id === id);
        // let {created}

        if ( id > 0) {
            let selectedTransaction = transactionList[index].order_items;
    
            return selectedTransaction.map((value, index) => {
                let product = value.product;
                return (
                    <div className="p-2" style={{ borderBottom: "1px solid rgb(124,126,129, 0.3)" }} key={product.id}>
                        <div className="row">
                            <div className="col-2 p-3">
                                <img
                                    src={product.images}
                                    alt="product"
                                />
                            </div>
                            <div
                                className="col-5 p-1 m-auto"
                                style={{ borderRight: "1px solid rgb(124,126,129, 0.3)" }}
                            >
                                <small className="fw-bold d-block">{product.name}</small>
                                <small className="text-secondary d-block">{value.quantity} x Rp. {(product.price).toLocaleString('id')}</small>
                            </div>
                            <div className="col-3 p-1 m-auto">
                                <div>
                                    <small className="fw-bold d-block text-secondary">Subtotal</small>
                                    <small className="fw-bold d-block text-dark">Rp. {(value.quantity * product.price).toLocaleString('id')}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    }

    const countAllItems = (order_items) => {
        let count = 0;
        if(order_items) {
            order_items.forEach(val => {
                count += val.quantity;
            })
        }
        return count;
    }

    const printTransaction = () => {
        return transactionList.map((value, index) => {
            let isAnotherItem = value.order_items.length - 1;
            let firstProduct = value.order_items[0].product;
            return ( 
                <div className="container card mb-3" key={value.id}>
                    <div className="row bg-secondary">
                        <div className="col-2">
                            <small className="fw-bold d-block text-white my-2">{value.created_date} | {value.created_time} </small>
                        </div>
                        <div className="col-8 m-auto">
                            <Badge className="float-end" size="xs" color="red">{value.status}</Badge>
                        </div>
                        <div className="col-2">
                            <small className=" fw-bold d-block text-white my-2">#INV-{value.id}-{value.user_id}</small>
                        </div>
                    </div>
                    <div className="p-3" style={{ borderBottom: "1px solid rgb(124,126,129, 0.3)" }}>
                        <div className="row">
                            <div className="col-1 p-3">
                                <img
                                    src={firstProduct.images}
                                    alt="product"
                                />
                            </div>
                            <div
                                className="col-8 p-3 m-auto"
                                style={{ borderRight: "1px solid rgb(124,126,129, 0.3)" }}
                            >
                                <small className="fw-bold d-block">{firstProduct.name}</small>
                                <small className="text-secondary d-block">{value.order_items[0].quantity} x Rp. {(firstProduct.price).toLocaleString('id')}</small>
                                <Button className={isAnotherItem ? "fw-regular text-secondary underline d-block mt-2" : "text-secondary d-none mt-2"} colorScheme='gray' size='xs' 
                                    onClick={() => {
                                        onOpen();
                                        setSelected(value);
                                    }} 
                                    variant='link'>+ {isAnotherItem} produk lainnya
                                </Button>
                            </div>
                            <div className="col-3 p-3 m-auto">
                                <div>
                                    <small className=" d-block text-secondary mb-3">Shipping : {value.shipping ? value.shipping.split("_") : 'free delivery'} - {value.shipping_cost !== 0 ?`Rp. ${(value.shipping_cost).toLocaleString('id')}` : 'free'}</small>
                                    <small className="fw-bold d-block text-secondary">Total Belanja</small>
                                    <small className="fw-bold d-block text-dark">Rp. {parseInt(value.total_purchase + value.shipping_cost).toLocaleString('id')}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-2">
                    <Button className="float-end me-3" colorScheme='teal' size='xs' 
                        onClick={() => {
                            onOpen();
                            setSelected(value);
                        }} 
                        variant='link'>Lihat Detail Product
                    </Button>
                    <Button className="float-end me-3" colorScheme='red' size='xs' 
                        onClick={() => {
                            cancelTransaction(index, value.id);
                        }} variant='link'>Batalkan Pesanan</Button>

                    <Modal size={'xl'} onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Detail Pesanan</ModalHeader>
                            <ModalCloseButton />
                            
                            <ModalBody>
                                <small className={selected.status === "UNPAID" ? "text-danger fw-bold d-block" : "text-success fw-bold"}>{selected.status}</small>
                                <div>
                                    <small className="fw-bold text-secondary">No. Invoice: </small>
                                    <small>#INV-{selected.id}-{selected.user_id}</small> 
                                </div>
                                <div>
                                    <small className="fw-bold text-secondary">Date: </small>
                                    <small>{selected.created_date} - {selected.created_time}</small> 
                                </div>
                                <hr className="mt-3" />
                                {transactionDetails(selected.id, value)}
                                <div className="row">
                                    <small className="fw-bold text-dark mt-3">Payment</small>
                                    <div className="col-6">
                                        <small>Total Price</small>
                                    </div>
                                    <div className="col-6 text-end">
                                        <small>Rp. {parseInt(selected.total_purchase).toLocaleString('id')}</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <small>Shipping</small>
                                    </div>
                                    <div className="col-6 text-end">
                                        <small>Rp. {parseInt(selected.shipping_cost).toLocaleString('id')}</small>
                                    </div>
                                </div>
                                <hr className="mt-1" style={{ borderRight: "1px solid rgb(124,126,129, 0.3)" }}/>
                                <div className="row">
                                    <div className="col-6">
                                        <small>Total Payment</small>
                                    </div>
                                    <div className="col-6 text-end">
                                        <small>Rp. {parseInt(selected.total_purchase + selected.shipping_cost).toLocaleString('id')}</small>
                                    </div>
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button size='xs' colorScheme='gray' onClick={onClose}>Confirm Payment</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    </div>
                </div>
            );
        })
    }


	return (
		<>
			<NavbarComponent theme={"dark"} />
			<div style={{ width: "100vw", minHeight: "85vh" }}>
				<div style={{ marginTop: "5vh" }}>
					<div className="container mb-4">
						<div className="row">
							<div className="col-12">
								<h1 className="fs-2 mt-5 mb-3">Transaction Page</h1>
								<p className="text-muted">
									Pay Transaction and
									<span className="fw-bold">{" get your product more easily."}</span>
								</p>
							</div>
						</div>
					</div>

                    {/* per transaction */}
                    {printTransaction()}
					
				</div>
			</div>
		</>
	);
}

export default TransactionPage;
