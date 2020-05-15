import React from 'react'
import styled from 'styled-components'
import { Entry, DocereConfig } from '@docere/common'
import { PanelsProps } from '..'
import ProjectContext from '../../../app/context'

import CollectionNavigatorController from './controller'

function useOpenSeadragonController(
	config: DocereConfig['collection'],
	searchUrl: ProjectContext['searchUrl'],
	dispatch: PanelsProps['appDispatch']
) {
	const [controller, setController] = React.useState<any>(null)

	React.useEffect(() => {
		import('openseadragon')
			.then(OpenSeadragon => {
				const viewer = OpenSeadragon.default({
					gestureSettingsMouse: {
						clickToZoom: false,
						scrollToZoom: false,
					},
					id: "osd_collection_navigator",
					prefixUrl: "/static/images/osd/",
					panVertical: false,
					showHomeControl: false,
					showZoomControl: false,
				})

				const collectionNavigatorController = new CollectionNavigatorController(viewer, config, searchUrl, dispatch)

				if (controller != null) controller.destroy()
				setController(collectionNavigatorController)
			})
	}, [])

	return controller
}

function useEntry(controller: CollectionNavigatorController, entry: Entry) {
	React.useEffect(() => {
		if (controller == null) return
		controller.setEntry(entry)
	}, [controller, entry])
}

const Container = styled.div`
	height: 64px;
`

interface Props {
	appDispatch: PanelsProps['appDispatch']
	entry: Entry
}
function CollectionNavigator(props: Props) {
	const context = React.useContext(ProjectContext)
	if (context.config.collection == null) return null

	const controller = useOpenSeadragonController(
		context.config.collection,
		context.searchUrl,
		props.appDispatch
	)
	useEntry(controller, props.entry)

	return (
		<Container
			id="osd_collection_navigator"
		/>
	)
}

export default React.memo(CollectionNavigator)
