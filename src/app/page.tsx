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
	const [previousSelection, setPreviousSelection] = useState<Box | null>(null);

	// const [highlightedBoxes, setHighlightedBoxes] = useState<Box[]>([]);

	const isPiece = (box: Box) => box.constructor.name !== "Box";

	const Block = ({
		element,
		currRow,
		currCol,
	}: {
		element: ElementsI;
		currRow: number;
		currCol: number;
	}) => {
		const highlight = true;

		return (
			<div
				className="w-16 h-16 flex justify-center items-center"
				onClick={(e) => {
					e.stopPropagation();
					const { board, move } = game;

					const DST = board[currRow][currCol] as Piece;
					const SRC = previousSelection as Piece;

					if (
						!SRC ||
						!isPiece(SRC) ||
						SRC.color === DST.color ||
						(move % 2 === 1 && SRC.color === 0) ||
						(move % 2 === 0 && SRC.color === 1)
					)
						return setPreviousSelection(DST);
					if (SRC === DST) return setPreviousSelection(null);

					const { row: prevRow, col: prevCol } = SRC;

					SRC.row = currRow;
					SRC.col = currCol;

					board[currRow][currCol] = SRC;
					board[prevRow][prevCol] = DST;

					delete board[prevRow][prevCol];

					board[prevRow][prevCol] = new Box(prevRow, prevCol);

					setGame({ board: [...board], move: move + 1 });
					setPreviousSelection(null);
				}}
				style={{
					backgroundColor:
						(currRow + currCol) % 2
							? "rgb(181, 136, 99)"
							: "rgb(240, 217, 181)",
					color: (currRow + currCol) % 2 ? "white" : "black",
					border: previousSelection
						? previousSelection.row === currRow &&
						  previousSelection.col === currCol
							? "solid blue"
							: ""
						: "",
				}}
			>
				<div className="flex justify-center items-center">
					{element.constructor.name !== "Box" ? (
						<div
							style={highlight ? { backgroundColor: "rgba(0,0,0,0.3)" } : {}}
						>
							<div
								className="w-full h-full flex justify-center items-center rounded-3xl z-20"
								style={{
									backgroundColor:
										(currRow + currCol) % 2
											? "rgb(181, 136, 99)"
											: "rgb(240, 217, 181)",
								}}
							>
								<Image
									src={`pieces/${
										(element as Piece).color === 0 ? "black" : "white"
									}/${element.constructor.name}.svg`}
									width={100}
									height={100}
									alt={element.constructor.name}
								/>
							</div>
						</div>
					) : (
						highlight && (
							<div className="w-4 h-4 absolute rounded-full bg-black opacity-25"></div>
						)
					)}
				</div>
			</div>
		);
	};

	return (
		<div
			className="flex flex-col sm:p-20 items-center select-none"
			onClick={() => setPreviousSelection(null)}
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
