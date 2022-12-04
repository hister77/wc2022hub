import { useQuery } from '@tanstack/react-query'
import getMatches, { getMatch } from 'api/getMatches'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import Team from 'components/Team'
import { format } from 'date-fns'
import { sortBy } from 'lodash'
import type React from 'react'
import type { ChangeEvent, ReactElement } from 'react'
import { useState } from 'react'
import type { IGoal, IPlayer, IResult, IRExtended } from 'types'
import groupResults from 'utils/groupResults'
import { formatName, roundTo } from 'utils/utils'

function Goal({
	scorers,
	IdPlayer
}: {
	scorers: IGoal[]
	IdPlayer: string
}): ReactElement {
	return (
		<span className='text-green-600'>
			{scorers.map(scorer => scorer.IdPlayer).includes(IdPlayer)
				? scorers
						.filter(scorer => scorer.IdPlayer === IdPlayer)
						.map(scorer => ` ${String(scorer.Minute)}`)
						.join(', ')
				: undefined}
		</span>
	)
}

function Lineup({
	players,
	scorers
}: {
	players: IPlayer[]
	scorers: IGoal[]
}): ReactElement {
	const START = 1
	const BENCH = 2
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const sortedPlayers = sortBy(players, ['Status', 'Position'])
	const [lineup, bench] = [
		sortedPlayers.filter(player => player.Status === START),
		sortedPlayers.filter(player => player.Status === BENCH)
	]
	return (
		<div className='w-max-1/2 w-fit'>
			{[lineup, bench].map((list, index) => (
				<div key={index === 0 ? 'home' : 'away'}>
					<h6 className='bt-1.5 mb-1 mt-1.5 font-medium'>
						{index === 0 ? 'Lineup' : 'Bench'}
					</h6>
					{list.map(player => (
						<div key={player.IdPlayer}>
							<span className='text-xs'>
								{formatName(player.PlayerName[0].Description)}
							</span>
							<Goal scorers={scorers} IdPlayer={player.IdPlayer} />
						</div>
					))}
				</div>
			))}
		</div>
	)
}

function ExtendedMatch({ result }: { result: IRExtended }): ReactElement {
	const [{ OverallHome, OverallAway }, { Temperature, Humidity, WindSpeed }] = [
		result.BallPossession,
		result.Weather,
		result
	]

	const { isLoading, isError, error, data } = useQuery(
		['match', result.IdStage, result.IdMatch],
		getMatch
	)

	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	return (
		<div className='mt-4 flex flex-col gap-y-2  text-xs'>
			<div className='w-fit self-center text-center'>
				<p className='mb-1 font-medium'>Ball possession</p>
				<p>
					{`${roundTo(OverallHome, 0)} -
			${roundTo(OverallAway, 0)}`}
				</p>
			</div>
			<div className='w-fit self-center border text-center'>
				<p className='mb-1 font-medium'>Weather</p>
				<p>{`Temp: ${Temperature}°C`}</p>
				<p>{`Hum: ${Humidity}`}%</p>
				<p>{`Wind: ${WindSpeed} m/s`}</p>
			</div>
			<div>
				<div className='flex flex-row justify-between'>
					<Lineup
						players={data.HomeTeam.Players}
						scorers={data.HomeTeam.Goals}
					/>
					<Lineup
						players={data.AwayTeam.Players}
						scorers={data.AwayTeam.Goals}
					/>
				</div>
			</div>
		</div>
	)
}

function Result({ result }: { result: IResult }): ReactElement {
	const [extended, setExtended] = useState(false)

	const onClick = (event: React.MouseEvent<HTMLDivElement>): void => {
		setExtended(toggled => !toggled)
		event.currentTarget.scrollIntoView()
	}
	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter') setExtended(toggle => !toggle)
		event.currentTarget.scrollIntoView()
	}

	return (
		<div
			className='w-min-2/5 mb-4 flex h-fit w-full flex-col rounded-lg border-2 border-indigo-400 bg-[#f5eff9] text-black shadow-md shadow-indigo-500/40 hover:bg-indigo-100 md:w-88 lg:w-60 xl:w-1/5'
			onClick={onClick}
			onKeyDown={onKeyDown}
			role='button'
			tabIndex={0}
		>
			<span className='inline-block self-end text-xs'>
				{result.IdGroup ? result.GroupName[0].Description : undefined}
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
				<span className='block h-fit content-end text-center text-sm'>
					{result.Stadium.Name[0].Description}
				</span>
				{extended ? <ExtendedMatch result={result as IRExtended} /> : undefined}
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
			select: data2 => groupResults(data2.Results, key)
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
				<div className='ml-2'>
					<span> Group by:</span>
					<br />
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
								<Result key={`result-${result.IdMatch}`} result={result} />
							))}
						</div>
					</div>
				))}
			</div>
		</>
	)
}
