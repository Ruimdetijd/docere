import { ProjectState, SetFacsimile, Entry, ActiveFacsimile, ID, ContainerType } from '@docere/common'

export function createActiveFacsimile(
	entry: Entry,
	facsimileId: ID,
	triggerContainer?: ContainerType,
	triggerContainerId?: ID,
): ActiveFacsimile {
	return {
		...entry.textData.facsimiles.get(facsimileId),
		triggerContainer,
		triggerContainerId,
	}
}

export function setFacsimile(state: ProjectState, action: SetFacsimile): ProjectState {
	return {
		...state,
		activeFacsimile: createActiveFacsimile(state.entry, action.facsimileId, action.triggerContainer, action.triggerContainerId)
	}
}
