export class Box {
	row: number;
	col: number;
	constructor(row: number, col: number) {
		this.row = row;
		this.col = col;
	}
}
export class Piece extends Box {
	color: 0 | 1;
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col);
		this.color = color;
	}
	getMoves(board: Box[][]) {}
	move() {}
}
class MoveSensitivePiece extends Piece {
	hasMoved: boolean;
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
		this.hasMoved = false;
	}
}
export class Queen extends Piece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves() {}
	move() {}
}
export class Bishop extends Piece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves(board: Box[][]) {
		const boxesPossible: { row: number; col: number }[] = [];
		for (let i = this.row - 1, j = this.col - 1; i > -1 && j > -1; i--, j--) {
			if (board[i][j].constructor.name !== "Box") break;
			boxesPossible.push({ row: i, col: j });
		}
		for (let i = this.row + 1, j = this.col + 1; i < 8 && j < 8; i++, j++) {
			if (board[i][j].constructor.name !== "Box") break;
			boxesPossible.push({ row: i, col: j });
		}
		for (let i = this.row - 1, j = this.col + 1; i > -1 && j < 8; i--, j++) {
			if (board[i][j].constructor.name !== "Box") break;
			boxesPossible.push({ row: i, col: j });
		}
		for (let i = this.row + 1, j = this.col + 1; i < 8 && j > -1; i++, j--) {
			if (board[i][j].constructor.name !== "Box") break;
			boxesPossible.push({ row: i, col: j });
		}
		return boxesPossible;
	}
	move() {}
}
export class Knight extends Piece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves() {}
	move() {}
}

export class Pawn extends MoveSensitivePiece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves() {}
	move() {}
}
export class King extends MoveSensitivePiece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves() {}
	move() {}
}
export class Rook extends MoveSensitivePiece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves() {}
	move() {}
}

export type ElementsI = Rook | Bishop | Knight | King | Queen | Pawn | Box;
