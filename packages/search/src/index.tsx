import React from 'react'
import { EsDataType, SortBy, SortDirection } from '@docere/common'

import languageMaps from './language'
import SearchContext from './facets-context'
import useSearchReducer from './facets-context/reducer'
import Context, { defaultFacetedSearchProps } from './context'
import App from './app'

import type { FacetsConfig, FacetedSearchProps, ResultBodyProps } from '@docere/common'
import GenericResultBody from './views/search-result/generic-result-body'

export * from './utils'
export * from './date.utils'
export {
	EsDataType,
	SearchContext,
	SortBy,
	SortDirection,
	useSearchReducer,
}
export type {
	FacetsConfig,
}

export type {
	FacetedSearchProps,
	ResultBodyProps
}

export default function FacetedSearch(props: FacetedSearchProps) {
	const value = { ...defaultFacetedSearchProps, ...props}
	if (value.ResultBodyComponent == null) value.ResultBodyComponent = GenericResultBody

	return (
		<Context.Provider value={{ ...value, i18n: languageMaps[value.language] }}>
			<App />
		</Context.Provider>
	)
}
