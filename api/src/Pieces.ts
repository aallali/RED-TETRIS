
class Pieces {
	arr: any[] = []
	randomIntFromInterval = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	randomTetromino = () => {
		// prettier-ignore
		let pieces = ["I", "I", "I", "I", "J", "J", "J", "J", "L", "L", "L", "L", "D", "D", "D", "D", "S", "S", "S", "S", "T", "T", "T", "T", "Z", "Z", "Z", "Z"];
		while (this.arr.length <= 10) {
			const randomTetro = pieces.splice(
				this.randomIntFromInterval(0, pieces.length - 1),
				1
			)[0];
			this.arr.push(randomTetro);
		}
		return this.arr;
	};
}
module.exports = Pieces;
