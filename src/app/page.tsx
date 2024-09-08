"use client";
import Image from "next/image";
import { Box, ElementI, Pawn, Piece, PieceI } from "./lib/Classes";
import { useState } from "react";
import startingBoard from "./lib/sampleBoard";

export default function Home() {
	const [game, setGame] = useState({
		move: 1,
		board: startingBoard,
	});
	const [previousSelection, setPreviousSelection] = useState<Box | null>(null);

	const [highlightedBoxes, setHighlightedBoxes] = useState<Box[]>([]);

	const Block = ({
		element,
		currRow,
		currCol,
	}: {
		element: ElementI;
		currRow: number;
		currCol: number;
	}) => {
		const highlighted =
			highlightedBoxes.filter(
				({ row, col }) => row === currRow && col === currCol
			).length === 1;

		return (
			<div
				className="w-16 h-16 flex justify-center items-center"
				onClick={(e) => {
					e.stopPropagation();

					const { board, move } = game;
					const DST = board[currRow][currCol] as PieceI;
					const SRC = previousSelection as PieceI;

					const wrongMover = () =>
						(move % 2 === 1 && SRC.color === 0) ||
						(move % 2 === 0 && SRC.color === 1);

					if (SRC === DST) {
						setHighlightedBoxes([]);
						return setPreviousSelection(null);
					}
					if (
						!SRC ||
						SRC.constructor.name === "Box" ||
						SRC.color === DST.color ||
						wrongMover()
					) {
						if (DST.constructor.name === "Box") {
							setHighlightedBoxes([]);
							setPreviousSelection(DST);
						} else {
							setPreviousSelection(DST);
							setHighlightedBoxes(DST.getMoves(game.board) || []);
						}
						return;
					} // we will return if the prevSelection is inValid or is of the same colored-piece of this selectionn(DST)

					if (!highlighted) {
						setPreviousSelection(null);
						return setHighlightedBoxes([]);
					}

					const { row: prevRow, col: prevCol } = SRC;

					if (SRC.constructor.name === "Pawn") (SRC as Pawn).hasMoved = true;
					SRC.row = currRow;
					SRC.col = currCol;

					board[currRow][currCol] = SRC;
					board[prevRow][prevCol] = DST;

					delete board[prevRow][prevCol];

					board[prevRow][prevCol] = new Box(prevRow, prevCol);

					setGame({ board: [...board], move: move + 1 });
					setPreviousSelection(null);
					setHighlightedBoxes([]);
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
							style={highlighted ? { backgroundColor: "rgba(0,0,0,0.3)" } : {}}
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
						highlighted && (
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
					{rowArr.map((element: ElementI, j) => (
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
