/* eslint-disable @typescript-eslint/no-magic-numbers */
export function roundTo(decimal: number, place = 2): number {
	const p = place > 0 ? place * 10 : 1
	return Math.round(decimal * p) / p
}

export function formatName(name: string): string {
	return name
		.trim()
		.split(/\s+/)
		.map((part, index) => {
			if (index === 0) return `${part[0]}.`
			const capitalized = part.includes('-')
				? part
						.split('-')
						.map(element => `${element[0]}${element.slice(1).toLowerCase()}`)
						.join('-')
				: part[0] + part.slice(1).toLowerCase()

			return capitalized
		})
		.join(' ')
}
