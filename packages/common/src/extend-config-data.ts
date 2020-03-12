import { Colors, EsDataType, RsType } from './enum'

const defaultConfig: DocereConfig = {
	metadata: [],
	notes: [],
	pages: [],
	searchResultCount: 20,
	slug: 'unknown-project',
	title: 'Unknown project',
	entities: [],
	layers: []
}

export const defaultMetadata: MetadataConfig = {
	datatype: EsDataType.Keyword,
	id: null,
	// TODO fixate the order number, which means: if there is no order than increment the order number: 999, 1000, 1001, 1002 (import for example the sort setting in the FS)
	order: 9999,
	showAsFacet: true,
	showInAside: true,
}

const defaultEntity: EntityConfig = {
	...defaultMetadata,
	color: Colors.Blue,
	type: RsType.None,
}

const defaultDocereFunctions: DocereConfigFunctions = {
	prepareDocument: function prepareDocument(doc) { return doc },
	extractEntities: function extractEntities(_doc) { return [] },
	extractFacsimiles: function extractFacsimiles(_doc) { return [] },
	extractMetadata: function extractMetadata(_doc) { return {} },
	extractNotes: function extractNotes(_doc) { return [] },
	extractText: function extractText(doc) { return doc.documentElement.textContent },
	extractLayers: function extractTextLayers(_doc) { return [] }
}

function setTitle<T extends FacetConfigBase>(entityConfig: T): T {
	if (entityConfig.title == null) {
		entityConfig.title = entityConfig.id.charAt(0).toUpperCase() + entityConfig.id.slice(1)
	}
	return entityConfig
}

function setPath(page: PageConfig) {
	if (page.path == null) page.path = `${page.id}.xml`
	return page
}

export default function extendConfigData(configDataRaw: DocereConfigDataRaw): DocereConfigData {
	const config = {...defaultConfig, ...configDataRaw.config}
	config.layers = config.layers.map(setTitle)

	config.metadata = config.metadata.map(md => {
		const metadataConfig = {...defaultMetadata, ...md} as MetadataConfig
		return setTitle(metadataConfig)
	})

	config.entities = config.entities.map(td => {
		const textDataConfig = {...defaultEntity, ...td } as EntityConfig
		if (!Array.isArray(td.textLayers)) {
			textDataConfig.textLayers = config.layers.map(tl => tl.id)
		}
		return setTitle(textDataConfig)
	})

	config.notes = config.notes.map(setTitle)
	config.pages = config.pages.map(page => {
		if (Array.isArray(page.children)) {
			page.children = page.children.map(p => setTitle(setPath(p)))
		}
		return setTitle(setPath(page))
	})

	return {
		getComponents: () => async () => null, /* default to null and an object because of React reference checking */
		getUIComponent: () => async () => null,
		...defaultDocereFunctions,
		...configDataRaw,
		config,
	}
}
