

export interface IPlayer {
	pos: {
		x: number;
		y: number;
	};
	tetromino: (string | number)[][];
	collided: boolean;
};

export interface IOpponentData {
	id: string
	name: string
	score: number
	level: number
	rows: number
	lost: boolean
	room?: string
	stage?: []
}

export interface IOpponent {
	name: string
	stage: IStage
	rows: number
	lost: boolean
	score: number
	level: number
	admin: boolean
}
export interface IOpponents {
	players: IOpponent[]
}

export type IStageCell = [string | number, string];

export type IStage = IStageCell[][];


export interface IError {
	title: string,
	message: string,
	secondaryMessage?: string
}


export interface IRoom {
	title: string
	online: number
}