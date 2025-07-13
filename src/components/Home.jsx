import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import Card from "./Card";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
// import axios from "../utils/axios";

const Home = () => {
	const [products] = useContext(ProductContext);
	const { search } = useLocation();
	const category = decodeURIComponent(search.split("=")[1]);

	const [filteredProducts, setFilteredProducts] = useState(null);

	// const getProductsByCategory = async () => {
	// 	try {
	// 		const { data } = await axios.get(`/products/category/${category}`);
	// 		setFilteredProducts(data);
	// 	} catch (error) {
	// 		console.error("Error fetching products by category:", error);
	// 	}
	// };

	useEffect(() => {
		if (!filteredProducts || category == "undefined")
			setFilteredProducts(products);
		if (category != "undefined") {
			{
				// getProductsByCategory();
				setFilteredProducts(
					products.filter((product) => product.category == category)
				);
			}
		}
	}, [category, products]);
	return products ? (
		<>
			<Nav />
			<div className="h-screen w-screen bg-zinc-600 overflow-x-hidden overflow-y-auto flex flex-wrap">
				{filteredProducts &&
					filteredProducts.map((product, index) => (
						<Card product={product} key={index} />
					))}
			</div>
		</>
	) : (
		<Loading />
	);
};

export default Home;
