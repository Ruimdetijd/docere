import React from 'react'
import styled from 'styled-components'
import { EntrySettingsContext, EntitiesContext, useUIComponent, UIComponentType, ComponentProps, ContainerContext, DispatchContext, useEntity } from '@docere/common'

import { useChildren } from './hooks'
import IconsByType from './icons'
import { EntityTooltip } from './entity-tooltip'

import type { Entity } from '@docere/common'

interface NWProps { openToAside: boolean }
const NoWrap = styled.span`
	display: inline-block;
	position: ${(props: NWProps) => props.openToAside ? 'static' : 'relative'};
	white-space: nowrap;
`

interface WProps { entity: Entity, active: boolean }
const Wrapper = styled.span`
	background-color: ${(props: WProps) => {
		return props.active ? props.entity.color : 'rgba(0, 0, 0, 0)'
	}};
	${(props: WProps) => 
		props.active ?
			`border-bottom: 3px solid ${props.entity.color};` :
			props.entity.revealOnHover ?
				`&:hover {
					border-bottom: 3px solid ${props.entity.color};
				}` :
				`border-bottom: 3px solid ${props.entity.color};`
	}
	color: ${props => props.active ? 'white' : 'inherit'};
	cursor: pointer;
	padding: 0 2px;

	svg.icon {
		height: .85em;
	}
`

// const defaultPreProps: Omit<PreProps, 'extractType'> = {
// 	extractKey: (props) => props.attributes.key,
// 	extractValue: (props) => props.children
// }

// interface PreProps {
// 	// extractType: ExtractEntityType
// 	extractKey?: ExtractEntityKey // Extract the entity ID 
// 	extractValue?: ExtractEntityValue // Extract the entity text content (not the note body!)
// 	PopupBody?: React.FC<PopupBodyProps>
// }

// export function getEntity(PopupBody?: React.FC<EntityComponentProps>) {
export const EntityTag = React.memo(function EntityComp(props: ComponentProps) {
	const dispatch = React.useContext(DispatchContext)
	const activeEntities = React.useContext(EntitiesContext)
	const settings = React.useContext(EntrySettingsContext)
	const container = React.useContext(ContainerContext)

	// const entityValue = preProps.extractValue(props)
	if (!settings['panels.text.showEntities']) return <span>{props.children}</span>

	const entity = useEntity(props.attributes['docere:id'])
	const [children, firstWord, restOfFirstChild] = useChildren(props.children, entity)

	const Component = useUIComponent(UIComponentType.Entity, entity?.configId)

	// The entity can be active, but without the need to show the tooltip.
	// In case there are several entities with the same ID, we only want to 
	// show the tooltip of the entity that was clicked. The others are highlighted,
	// but only the clicked entity shows its tooltip
	const [showTooltip, setShowTooltip] = React.useState(false)
	const [active, setActive] = React.useState(false)

	React.useEffect(() => {
		if (entity == null) return
		const nextActive = activeEntities?.has(entity.id)
		setActive(nextActive === true)
		if (!nextActive && showTooltip) setShowTooltip(false)
	}, [entity, activeEntities])

	const handleClick = React.useCallback(ev => {
		ev.stopPropagation()
		dispatch({
			type: 'ADD_ENTITY',
			entityId: entity.id,
			triggerContainer: container.type,
			triggerContainerId: container.id,
		})
		setShowTooltip(true)
	}, [entity?.id])

	if (entity == null) return null

	const Icon = IconsByType[entity.type]

	const openToAside = active && !settings['panels.text.openPopupAsTooltip']

	return (
		<Wrapper
			active={active}
			data-entity-id={entity.id}
			entity={entity}
			onClick={handleClick}
		>
			<NoWrap
				openToAside={openToAside}
			>
				{
					Icon != null &&
					<Icon
						active={active}
						entity={entity}
					/>
				}
				{firstWord}
				{
					active &&
					showTooltip &&
					<EntityTooltip
						entity={entity}
						settings={settings}
					>
						<Component entity={entity} />
					</EntityTooltip>
				}
			</NoWrap>
			{restOfFirstChild}
			{children.slice(1)}
		</Wrapper>
	)
})
// }

						// <EntityWrapper
						// 	entity={entity}
						// 	isPopup={openToAside}
						// 	PopupBody={PopupBody}
						// />
