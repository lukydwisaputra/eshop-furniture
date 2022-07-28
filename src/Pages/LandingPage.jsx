import React from "react";
import poang from "../Pages/Poang.jpeg";
import burvik from "../Pages/Burvik.jpeg";
import NavbarComponent from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function LandingPage(props) {
	const navigate = useNavigate();

	const heroImage = {
		backgroundImage: `url(https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_15408651680.png)`,
		backgroundColor: "#f7f5e7",
		width: "100vw",
		height: "50vh",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		position: "relative",
		overflow: "hidden",
		backgroundColor: "rgb(15, 15, 15, 0.3)",
		backgroundBlendMode: "multiply"
	};

	return (
		<div>
			<NavbarComponent theme={'light'}/>
			<section>
				<div style={heroImage}>
					<div className="row">
						<div className="row" style={{ height: "25vh", padding: "0", margin: "0" }}></div>
						<div className="col-md-6 col-lg-7"></div>
						<div className="col-md-6 col-lg-5">
							<div
								id="myCarousel"
								className="carousel slide d-none d-sm-none d-md-block d-lg-block"
								data-bs-ride="carousel"
							>
								<div className="carousel-inner">
									<div className="carousel-item active" data-bs-interval="3000">
										<div
											style={{
												backgroundColor: "rgb(15, 15, 15, 0.5)",
												height: "200px",
												paddingTop: "0",
												paddingBottom: "0",
											}}
										></div>
										<div
											className="carousel-caption text-start mb-1"
											style={{ padding: "2%", margin: "0" }}
										>
											<h5 className="fs-4 mb-md-2 mb-lg-3 fw-bold">Explore our collection</h5>
											<p className="mb-2">
												Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
												non?
											</p>
											<p>
												<a className="btn btn-sm btn-warning fw-bold" onClick={() => navigate('/products/user')}>
													Start Shopping
												</a>
											</p>
										</div>
									</div>
									<div className="carousel-item" data-bs-interval="3000">
										<div
											style={{
												backgroundColor: "rgb(15, 15, 15, 0.5)",
												height: "200px",
												paddingTop: "0 !important",
												paddingBottom: "0 !important",
											}}
										></div>
										<div
											className="carousel-caption text-start mb-1"
											style={{ padding: "2%", margin: "0" }}
										>
											<h5 className="fs-4 mb-md-2 mb-lg-3 fw-bold">Latest offer</h5>
											<p className="mb-2">
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Deleniti, laudantium.
											</p>
											<p>
												<a className="btn btn-sm btn-light fw-bold" href="#">
													Learn More
												</a>
											</p>
										</div>
									</div>
								</div>
								<button
									className="carousel-control-prev"
									type="button"
									data-bs-target="#myCarousel"
									data-bs-slide="prev"
								>
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button
									className="carousel-control-next"
									type="button"
									data-bs-target="#myCarousel"
									data-bs-slide="next"
								>
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Carousel mobile */}
			<section>
				<div
					id="myCarouselMobile"
					className="carousel slide d-block d-sm-block d-md-none d-lg-none"
					data-bs-ride="carousel"
				>
					<div className="carousel-inner ">
						<div className="carousel-item active" data-bs-interval="3000">
							<div
								style={{
									backgroundColor: "rgb(15, 15, 15, 0.5)",
									height: "200px",
									paddingTop: "0",
									paddingBottom: "0",
								}}
							></div>
							<div
								className="carousel-caption text-center"
								style={{ padding: "2%", margin: "0" }}
							>
								<h5 className="fw-bold mb-2 fs-3">Explore our collection</h5>
								<p className="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, non?</p>
								<p>
									<a className="btn btn-sm btn-warning" onClick={() => navigate('/products/user')}>
										Start Shopping
									</a>
								</p>
							</div>
						</div>
						<div className="carousel-item" data-bs-interval="3000">
							<div
								style={{
									backgroundColor: "rgb(15, 15, 15, 0.5)",
									height: "200px",
									paddingTop: "0",
									paddingBottom: "0",
								}}
							></div>
							<div
								className="carousel-caption text-center"
								style={{ padding: "2%", margin: "0" }}
							>
								<h5 className="fw-bold mb-2 fs-3">Latest offer</h5>
								<p className="mb-3">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
									laudantium.
								</p>
								<p>
									<a className="btn btn-sm btn-light" href="#">
										Learn More
									</a>
								</p>
							</div>
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#myCarouselMobile"
						data-bs-slide="prev"
					>
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#myCarouselMobile"
						data-bs-slide="next"
					>
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</section>
			
			{/* content 1 */}
			<section>
				<div className="container">
					<div className="row m-5">
						<div className="col-12 col-sm-12 col-md-6 my-md-auto">
							<h1 className="featurette-heading fs-3 mb-4 fw-bold">
								POÄNG
								<span className="text-muted"> | Armchairs</span>
							</h1>
							<p className="lead fs-6" style={{ textAlign: "justify" }}>
								Polyester can be recycled multiple times, reducing our environmental
								footprint. All products containing recycled materials meet the same quality
								and safety demands as we have on all our products.
							</p>
						</div>

						<div className="col-12 col-sm-12 col-md-6 m-auto d-none d-sm-none d-md-none d-lg-block">
							<img className="my-4 m-auto" src={poang} width="50%" alt="product1"/>
						</div>
						<div className="col-12 col-sm-12 col-md-6 mx-auto d-block d-sm-block d-md-block d-lg-none">
							<img className="my-4" src={poang} width="100%" alt="product1"/>
						</div>
					</div>
				</div>
			</section>
			
			{/* content 2 */}
			<section>
				<div className="container" style={{marginTop: "-3rem",}}>
					<div className="row m-5">
						<div className="col-12 col-sm-12 col-md-6 mx-auto d-none d-sm-none d-md-none d-lg-block">
							<img className="my-4 m-auto" src={burvik} width="50%"/>
						</div>

						<div className="col-12 col-sm-12 col-md-6 my-md-auto">
							<h1 className="featurette-heading fs-3 mb-4 fw-bold">
								BURVIK
								<span className="text-muted"> | Coffee & Side Tables</span>
							</h1> 
							<p className="lead fs-6" style={{ textAlign: "justify" }}>
								By using a renewable material like wood in this product, we avoid using
								fossil or finite materials. We want to have a positive impact on the planet.
								That is why by 2030, we want all materials in our products to be recycled or
								renewable, and sourced in responsible ways.
							</p>
						</div>

						<div className="col-12 col-sm-12 col-md-6 mx-auto d-block d-sm-block d-md-block d-lg-none">
							<img className="my-4 m-auto" src={burvik} width="100%" alt="product2"/>
						</div>
					</div>
				</div>
			</section>
			
			{/* content 3 */}
			<section>
				<div className="container" style={{marginTop: "-3rem"}}>
					<div className="row m-5">
						<div className="col-12 col-sm-12 col-md-6 my-md-auto">
							<h1 className="featurette-heading fs-3 mb-4 fw-bold">
								TERJE
								<span className="text-muted"> | Dining Chairs</span>
							</h1>
							<p className="lead fs-6" style={{ textAlign: "justify" }}>
								By using a renewable material like wood in this product, we avoid using fossil or finite materials. We want to have a positive impact on the planet. That is why by 2030, we want all materials in our products to be recycled or renewable, and sourced in responsible ways.
							</p>
						</div>

						<div className="col-12 col-sm-12 col-md-6 m-auto d-none d-sm-none d-md-none d-lg-block">
							<img className="my-4 m-auto" src={"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/273/0727337_PE735609_S5.jpg"} width="50%" alt="product1"/>
						</div>
						<div className="col-12 col-sm-12 col-md-6 mx-auto d-block d-sm-block d-md-block d-lg-none">
							<img className="my-4 m-auto" src={"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/273/0727337_PE735609_S5.jpg"} width="100%" alt="product1"/>
						</div>
					</div>
				</div>
			</section>
			
		</div>
	);
}
