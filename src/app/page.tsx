"use client";
import Image from "next/image";
import { Box } from "./classes/Box";
import { useState } from "react";

export default function Home() {
	const board = [
		[
			new Box(1, 1, "R", 0),
			new Box(1, 2, "N", 0),
			new Box(1, 3, "B", 0),
			new Box(1, 4, "Q", 0),
			new Box(1, 5, "K", 0),
			new Box(1, 6, "B", 0),
			new Box(1, 7, "N", 0),
			new Box(1, 8, "R", 0),
		],
		[
			new Box(2, 1, "P", 0),
			new Box(2, 2, "P", 0),
			new Box(2, 3, "P", 0),
			new Box(2, 4, "P", 0),
			new Box(2, 5, "P", 0),
			new Box(2, 6, "P", 0),
			new Box(2, 7, "P", 0),
			new Box(2, 8, "P", 0),
		],
		[
			new Box(3, 1, "E", -1),
			new Box(3, 2, "E", -1),
			new Box(3, 3, "E", -1),
			new Box(3, 4, "E", -1),
			new Box(3, 5, "E", -1),
			new Box(3, 6, "E", -1),
			new Box(3, 7, "E", -1),
			new Box(3, 8, "E", -1),
		],
		[
			new Box(4, 1, "E", -1),
			new Box(4, 2, "E", -1),
			new Box(4, 3, "E", -1),
			new Box(4, 4, "E", -1),
			new Box(4, 5, "E", -1),
			new Box(4, 6, "E", -1),
			new Box(4, 7, "E", -1),
			new Box(4, 8, "E", -1),
		],
		[
			new Box(5, 1, "E", -1),
			new Box(5, 2, "E", -1),
			new Box(5, 3, "E", -1),
			new Box(5, 4, "E", -1),
			new Box(5, 5, "E", -1),
			new Box(5, 6, "E", -1),
			new Box(5, 7, "E", -1),
			new Box(5, 8, "E", -1),
		],
		[
			new Box(6, 1, "E", -1),
			new Box(6, 2, "E", -1),
			new Box(6, 3, "E", -1),
			new Box(6, 4, "E", -1),
			new Box(6, 5, "E", -1),
			new Box(6, 6, "E", -1),
			new Box(6, 7, "E", -1),
			new Box(6, 8, "E", -1),
		],
		[
			new Box(7, 1, "P", 1),
			new Box(7, 2, "P", 1),
			new Box(7, 3, "P", 1),
			new Box(7, 4, "P", 1),
			new Box(7, 5, "P", 1),
			new Box(7, 6, "P", 1),
			new Box(7, 7, "P", 1),
			new Box(7, 8, "P", 1),
		],
		[
			new Box(8, 1, "R", 1),
			new Box(8, 2, "N", 1),
			new Box(8, 3, "B", 1),
			new Box(8, 4, "Q", 1),
			new Box(8, 5, "K", 1),
			new Box(8, 6, "B", 1),
			new Box(8, 7, "N", 1),
			new Box(8, 8, "R", 1),
		],
	];
	const [selectedBlock, setSelectedBlock] = useState({
		row: -1,
		col: -1,
	});

	const Block = ({ box }: { box: Box }) => {
		const { row, col, piece, pieceColor } = box;
		return (
			<div
				className="w-16 h-16 flex justify-center items-center"
				style={{
					backgroundColor:
						(row + col) % 2 ? "rgb(181, 136, 99)" : "rgb(240, 217, 181)",
					color: (row + col) % 2 ? "white" : "black",
					border:
						selectedBlock.row === row && selectedBlock.col === col
							? "solid blue"
							: "",
				}}
				onClick={(e) => {
					e.stopPropagation();
					setSelectedBlock({ row, col });
					if (selectedBlock.col === col && selectedBlock.row === row)
						setSelectedBlock({ row: -1, col: -1 });
				}}
			>
				{piece !== "E" && (
					<Image
						src={`pieces/${pieceColor === 0 ? "black" : "white"}/${piece}.svg`}
						width={100}
						height={100}
						alt={`${pieceColor === 0 ? "blk" : "wht"} ${piece}`}
					/>
				)}
			</div>
		);
	};

	return (
		<div
			className="flex flex-col sm:p-20"
			onClick={() => setSelectedBlock({ row: -1, col: -1 })}
		>
			{board.map((rowArr, i) => (
				<div key={i} className="flex justify-center">
					{rowArr.map((box: Box, j) => (
						<Block box={box} key={`${i}${j}`} />
					))}
				</div>
			))}
		</div>
	);
}
