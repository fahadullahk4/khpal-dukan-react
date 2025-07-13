import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Create = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useContext(ProductContext);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	const AddProductHandler = (e) => {
		e.preventDefault();

		if (
			title.trim().length < 5 ||
			image.trim().length < 5 ||
			category.trim().length < 3 ||
			description.trim().length < 5 ||
			price <= 0
		)
			return toast.error("Please enter valid details!");

		const product = {
			id: nanoid(),
			title,
			image,
			category,
			price,
			description,
		};
		setProducts([...products, product]);
		localStorage.setItem("products", JSON.stringify([...products, product]));
		toast.success("Product added successfully!");
		navigate("/");
	};
	return (
		<div className="w-full h-screen ">
			<h1 className="text-3xl font-bold mb-4 flex justify-center mt-[15vh]">
				Add new Product
			</h1>
			<form
				onSubmit={AddProductHandler}
				className="w-full flex flex-col items-center justify-center bg-zinc-800 text-white">
				<input
					type="text"
					placeholder="Item Name..."
					className="input"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
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
						onChange={(e) => setImage(e.target.value)}
						value={image}
					/>
				</label>
				<p className="validator-hint">Must be valid URL</p>

				<div className="flex items-center justify-center gap-2">
					<input
						type="text"
						className="input w-[42%]"
						placeholder="Select Category"
						list="browsers"
						onChange={(e) => setCategory(e.target.value)}
						value={category}
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
						onChange={(e) => setPrice(e.target.value)}
						value={price}
					/>
				</div>
				<fieldset className="fieldset w-[26%] mt-5">
					<textarea
						className="textarea h-24 w-full"
						placeholder="Item Description..."
						onChange={(e) => setDescription(e.target.value)}
						value={description}></textarea>
				</fieldset>
				<button className="btn btn-outline btn-info mb-4 rounded-1xl mt-4 text-white">
					Add New Product
				</button>
			</form>
			<Link
				className="btn btn-outline btn-info px-8 absolute top-10 left-10 text-white"
				to="/">
				Home
			</Link>
		</div>
	);
};

export default Create;
