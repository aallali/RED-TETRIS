

export enum ROOM_MODE {
	SOLO = 'solo',
	MULTIPLAYER = 'multiplayer'
}

export interface IPlayer {
	stage?: (string | number)[];
	id: string
	name: string
	score: number
	level: number
	rows: number
	lost: boolean
	room?: string
}
