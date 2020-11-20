import { extendConfigData } from '@docere/common'
import { LayerType, EsDataType } from '@docere/common'
import extractFacsimiles from './facsimiles'

export default extendConfigData({
	slug: 'republic',
	title: 'Republic',
	collection: {
		metadataId: 'inventory_num',
		sortBy: 'inventory_num',
	},
	metadata: [
		{
			datatype: EsDataType.Date,
			extract: entry =>
				entry.document.querySelector('meta[key="meeting_date"]')?.getAttribute('value'),
			id: 'date',
			interval: 'y'
		},
		{
			extract: entry =>
				entry.document.querySelector('meta[key="inventory_num"]')?.getAttribute('value'),
			id: 'inventory_num',
		}	
	],
	entities: [],
	layers: [
		{
			id: 'scan',
			type: LayerType.Facsimile
		},
		{
			extractFacsimiles,
			id: 'text',
			type: LayerType.Text
		},
	]
})
