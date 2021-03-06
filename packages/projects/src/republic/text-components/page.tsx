import React from 'react'
import styled from 'styled-components'
import { EntityTag, LbCommon } from '@docere/text-components'

import { DocereConfig, ComponentProps, DispatchContext, useEntity, EntitiesContext, ContainerContext } from '@docere/common'

const LbWrapper = styled.div`
	& > div:first-of-type {
		${LbCommon}
		cursor: pointer;
		${(props: { active: boolean, color: string }) =>
			props.active ?
				`background-color: ${props.color};
				color: white;` :
				''
		}
	}
`

function RepublicLb(props: ComponentProps) {
	const dispatch = React.useContext(DispatchContext)
	const container = React.useContext(ContainerContext)
	const activeEntities = React.useContext(EntitiesContext)

	const entity = useEntity(props.attributes['docere:id'])

	const handleClick = React.useCallback(ev => {
		ev.stopPropagation()
		dispatch({
			type: 'ADD_ENTITY',
			entityId: entity.id,
			triggerContainer: container.type,
			triggerContainerId: container.id,
		})
	}, [entity?.id])

	if (entity == null) return null

	return (
		<LbWrapper
			active={activeEntities.has(entity.id)}
			color={entity.color}
			data-entity-id={entity.id}
		>
			<div
				onClick={handleClick}
			>
				{entity.n}
			</div>
		</LbWrapper>
	)
}

export default function (_config: DocereConfig) {
	return {
		attendant: EntityTag,
		line: RepublicLb,
		attendance_list: AttendanceList,
		resolution: Resolution,
		paragraph: styled.div`
			margin-bottom: 1rem;
		`
	}
}

function AttendanceList(props: ComponentProps) {
	return (
		<SessionPart
			{...props}
			color="green"
			title="Attendance list"
		>
			{props.children}
		</SessionPart>	
	)
}

function Resolution(props: ComponentProps) {
	return (
		<SessionPart
			{...props}
			color="orange"
			title="Resolution"
		>
			{props.children}
		</SessionPart>	
	)
}


function SessionPart(props: ComponentProps & { color: string, title: string }) {
	const [active, setActive] = React.useState(false)

	return (
		<ResolutionWrapper
			color={props.color}
		>
			<h4 onClick={() => setActive(!active)}>{props.title}</h4>
			{
				active &&
				props.children
			}
		</ResolutionWrapper>
	)
}

const ResolutionWrapper = styled.div`
	h4 {
		color: ${props => props.color};
		cursor: pointer;
	}
`
