import type { DocereConfig, Entity } from '@docere/common'

export default function extractTextData(doc: XMLDocument, _config: DocereConfig) {
	const selector = 'div[type="translation"] rs[type="pers"]'
	const entities: Map<string, Entity> = new Map()

	Array.from(doc.querySelectorAll(selector))
		.forEach(currEl => {
			currEl.getAttribute('type')
				.split(' ')
				.forEach(type => {
					const id = currEl.getAttribute('key')

					if (entities.has(id)) {
						const entity = entities.get(id)
						entity.count += 1
						entities.set(id, entity)
					}
					else {
						entities.set(
							id,
							{
								count: 1,
								id,
								type,
								value: currEl.textContent,
							}
						)
					}
				})
		})

	Array.from(doc.querySelectorAll('ref[target]'))
		.forEach(currEl => {
			// const [entryFilename, noteId] = currEl.getAttribute('target').split('#')
			// const type = noteId == null ? 'entry' : 'note'
			// const id = type === 'entry' ? entryFilename.slice(0, -4) : currEl.getAttribute('target')

			const id = currEl.getAttribute('target')
			const type = id.indexOf('#') > -1 ? 'note' : 'entry'

			if (entities.has(id)) {
				const entity = entities.get(id)
				entity.count += 1
				entities.set(id, entity)
			}
			else {
				entities.set(
					id,
					{
						count: 1,
						id,
						type,
						value: currEl.textContent,
					}
				)
			}
		})

	return Array.from(entities.values())
}

	// textData: [
	// 	{
	// 		color: '#fd7a7a',
	// 		id: 'person',
	// 		aside: true,
	// 		extractor: {
	// 			selector: 'div[type="translation"] rs[type="pers"]',
	// 			extractionType: TextDataExtractionType.Attribute,
	// 			idAttribute: '_key'
	// 		},
	// 		textLayers: ['translation'],
	// 	}
	// ],
