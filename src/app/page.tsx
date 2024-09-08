"use client";
import Image from "next/image";
import { Box, ElementsI, Piece } from "./lib/Classes";
import { useState } from "react";
import startingBoard from "./lib/sampleBoard";

export default function Home() {
	const [game, setGame] = useState({
		move: 1,
		board: startingBoard,
	});
	const [previousSelection, setPreviousSelection] = useState({
		srcRow: -1,
		srcCol: -1,
		exists: false,
	});
	function unselectBox() {
		setPreviousSelection({ srcRow: -1, srcCol: -1, exists: false });
	}
	function selectBox(srcRow: number, srcCol: number) {
		setPreviousSelection({ srcRow, srcCol, exists: true });
	}
	const isPiece = (row: number, col: number) => {
		if (row === -1 || col === -1) return false;
		return game.board[row][col].constructor.name !== "Box";
	};

	const Block = ({
		element,
		currRow,
		currCol,
	}: {
		element: ElementsI;
		currRow: number;
		currCol: number;
	}) => {
		return (
			<div
				className="w-16 h-16 flex justify-center items-center"
				onClick={(e) => {
					e.stopPropagation();
					unselectBox();

					const { srcRow, srcCol } = previousSelection;

					if (!previousSelection.exists) return selectBox(currRow, currCol);

					const { board, move } = game;
					const SOURCE = board[srcRow][srcCol] as Piece;
					const DESTINATION = board[currRow][currCol] as Piece;

					if (currRow === srcRow && currCol === srcCol) return unselectBox();

					if (
						!isPiece(srcRow, srcCol) ||
						SOURCE.color === DESTINATION.color || // prevents cannibalism
						(move % 2 === 1 && SOURCE.color === 0) ||
						(move % 2 === 0 && SOURCE.color === 1) // makes sure the right player moves for the specific turn
					)
						return selectBox(currRow, currCol);

					board[currRow][currCol] = SOURCE;
					delete board[srcRow][srcCol];
					board[srcRow][srcCol] = new Box(srcRow, srcCol);

					setGame({ board: [...board], move: move + 1 });
				}}
				style={{
					backgroundColor:
						(currRow + currCol) % 2
							? "rgb(181, 136, 99)"
							: "rgb(240, 217, 181)",
					color: (currRow + currCol) % 2 ? "white" : "black",
					border:
						previousSelection.srcRow === currRow &&
						previousSelection.srcCol === currCol
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
			className="flex flex-col sm:p-20 items-center select-none"
			onClick={unselectBox}
		>
			{game.board.map((rowArr, i) => (
				<div key={i} className="flex justify-center">
					{rowArr.map((element: ElementsI, j) => (
						<Block element={element} key={`${i}${j}`} currRow={i} currCol={j} />
					))}
				</div>
			))}
			<h1 className="m-2">
				Move {game.move} {game.move % 2 === 0 ? "_Black" : "_White"} to move
			</h1>
		</div>
	);
}
