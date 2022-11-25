export interface IResult {
	IdMatch: string
	Attendance: string
	IdStage?: string
	Home: ITeam
	Away: ITeam
}

export interface IMatches {
	Results: IResult[]
}

export interface ITeam {
	IdCountry: string
}
