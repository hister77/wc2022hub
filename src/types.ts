export interface IResult {
	IdMatch: string
	Attendance: string
	IdStage: string
	IdGroup: string | null
	Date: string
	MatchStatus: number
	HomeTeamScore: number
	AwayTeamScore: number
	GroupName: [{ Description: string }]
	Stadium: {
		Name: [{ Description: string }]
	}
	Home: ITeam
	Away: ITeam
}

export interface IRExtended extends IResult {
	BallPossession: {
		OverallAway: number
		OverallHome: number
	}
	Officials: {
		IdCountry: string
		Name: [{ Description: string }]
		NameShort: [{ Description: string }]
		OfficialId: string
		OfficialType: number
		TypeLocalized: [{ Description: string }]
	}[]
	Weather: {
		Humidity: string
		Temperature: string
		Type: number
		WindSpeed: number
		TypeLocalized: [{ Description: string }]
		Winner: string
	}
}

export interface IMatches {
	Results: IResult[]
}

export interface ITeam {
	IdCountry: string
	Score: number
	PictureUrl: string
}

export interface IMatch {
	IdMatch: string
	Properties: {
		IdIFES: string
	}
	HomeTeam: {
		Goals: IGoal[]
		Players: IPlayer[]
	}
	AwayTeam: {
		Goals: IGoal[]
		Players: IPlayer[]
	}
}

export interface IPlayer {
	IdPlayer: string
	IdTeam: string
	ShirtNumber: number
	Captain: boolean
	FieldStatus: number
	Position: number
	Status: number
	SpecialStatus: number
	LineupX: number
	LineupY: number
	PlayerName: [{ Description: string }]
	goals?: IGoal
}

export interface IGoal {
	IdPlayer?: string
	IdAssistPlayer?: string | null
	Minute?: number
}
