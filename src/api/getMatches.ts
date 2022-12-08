import type { QueryFunctionContext } from '@tanstack/react-query'
import type { IMatch, IMatches } from 'types'

export default async function getResults(): Promise<IMatches> {
	const response = await fetch(
		'https://api.fifa.com/api/v3/calendar/matches?language=en&count=500&idSeason=255711&IdStage=285063'
	)
	return response.json() as Promise<IMatches>
}

export async function getMatch({
	queryKey
}: QueryFunctionContext<string[]>): Promise<IMatch> {
	const [, IdStage, IdMatch] = queryKey
	const response = await fetch(
		`https://api.fifa.com/api/v3/live/football/17/255711/${IdStage}/${IdMatch}?language=en`
	)
	return response.json() as Promise<IMatch>
}

export async function getPlayers({
	queryKey
}: QueryFunctionContext<string[]>): Promise<[]> {
	const [, IdIFES] = queryKey
	const response = await fetch(
		`https://fdh-api.fifa.com/v1/stats/match/${IdIFES}/players.json`
	)
	return response.json() as Promise<[]>
}
