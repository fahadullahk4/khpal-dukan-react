import React, { createContext, useEffect, useState } from "react";
import axios from "./Axios";

export const ProductContext = createContext();

const Context = (props) => {
	const [products, setProducts] = useState(
		JSON.parse(localStorage.getItem("products")) || null
	);

	useEffect(() => {
		const storedProducts = localStorage.getItem("products");
		if (storedProducts) {
			setProducts(JSON.parse(storedProducts));
		}
	}, []);

	const fetchProducts = async () => {
		try {
			const { data } = await axios("/products");
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<ProductContext.Provider value={[products, setProducts]}>
			{props.children}
		</ProductContext.Provider>
	);
};

export default Context;
