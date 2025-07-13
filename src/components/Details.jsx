import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "../utils/axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Details = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useContext(ProductContext);
	const [product, setProduct] = useState(null);
	const { id } = useParams();

	// const getSingleProduct = async () => {
	// 	try {
	// 		const { data } = await axios.get(`/products/${id}`);
	// 		setProduct(data);
	// 	} catch (error) {
	// 		console.error("Error fetching product details:", error);
	// 	}
	// };
	useEffect(() => {
		if (!product) {
			setProduct(products.filter((item) => item.id == id)[0]);
		}
		// fetchProducts();
	}, []);

	const productDeleteHandler = (id) => {
		const updatedProducts = products.filter((item) => item.id !== id);
		setProducts(updatedProducts);
		localStorage.setItem("products", JSON.stringify(updatedProducts));

		toast.success("Product deleted successfully!");
		navigate("/");
	};

	return product ? (
		<div className="w-full flex items-center justify-center">
			<div className="card lg:card-side bg-base-100 shadow-sm w-[80vw] h-[35vw] ">
				<figure className="w-2/3">
					<img
						className="w-full object-cover"
						src={`${product.image}`}
						alt="Album"
					/>
				</figure>
				<div className="card-body ">
					<div className="w-full flex justify-between">
						<h2 className="card-title">{`${product.title}`}</h2>
						<Link className="btn btn-outline btn-info btn-lg " to="/">
							Home
						</Link>
					</div>
					<h3 className="capitalize">{`${product.category}`}</h3>
					<p className="w-[50%]  ">{`${product.description}`}</p>
					<h2 className="card-title text-2xl">Price: $ {`${product.price}`}</h2>
					<div className="card-actions justify-end">
						<Link
							to={`/edit/${product.id}`}
							className="btn btn-outline btn-primary">
							Edit
						</Link>
						<button
							onClick={() => productDeleteHandler(product.id)}
							className="btn btn-outline btn-error">
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Loading />
	);
};

export default Details;
