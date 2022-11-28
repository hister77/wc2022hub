import { useQuery } from '@tanstack/react-query'
import getMatches from 'api/getMatches'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import Team from 'components/Team'
import { format } from 'date-fns'
import type { ChangeEvent, ReactElement } from 'react'
import { useState } from 'react'
import type { IResult } from 'types'
import groupResults from 'utils/groupResults'

function Match({ result }: { result: IResult }): ReactElement {
	return (
		<div className='w-min-2/5 mb-4 flex w-full flex-col rounded-lg border-2 border-indigo-400 bg-[#f5eff9] text-black shadow-md shadow-indigo-500/40 hover:bg-indigo-400 md:w-88 lg:w-60 xl:w-1/5'>
			<span className='inline-block self-end text-xs'>
				{result.GroupName[0].Description}
			</span>
			<div className='p-2'>
				<div className='flex w-full flex-row justify-between gap-2'>
					<Team team={result.Home} Home />
					{result.MatchStatus === 0 && (
						<span className='my-auto mr-0 inline-block h-fit'>{`${result.HomeTeamScore} - ${result.AwayTeamScore}`}</span>
					)}
					<Team team={result.Away} Home={false} />
				</div>
				<span className='block h-fit content-end text-center'>
					{format(new Date(result.Date), 'HH:mm')}
				</span>
				<span className='block h-fit content-end text-center text-xs'>
					{result.Stadium.Name[0].Description}
				</span>
			</div>
		</div>
	)
}

export default function Matches(): ReactElement {
	const [key, setKey] = useState<string>('date')
	const { isLoading, isError, error, data } = useQuery(
		['matches'],
		getMatches,
		{
			select: data =>
				groupResults(
					data.Results.filter(result => result.IdStage === '285063'),
					key
				)
		}
	)

	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	function onChange(event: ChangeEvent<HTMLInputElement>): void {
		const { value } = event.target
		setKey(value)
	}

	return (
		<>
			<Head title='Fixtures & Results' />

			<div className='mx-auto mt-1 lg:w-[1280px]'>
				<div>
					<legend> Group by:</legend>
					<input
						type='radio'
						id='date'
						name='sort'
						value='date'
						onChange={onChange}
						defaultChecked
					/>{' '}
					Date
					<br />
					<input
						type='radio'
						id='group'
						name='sort'
						value='group'
						onChange={onChange}
					/>{' '}
					Group
					<br />
				</div>
				{data.map(results => (
					<div key={`${results[0].IdMatch}`} className='flex flex-col'>
						<span className='xs:mb-1.5 block text-center text-[1.5rem] lg:mb-2'>
							{key === 'date'
								? format(new Date(results[0].Date), 'dd-MM-yyy')
								: results[0].GroupName[0].Description}
						</span>
						<div className='mb-4 flex w-full flex-row flex-wrap justify-between gap-x-4 md:mx-auto md:justify-evenly'>
							{results.map(result => (
								<Match key={`Result-${result.IdMatch}`} result={result} />
							))}
						</div>
					</div>
				))}
			</div>
		</>
	)
}
