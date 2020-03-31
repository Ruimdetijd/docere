import type { FacetsData, FacetConfigBase } from './facets'
import { SortDirection, SearchTab } from '../../enum'

export * from './facets-data.action'
export * from './facets'

export interface AppProps {
	autoSuggest?: (query: string) => Promise<string[]>
	className?: string /* className prop is used by StyledComponents */
	disableDefaultStyle?: boolean
	excludeResultFields?: string[]
	fields: FacetConfigBase[]
	onClickResult: (result: any, ev: React.MouseEvent<HTMLLIElement>) => void
	resultFields?: string[]
	ResultBodyComponent: React.FC<ResultBodyProps>
	resultBodyProps?: Record<string, any>
	resultsPerPage?: number
	track_total_hits?: number
	url: string
}

// type Filters = Map<string, Set<string>>

export type SortOrder = Map<string, SortDirection>
export type SetSortOrder = (sortOrder: SortOrder) => void

export type ElasticSearchRequestOptions = Pick<AppProps, 'excludeResultFields' | 'resultFields' | 'resultsPerPage'> & {
	currentPage: number
	facetsData: FacetsData
	query: string
	sortOrder: SortOrder
	track_total_hits: number
}

export interface Hit {
	// facsimiles?: { id: string, path: string[] }[]
	id: string
	snippets: string[]
	[key: string]: any
}

export interface FSResponse {
	results: Hit[]
	total: number
}

// interface ParsedResponse {
// 	aggregations: { [id: string]: any}
// 	hits: any[]
// 	total: number
// }

// interface SearchResults {
// 	hits: Hit[]
// 	id?: string
// 	query?: Object
// 	total: number
// }

export interface ActiveFilter {
	id: string
	title: string
	values: string[]
}

export interface ResultBodyProps {
	result: Hit
}

export interface DocereResultBodyProps extends ResultBodyProps {
	activeId: string
	children?: React.ReactNode
	searchTab: SearchTab
}

