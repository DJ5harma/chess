"use client";
import Image from "next/image";
import {
	Bishop,
	Box,
	ElementsI,
	King,
	Knight,
	Pawn,
	Piece,
	Queen,
	Rook,
} from "./Classes";
import { useState } from "react";

export default function Home() {
	const [board, setBoard] = useState([
		[
			new Rook(0, 0, 0),
			new Knight(0, 1, 0),
			new Bishop(0, 2, 0),
			new Queen(0, 3, 0),
			new King(0, 4, 0),
			new Bishop(0, 5, 0),
			new Knight(0, 6, 0),
			new Rook(0, 7, 0),
		],
		[
			new Pawn(1, 0, 0),
			new Pawn(1, 1, 0),
			new Pawn(1, 2, 0),
			new Pawn(1, 3, 0),
			new Pawn(1, 4, 0),
			new Pawn(1, 5, 0),
			new Pawn(1, 6, 0),
			new Pawn(1, 7, 0),
		],
		[
			new Box(2, 0),
			new Box(2, 1),
			new Box(2, 2),
			new Box(2, 3),
			new Box(2, 4),
			new Box(2, 5),
			new Box(2, 6),
			new Box(2, 7),
		],
		[
			new Box(3, 0),
			new Box(3, 1),
			new Box(3, 2),
			new Box(3, 3),
			new Box(3, 4),
			new Box(3, 5),
			new Box(3, 6),
			new Box(3, 7),
		],
		[
			new Box(4, 0),
			new Box(4, 1),
			new Box(4, 2),
			new Box(4, 3),
			new Box(4, 4),
			new Box(4, 5),
			new Box(4, 6),
			new Box(4, 7),
		],
		[
			new Box(5, 0),
			new Box(5, 1),
			new Box(5, 2),
			new Box(5, 3),
			new Box(5, 4),
			new Box(5, 5),
			new Box(5, 6),
			new Box(5, 7),
		],
		[
			new Pawn(6, 0, 1),
			new Pawn(6, 1, 1),
			new Pawn(6, 2, 1),
			new Pawn(6, 3, 1),
			new Pawn(6, 4, 1),
			new Pawn(6, 5, 1),
			new Pawn(6, 6, 1),
			new Pawn(6, 7, 1),
		],
		[
			new Rook(7, 0, 1),
			new Knight(7, 1, 1),
			new Bishop(7, 2, 1),
			new Queen(7, 3, 1),
			new King(7, 4, 1),
			new Bishop(7, 5, 1),
			new Knight(7, 6, 1),
			new Rook(7, 7, 1),
		],
	]);
	const [selectedBlock, setSelectedBlock] = useState({
		alreadySelected: false,
		row: -1,
		col: -1,
	});
	const Block = ({
		element,
		i,
		j,
	}: {
		element: ElementsI;
		i: number;
		j: number;
	}) => {
		return (
			<div
				className="w-16 h-16 flex justify-center items-center"
				onClick={(e) => {
					e.stopPropagation();
					if (!selectedBlock.alreadySelected) {
						setSelectedBlock({ alreadySelected: true, row: i, col: j });
						return;
					}
					if (selectedBlock.row !== i || selectedBlock.col !== j) {
						const [srcRow, srcCol] = [selectedBlock.row, selectedBlock.col];

						if (board[srcRow][srcCol].constructor.name === "Box")
							return setSelectedBlock({
								alreadySelected: false,
								row: -1,
								col: -1,
							});

						const temp = board[srcRow][srcCol];
						board[i][j] = temp;
						board[i][j].row = i;
						board[i][j].col = i;

						delete board[srcRow][srcCol];
						board[srcRow][srcCol] = new Box(srcRow, srcCol);

						setBoard([...board]);
					}
					setSelectedBlock({ alreadySelected: false, row: -1, col: -1 });
				}}
				style={{
					backgroundColor:
						(i + j) % 2 ? "rgb(181, 136, 99)" : "rgb(240, 217, 181)",
					color: (i + j) % 2 ? "white" : "black",
					border:
						selectedBlock.row === i && selectedBlock.col === j
							? "solid blue"
							: "",
				}}
			>
				{element.constructor.name !== "Box" && (
					<Image
						src={`pieces/${
							(element as Piece).color === 0 ? "black" : "white"
						}/${element.constructor.name}.svg`}
						width={100}
						height={100}
						alt={element.constructor.name}
					/>
				)}
			</div>
		);
	};

	return (
		<div
			className="flex flex-col sm:p-20"
			onClick={() =>
				setSelectedBlock({ alreadySelected: false, row: -1, col: -1 })
			}
		>
			{board.map((rowArr, i) => (
				<div key={i} className="flex justify-center">
					{rowArr.map((element: ElementsI, j) => (
						<Block element={element} key={`${i}${j}`} i={i} j={j} />
					))}
				</div>
			))}
		</div>
	);
}
