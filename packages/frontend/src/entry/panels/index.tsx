import * as React from 'react'
import styled from 'styled-components'
import { DEFAULT_SPACING, getTextPanelWidth, Colors, LayerType } from '@docere/common'

import { isTextLayer } from '../../utils'
import Panel from './panel'

import type { DocereConfig, Entity, Layer, Note, EntryState, EntryStateAction } from '@docere/common'
import type { EntryProps } from '..'

interface WProps {
	activeEntity: Entity
	activeNote: Note
	pinnedLayers: Layer[]
	settings: DocereConfig['entrySettings']
}
const Wrapper = styled.div`
	background: ${Colors.GreyLight};
	display: grid;
	${(p: WProps) => {
		// Set panel width in entry reducer?
		const tpw = getTextPanelWidth(p.settings, p.activeNote, p.activeEntity)

		let columns = p.pinnedLayers
			.map(layer => {
				return isTextLayer(layer) ?
					`${tpw}px` :
					`minmax(${DEFAULT_SPACING * 10}px, auto)`
			})
			.join(' ')

		return `
			grid-template-columns: auto ${columns};
		`
	}}
	grid-column-gap: ${DEFAULT_SPACING / 2}px;
	height: 100%;
	width: 100%;
`

const PanelsCommon = styled.div`
	background: white;
	display: grid;
	grid-template-rows: 100% auto;
	height: 100%;
	overflow-x: auto; 
`

interface PWProps {
	activeEntity: Entity
	activeLayers: Layer[]
	activeNote: Note
	settings: DocereConfig['entrySettings']
}
const ActivePanels = styled(PanelsCommon)`
	${(p: PWProps) => {
		// Set panel width in entry reducer?
		const tpw = getTextPanelWidth(p.settings, p.activeNote, p.activeEntity)
		const hasFacsimile = p.activeLayers.some(l => l.type === LayerType.Facsimile)

		let columns = p.activeLayers
			.map(layer => {
				return isTextLayer(layer) ?
					hasFacsimile ? `${tpw}px` : `minmax(${tpw}px, 1fr)` :
					`minmax(${DEFAULT_SPACING * 10}px, auto)`
			})
			.join(' ')

		return `
			grid-template-columns: ${columns};
		`
	}}

	& > header {
		height: ${DEFAULT_SPACING}px;
		display: grid;
		align-content: center;
		padding: 0 ${DEFAULT_SPACING}px;
		font-size: .8rem;
		background: gray;
		color: white;
		text-transform: uppercase;
		border-right: 2px solid #4a4a4a;
	}
`

const PinnedPanels = styled(PanelsCommon)`
`

export type PanelsProps = EntryProps & EntryState & {
	entryDispatch: React.Dispatch<EntryStateAction>
}

function Panels(props: PanelsProps) {
	const activeLayers = props.layers.filter(layer => layer.active && !layer.pinned)
	const pinnedLayers = props.layers.filter(layer => layer.pinned)

	return (
		<Wrapper
			activeEntity={props.activeEntity}
			activeNote={props.activeNote}
			id="panels"
			pinnedLayers={pinnedLayers}
			settings={props.settings}
		>
			<ActivePanels
				activeLayers={activeLayers}
				activeEntity={props.activeEntity}
				activeNote={props.activeNote}
				id="active-panels"
				settings={props.settings}
			>
				{
					activeLayers
						.map(layer =>
							<Panel
								{...props}
								key={layer.id}
								layer={layer}
							/>
						)
				}
			</ActivePanels>
			{
				pinnedLayers.length > 0 &&
				<PinnedPanels
					id="pinned-panels"
				>
					{
						pinnedLayers
							.map(layer =>
								<Panel
									{...props}
									key={layer.id}
									layer={layer}
								/>
							)
					}
				</PinnedPanels>
			}
		</Wrapper>
	)
}

export default React.memo(Panels)
