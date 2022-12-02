import type { IResult } from 'types'

function compareGroups(left: IResult, right: IResult): number {
	const [A, B] = [Number(left.IdGroup), Number(right.IdGroup)]
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
const initSort = (results: IResult[], key: string): void => {
	switch (key) {
		case 'date': {
			results.sort(compareDates)
			break
		}
		case 'group': {
			results.sort(compareGroups)
			break
		}
		default: {
			break
		}
	}
}

function differentThanNext(
	results: IResult[],
	index: number,
	key: string
): boolean {
	if (typeof results[index + 1] === 'undefined') return true
	if (key === 'date') {
		return (
			new Date(results[index].Date).getDate() !==
			new Date(results[index + 1].Date).getDate()
		)
	}
	if (key === 'group') {
		return results[index].IdGroup !== results[index + 1].IdGroup
	}
	return true
}

export default function groupResults(
	results: IResult[],
	key: string
): IResult[][] {
	const resultsCopy = [...results]
	const groupedResults: IResult[][] = []
	let temporaryResults: IResult[] = []
	initSort(resultsCopy, key)

	for (const [index, result] of resultsCopy.entries()) {
		temporaryResults.push(result)
		if (differentThanNext(resultsCopy, index, key)) {
			temporaryResults.sort(compareDates)
			groupedResults.push(temporaryResults)
			temporaryResults = []
		}
	}

	return groupedResults
}
