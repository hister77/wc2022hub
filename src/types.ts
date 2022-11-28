export interface IResult {
	IdMatch: string
	Attendance: string
	IdStage: string
	IdGroup: string
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

export interface IMatches {
	Results: IResult[]
}

export interface ITeam {
	IdCountry: string
	Score: number
	PictureUrl: string
}
