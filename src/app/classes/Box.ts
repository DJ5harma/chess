export type pieceI = "N" | "K" | "Q" | "B" | "R" | "P" | "E";
export type pieceColorI = 0 | 1 | -1;
export class Box {
	row: number;
	col: number;
	piece: pieceI;
	pieceColor: 0 | 1 | -1;
	constructor(
		row: number,
		col: number,
		piece: pieceI,
		pieceColor: pieceColorI
	) {
		this.row = row;
		this.col = col;
		this.piece = piece;
		this.pieceColor = pieceColor;
	}
}
