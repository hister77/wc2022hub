import type { IMatches } from 'types'

export default async function getResults(): Promise<IMatches> {
	const response = await fetch(
		'https://api.fifa.com/api/v3/calendar/matches?language=en&count=500&idSeason=255711'
	)
	return response.json() as Promise<IMatches>
}
