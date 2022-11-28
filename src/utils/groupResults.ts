import type { IResult } from 'types'

function compareGroups(left: IResult, right: IResult): number {
	const [A, B] = [left.GroupName[0].Description, right.GroupName[0].Description]
	if (A > B) return 1
	if (A < B) return -1
	return 0
}

function compareDates(left: IResult, right: IResult): number {
	const [A, B] = [new Date(left.Date).getTime(), new Date(right.Date).getTime()]
	if (A > B) return 1
	if (A < B) return -1
	return 0
}

function differentFromPrevious(
	results: IResult[],
	index: number,
	key: string
): boolean {
	if (key === 'date') {
		return (
			new Date(results[index].Date).getDate() !==
			new Date(results[index - 1].Date).getDate()
		)
	}
	if (key === 'group') {
		results.sort(compareGroups)
		return results[index].IdGroup !== results[index - 1].IdGroup
	}
	return true
}

export default function groupResults(
	results: IResult[],
	key: string
): IResult[][] {
	const groupedResults: IResult[][] = []
	let temporaryResults: IResult[] = []
	for (const [index, result] of results.entries()) {
		if (index > 0 && differentFromPrevious(results, index, key)) {
			temporaryResults.sort(compareDates)
			groupedResults.push(temporaryResults)
			temporaryResults = []
		}
		temporaryResults.push(result)
	}
	return groupedResults
}
