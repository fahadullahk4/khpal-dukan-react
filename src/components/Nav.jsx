import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
const Nav = () => {
	const { search, pathname } = useLocation();
	const [products] = useContext(ProductContext);

	let uniqueCategories =
		products &&
		products.reduce((acc, product) => [...acc, product.category], []);
	uniqueCategories = [...new Set(uniqueCategories)];

	const color = () => {
		return `rgba(${(Math.random() * 255).toFixed()}, ${(
			Math.random() * 255
		).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.4)`;
	};

	return (
		<nav className="w-[18vw] h-screen bg-zinc-900 p-4">
			<ul className="flex flex-col items-center">
				<li className="btn btn-outline btn-info btn-lg mb-4 rounded-1xl mt-4 tracking-tight">
					<Link to="/create">Add New Product</Link>
				</li>
			</ul>
			<hr className="mb-5 border-zinc-600 " />
			<h1 className="text-2xl font-bold mb-4">Category Filters</h1>
			<div className="w-[17vw] ">
				{uniqueCategories.map((category, index) => (
					<Link
						to={`/?category=${category}`}
						className="flex items-center gap-5 mb-2 capitalize "
						key={index}>
						<span
							style={{ backgroundColor: color() }}
							className="size-[1vw] inline-block rounded-full"></span>
						{category}
					</Link>
				))}
			</div>

			{pathname != "/" || search.length > 0 && (
				<Link className="btn btn-outline btn-info w-full mt-6" to="/">
					Home
				</Link>
			)}
		</nav>
	);
};

export default Nav;
