import React from 'react'
import styled from 'styled-components'
import { LbCommon, Pb } from '@docere/text-components'

import { DocereConfig, ComponentProps, DispatchContext, useEntity, DocereComponentContainer, LayerContext, EntitiesContext, Colors } from '@docere/common'

const ColumnWrapper = styled.div`
	margin-bottom: 1rem;
`

function Column(props: ComponentProps) {
	return (
		<ColumnWrapper>
			<Pb {...props} />	
			{props.children}
		</ColumnWrapper>
	)
}

const LbWrapper = styled.div`
	& > div:first-of-type {
		${LbCommon}
		cursor: pointer;
		${(props: { active: boolean }) =>
			props.active ?
				`background-color: ${Colors.Orange};
				color: white;` :
				''
		}
	}
`

function RepublicLb(props: ComponentProps) {
	const dispatch = React.useContext(DispatchContext)
	const layer = React.useContext(LayerContext)
	const activeEntities = React.useContext(EntitiesContext)

	const entity = useEntity(props.attributes['docere:id'])

	const handleClick = React.useCallback(ev => {
		ev.stopPropagation()
		dispatch({
			type: 'ADD_ENTITY',
			entityId: entity.id,
			triggerContainer: DocereComponentContainer.Layer,
			triggerContainerId: layer.id
		})
	}, [entity?.id])

	if (entity == null) return null

	return (
		<LbWrapper active={activeEntities.has(entity.id)}>
			<div
				onClick={handleClick}
			>
				{entity.n}
			</div>
			{props.children}
		</LbWrapper>
	)
}

export default function (_config: DocereConfig) {
	return {
		TextLine: styled.div``,
		TextRegion: styled.div``,
		column: Column,
		line: RepublicLb,
	}
}
