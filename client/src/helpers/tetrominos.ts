export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;
export const ROWPOINTS = [40, 100, 300, 1000];

const colors = {
	0: '244, 239, 201',
	X: '0,0,0',
	I: '211, 0, 38',
	J: '157, 21, 44',
	L: '211, 0, 38',
	O: '134, 138, 147',
	S: '94, 102, 116',
	T: '94, 102, 116',
	Z: '94, 102, 116',

}
export const TETROMINOS = {
	0: { shape: [[0]], color: colors[0] },
	X: { shape: [[0]], color: colors['X'] },
	I: {
		shape: [
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0]
		],
		color: colors['I']
	},
	J: {
		shape: [
			[0, 'J', 0],
			[0, 'J', 0],
			['J', 'J', 0]
		],
		color: colors['J']
	},
	L: {
		shape: [
			[0, 'L', 0],
			[0, 'L', 0],
			[0, 'L', 'L']
		],
		color: colors['L']
	},
	O: {
		shape: [
			['O', 'O'],
			['O', 'O']
		],
		color: colors['O']
	},
	S: {
		shape: [
			[0, 'S', 'S'],
			['S', 'S', 0],
			[0, 0, 0]
		],
		color: colors['S']
	},
	T: {
		shape: [
			[0, 0, 0],
			['T', 'T', 'T'],
			[0, 'T', 0]
		],
		color: colors['T']
	},
	Z: {
		shape: [
			['Z', 'Z', 0],
			[0, 'Z', 'Z'],
			[0, 0, 0]
		],
		color: colors['Z']
	}
};