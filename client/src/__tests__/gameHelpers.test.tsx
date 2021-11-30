import { isColliding, createStage, costumStage } from "../helpers/gameHelpers"


const player = {
	pos: {
		x: 2,
		y: 0
	},
	tetromino: [
		[0, 'I', 0, 0],
		[0, 'I', 0, 0],
		[0, 'I', 0, 0],
		[0, 'I', 0, 0]
	],
	collided: false
}
const stage = createStage()

test("Test Helper 1", () => {
	expect(isColliding(player, stage, { x: 2, y: 1 })).toBeDefined();
});


test("Test Helper 2", () => {
	expect(isColliding(player, stage, { x: 2, y: 10 })).toBeDefined();
});
test("Test Helper 3", () => {
	expect(isColliding(player, costumStage('L'), { x: 14, y: 10 })).toBeDefined();
});
