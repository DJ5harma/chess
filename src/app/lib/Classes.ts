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
}
export class Queen extends Piece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves(board: Box[][]) {
		const validBoxes: Box[] = [];
		const color = this.color;

		function collided(row: number, col: number) {
			if (board[row][col].constructor.name != "Box") {
				if ((board[row][col] as Piece).color !== color)
					validBoxes.push(board[row][col]);
				return true;
			}
			return false;
		}

		// Bishop like-__

		let row = this.row + 1,
			col = this.col + 1;
		while (row < 8 && col < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row++;
			col++;
		}

		(row = this.row - 1), (col = this.col - 1);
		while (row >= 0 && col >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
			col--;
		}

		(row = this.row + 1), (col = this.col - 1);
		while (row < 8 && col >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row++;
			col--;
		}

		(row = this.row - 1), (col = this.col + 1);
		while (row >= 0 && col < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
			col++;
		}

		// ROOK LIKE -__

		(row = this.row + 1), (col = this.col);
		while (row < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row++;
		}

		row = this.row - 1;
		while (row >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
		}

		(row = this.row), (col = this.col - 1);
		while (col >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			col--;
		}

		col = this.col + 1;
		while (col < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
			col++;
		}

		return validBoxes;
	}
}
export class Bishop extends Piece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves(board: Box[][]) {
		const validBoxes: Box[] = [];
		const color = this.color;

		function collided(row: number, col: number) {
			if (board[row][col].constructor.name != "Box") {
				if ((board[row][col] as Piece).color !== color)
					validBoxes.push(board[row][col]);
				return true;
			}
			return false;
		}

		let row = this.row + 1,
			col = this.col + 1;
		while (row < 8 && col < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row++;
			col++;
		}

		(row = this.row - 1), (col = this.col - 1);
		while (row >= 0 && col >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
			col--;
		}

		(row = this.row + 1), (col = this.col - 1);
		while (row < 8 && col >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row++;
			col--;
		}

		(row = this.row - 1), (col = this.col + 1);
		while (row >= 0 && col < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
			col++;
		}

		return validBoxes;
	}
}
export class Knight extends Piece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves(board: Box[][]) {
		const validBoxes: Box[] = [];
		const color = this.color;

		function tryPushing(row: number, col: number) {
			if (
				row < 8 &&
				row >= 0 &&
				col < 8 &&
				col >= 0 &&
				(board[row][col].constructor.name === "Box" ||
					(board[row][col] as Piece).color !== color)
			)
				validBoxes.push(board[row][col]);
		}
		const row = this.row,
			col = this.col;

		tryPushing(row + 2, col + 1);
		tryPushing(row + 2, col - 1);
		tryPushing(row - 2, col + 1);
		tryPushing(row - 2, col - 1);

		tryPushing(row + 1, col + 2);
		tryPushing(row + 1, col - 2);
		tryPushing(row - 1, col + 2);
		tryPushing(row - 1, col - 2);

		return validBoxes;
	}
}
class MoveSensitivePiece extends Piece {
	hasMoved: boolean;
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
		this.hasMoved = false;
	}
}
export class Pawn extends MoveSensitivePiece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves(board: Box[][]) {
		const validBoxes: Box[] = [];
		if (this.color === 0) {
		}
		return validBoxes;
	}
}
export class King extends MoveSensitivePiece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves(board: Box[][]) {
		const validBoxes: Box[] = [];
		const color = this.color;
		const row = this.row;
		const col = this.col;

		function tryPushing(row: number, col: number) {
			if (
				row < 8 &&
				row >= 0 &&
				col < 8 &&
				col >= 0 &&
				(board[row][col].constructor.name === "Box" ||
					(board[row][col] as Piece).color !== color)
			)
				validBoxes.push(board[row][col]);
		}

		tryPushing(row - 1, col - 1);
		tryPushing(row - 1, col);
		tryPushing(row - 1, col + 1);
		tryPushing(row, col - 1);
		tryPushing(row, col + 1);
		tryPushing(row + 1, col - 1);
		tryPushing(row + 1, col);
		tryPushing(row + 1, col + 1);

		return validBoxes;
	}
}
export class Rook extends MoveSensitivePiece {
	constructor(row: number, col: number, color: 0 | 1) {
		super(row, col, color);
	}
	getMoves(board: Box[][]) {
		const validBoxes: Box[] = [];
		const color = this.color;

		function collided(row: number, col: number) {
			if (board[row][col].constructor.name != "Box") {
				if ((board[row][col] as Piece).color !== color)
					validBoxes.push(board[row][col]);
				return true;
			}
			return false;
		}

		let row = this.row + 1,
			col = this.col;
		while (row < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row++;
		}

		row = this.row - 1;
		while (row >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
		}

		(row = this.row), (col = this.col - 1);
		while (col >= 0) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			col--;
		}

		col = this.col + 1;
		while (col < 8) {
			if (collided(row, col)) break;
			validBoxes.push(board[row][col]);
			row--;
			col++;
		}

		return validBoxes;
	}
}

export type ElementI = Rook | Bishop | Knight | King | Queen | Pawn | Box;
export type PieceI = Rook | Bishop | Knight | King | Queen | Pawn;
