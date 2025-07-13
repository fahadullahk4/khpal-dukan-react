import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";
// import Home from './components/Home';
// import User from './components/User';
// import About from './components/About';

const App = () => {
	return (
		<>
			<div className="w-full h-screen bg-zinc-800 text-white flex">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/details/:id" element={<Details />} />
					<Route path="/create" element={<Create />} />
					<Route path="/edit/:id" element={<Edit />} />
				</Routes>
			</div>
		</>
	);
};

export default App;
