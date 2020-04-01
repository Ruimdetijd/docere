import * as React from 'react'
import Facet from '../facet'
import RangeFacetBody from './body'
import type { RangeFacetData, FacetsDataReducerAction, RangeFacetValues } from '@docere/common'

export interface RangeFacetProps {
	facetData: RangeFacetData
	facetsDataDispatch: React.Dispatch<FacetsDataReducerAction>
	values: RangeFacetValues
}
function RangeFacetView(props: RangeFacetProps) {
	return (
		<Facet
			facetProps={props}
		>
			{
				props.values.length > 0 &&
				<RangeFacetBody { ...props } />
			}
		</Facet>
	)
}

RangeFacetView.defaultProps = {
	values: []
}

export default React.memo(RangeFacetView)