import { LayerType, EsDataType } from '@docere/common'
import { DocereConfig } from '@docere/common'
import sets from '../data/sets.json'
import extractPreparedLayer from './layers'
import extractFacsimiles from './facsimiles'
import plainText from './text'

const config: DocereConfig = {
	collection: {
		metadataId: 'setId',
		sortBy: null
	},
	data: { sets },
	slug: 'encyclopaedia-britannica',
	title: 'Encyclopaedia Britannica',
	entities: [
		{
			extract: layerElement => Array.from(layerElement.querySelectorAll('String[CONTENT][ID]'))
				.map((el: Element) => ({
					anchors: [el],
					element: el,
					id: el.getAttribute('ID'),
					content: el.getAttribute('VALUE'),
				})),
			id: 'string',
			revealOnHover: true,
			// textLayers: ['alto'],
		}
	],
	layers: [
		{
			id: 'scan',
			type: LayerType.Facsimile,
			active: false
		},
		{
			active: false,
			extractElement: extractPreparedLayer,
			id: 'prepared',
			type: LayerType.Text,
		},
		{
			extractFacsimiles,
			id: 'alto',
			type: LayerType.Text,
		},
	],
	metadata: [
		{
			extract: (entry, config) => {
				const [setId] = entry.id.split('/alto/')
				const set = config.data.sets.find((s: any) => s.setId === setId)
				return Object.keys(set)
					.filter(key => key.slice(0, 7) === 'access_')
					.map(key => set[key])
			},
			id: 'access',
			levels: 3,
			order: 10,
			title: 'Editions',
			datatype: EsDataType.Hierarchy,
		},
		{
			extract: entry => entry.id.split('/alto/')[1],
			id: 'n',
			showAsFacet: false,
		},
		{
			extract: entry => entry.id.split('/alto/')[0],
			id: 'setId',
			showAsFacet: false,
		},
	],
	plainText,
}

export default config
