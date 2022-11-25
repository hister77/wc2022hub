import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Results = lazy(async () => import('pages/Results'))
// const Match = lazy(async () => import('pages/Match'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Results />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
