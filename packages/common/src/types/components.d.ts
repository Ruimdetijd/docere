type SetActiveId = (id: string, listId: string, asideTab: import('../enum').AsideTab) => void

type ReactComponent = React.FunctionComponent<any>
type DocereComponents = Record<string, ReactComponent>

// type GetComponents = (config: DocereConfig) => DocereComponents

// TODO facsimile area is per entry, but it should be dependant on a facsimile
// TODO an entry has facsimiles with accompanying areas?
interface FacsimileArea {
	h: number
	id: string
	note?: Record<string, string>
	showOnHover?: boolean
	target?: {
		asideTab?: import('../enum').AsideTab
		color?: string,
		id: string,
		listId?: string,
	}
	unit?: 'px' | 'perc'
	w: number
	x: number
	y: number
}


type DocereComponentProps =
	Pick<EntryState, 'activeEntity' | 'activeFacsimile' | 'activeFacsimileAreas' | 'activeNote' | 'entry'> &
	{
		appDispatch: React.Dispatch<AppStateAction>
		attributes?: Record<string, string>
		children?: React.ReactNode
		components: DocereComponents
		config: DocereConfig
		entryDispatch: React.Dispatch<EntryStateAction>
		insideNote: boolean
		layer: TextLayer
	}

interface RsProps {
	active?: boolean,
	children: React.ReactNode
	// color?: string
	config: EntityConfig
	customProps: DocereComponentProps
	onClick?: (ev: any) => void
	revealOnHover?: boolean
	// icon?: RsType
}


// interface HiProps extends DocereComponentProps {
// 	rend: string
// }

