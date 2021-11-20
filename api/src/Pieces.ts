
class Pieces {
	pieces: string[] = ['I']
	constructor(pieces: string[] | undefined) {
		if (pieces)
			this.pieces = pieces
	}
	getRandomTetros = (lngth: number) => {
		let result = '';
		const characters = this.pieces.join('');
		const charactersLength = characters.length;
		for (var i = 0; i < lngth; i++) {
			result += characters.charAt(Math.floor(Math.random() *
				charactersLength));
		}
		return result.split('')
	};
}
export default Pieces;
