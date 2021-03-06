import React from 'react'

import Value from './value'

import { ListMetadata, ListFacetData, SearchContext } from '@docere/common'

interface Props {
	metadataItem: ListMetadata // | Entity
}
export default function ListFacetValue(props: Props) {
	const searchContext = React.useContext(SearchContext)
	const { facets } = searchContext.state

	const handleSetSearchFilter = React.useCallback(ev => {
		ev.stopPropagation()

		const { facetId, value } = ev.currentTarget.dataset
		const type: 'ADD_FILTER' | 'SET_FILTER' | 'REMOVE_FILTER' = ev.currentTarget.dataset.type

		searchContext.dispatch({
			type,
			facetId,
			value
		})
	}, [])

	const { id, value } = props.metadataItem

	const filters = facets.get(id)?.filters as ListFacetData['filters']

	return Array.isArray(value) ?
		<>
			{
				value.length === 0 ?
				'-' :
				value.map(v =>
					<Value
						active={filters?.has(v)}
						id={id}
						key={`${id}${v}`}
						onClick={handleSetSearchFilter}
					>
						{v}
					</Value>
				)
			}
		</> :
		<Value
			active={filters?.has(value)}
			id={id}
			onClick={handleSetSearchFilter}
		>
			{value}
		</Value>
}
