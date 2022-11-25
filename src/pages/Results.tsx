import { useQuery } from '@tanstack/react-query'
import getMatches from 'api/getMatches'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
// import Match from 'components/Match'
import type { ReactElement } from 'react'

export default function GalleryPage(): ReactElement {
	const { isLoading, isError, error, data } = useQuery(['matches'], getMatches)
	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	const { Results } = data

	return (
		<>
			<Head title='Results' />
			<div className='m-2 grid min-h-screen grid-cols-[minmax(0,384px)] place-content-center gap-2 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]'>
				{Results.filter(result => result.IdStage === '285063').map(result => (
					<p
						key={`Result-${result.IdMatch}`}
					>{`${result.Home.IdCountry} - ${result.Away.IdCountry}`}</p>
				))}
			</div>
		</>
	)
}
