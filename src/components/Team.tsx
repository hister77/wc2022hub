import type { ReactElement } from 'react'
import type { ITeam } from 'types'

function Name({ abbr }: { abbr: string }): ReactElement {
	return <span className='block h-fit'>{abbr}</span>
}
function Picture({ picture }: { picture: string }): ReactElement {
	return (
		<img
			className='object-none'
			src={picture.replace(/{format}-{size}/, 'sq-1')}
			alt=''
		/>
	)
}

export default function Team({
	team,
	Home = true
}: {
	team: ITeam
	Home: boolean
}): ReactElement {
	const { IdCountry, PictureUrl } = team
	return (
		<div className='flex flex-row justify-end gap-2'>
			{Home ? (
				<>
					<Name abbr={IdCountry} /> <Picture picture={PictureUrl} />
				</>
			) : (
				<>
					<Picture picture={PictureUrl} /> <Name abbr={IdCountry} />
				</>
			)}
		</div>
	)
}
