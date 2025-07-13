import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Edit = () => {
	const [products, setProducts] = useContext(ProductContext);
	const navigate = useNavigate();
	const { id } = useParams();

	const [product, setProduct] = useState({
		title: "",
		description: "",
		image: "",
		category: "",
		price: "",
	});

	const changeHandler = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setProduct(products.filter((item) => item.id == id)[0]);
	}, [id]);

	const AddProductHandler = (e) => {
		e.preventDefault();

		if (
			product.title.trim().length < 5 ||
			product.image.trim().length < 5 ||
			product.category.trim().length < 3 ||
			product.description.trim().length < 5 ||
			product.price <= 0
		)
			return toast.error("Please enter valid details!");

		const productIndex = products.findIndex((item) => item.id == id);
		const copyData = [...products];
		copyData[productIndex] = { ...products[productIndex], ...product };

		setProducts(copyData);
		localStorage.setItem("products", JSON.stringify(copyData));
		toast.success("Product updated successfully!");
		navigate(-1);
	};
	return (
		<div className="w-full h-screen ">
			<h1 className="text-3xl font-bold mb-4 flex justify-center mt-[15vh]">
				Edit Product
			</h1>
			<form
				onSubmit={AddProductHandler}
				className="w-full flex flex-col items-center justify-center bg-zinc-800 text-white">
				<input
					type="text"
					placeholder="Item Name..."
					className="input"
					name="title"
					onChange={changeHandler}
					value={product && product.title}
				/>

				<label className="input validator mt-5">
					<svg
						className="h-[1em] opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24">
						<g
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="2.5"
							fill="none"
							stroke="currentColor">
							<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
							<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
						</g>
					</svg>
					<input
						type="url"
						required
						placeholder="https://your-image-url.com"
						pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
						title="Must be valid URL"
						name="image"
						onChange={changeHandler}
						value={product && product.image}
					/>
				</label>
				<p className="validator-hint">Must be valid URL</p>

				<div className="flex items-center justify-center gap-2">
					<input
						type="text"
						className="input w-[42%]"
						placeholder="Select Category"
						list="browsers"
						name="category"
						onChange={changeHandler}
						value={product && product.category}
					/>
					<datalist id="browsers">
						<option value="Men's Clothing"></option>
						<option value="Women's Clothing"></option>
						<option value="Electronics"></option>
						<option value="Jewelery"></option>
					</datalist>

					<input
						type="number"
						className="input validator w-[42%]"
						required
						placeholder="Enter Price"
						name="price"
						onChange={changeHandler}
						value={product && product.price}
					/>
				</div>
				<fieldset className="fieldset w-[26%] mt-5">
					<textarea
						className="textarea h-24 w-full"
						placeholder="Item Description..."
						name="description"
						onChange={changeHandler}
						value={product && product.description}></textarea>
				</fieldset>
				<button className="btn btn-outline btn-info mb-4 rounded-1xl mt-4 text-white">
					Edit Product
				</button>
			</form>
			<Link
				className="btn btn-outline btn-primary px-8 absolute top-10 left-10 text-white"
				to="/">
				Home
			</Link>
		</div>
	);
};

export default Edit;
