import { Link } from "react-router-dom";

const Card = (props) => {
	return (
		<>
			<div className="card bg-base-100 ml-3 mt-3 mb-3 w-[19vw] h-[30vw] shadow-sm hover:scale-105 transition-all">
				<figure>
					<img
						className="w-full h-full object-cover"
						src={props.product.image}
						alt="Shoes"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title text-sm w-[15vw]">{props.product.title}</h2>
					<Link
						to={`/details/${props.product.id}`}
						className="card-actions justify-end">
						<button className="btn btn-outline btn-info rounded-1xl tracking-tight mt-4">
							View Details
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Card;
