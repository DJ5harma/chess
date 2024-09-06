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
	const [selectedBlock, setSelectedBlock] = useState({
		alreadySelected: false,
		row: -1,
		col: -1,
	});
	function unselectBox() {
		setSelectedBlock({ alreadySelected: false, row: -1, col: -1 });
	}
	function selectBox(row: number, col: number) {
		setSelectedBlock({ alreadySelected: true, row, col });
	}
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
						selectBox(i, j);
						return;
					}
					const sourceBox = game.board[selectedBlock.row][
						selectedBlock.col
					] as Piece;
					const destinationBox = game.board[i][j] as Piece;
					if (
						sourceBox.constructor.name === "Box" || // prevents moves made by boxes (as sources) without a piece
						sourceBox.color === destinationBox.color || // prevents cannibalism
						(game.move % 2 === 1 && sourceBox.color === 0) ||
						(game.move % 2 === 0 && sourceBox.color === 1) // makes sure the right player moves for the specific turn
					) {
						selectBox(i, j);
						return;
					}

					const { board, move } = game;
					const [srcRow, srcCol] = [selectedBlock.row, selectedBlock.col];

					if (
						!selectedBlock.alreadySelected ||
						(board[srcRow][srcCol] as Piece).color ===
							(board[i][j] as Piece).color
					) {
						unselectBox(); // do nothing if we didn't select a box previously
						return;
					}

					if (srcRow !== i || srcCol !== j) {
						board[i][j] = board[srcRow][srcCol];
						board[i][j].row = i;
						board[i][j].col = i;

						delete board[srcRow][srcCol];
						board[srcRow][srcCol] = new Box(srcRow, srcCol);

						setGame({ board: [...board], move: move + 1 });
					}
					unselectBox();
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
			className="flex flex-col sm:p-20 items-center"
			onClick={() =>
				setSelectedBlock({ alreadySelected: false, row: -1, col: -1 })
			}
		>
			{game.board.map((rowArr, i) => (
				<div key={i} className="flex justify-center">
					{rowArr.map((element: ElementsI, j) => (
						<Block element={element} key={`${i}${j}`} i={i} j={j} />
					))}
				</div>
			))}
			<h1 className="m-2">
				Move {game.move} {game.move % 2 === 0 ? "_Black" : "_White"} to move
			</h1>
		</div>
	);
}
