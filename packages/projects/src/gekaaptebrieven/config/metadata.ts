import type { ExtractedEntry } from '@docere/common'

function extractMultiple(entry: ExtractedEntry, selector: string) {
	return entry.document.querySelector(selector)?.textContent
		.split(/;|\//)
		.map(part => part.trim())
		.filter(part => part.length > 0)
}

export function extractLanguages(entry: ExtractedEntry) {
	return extractMultiple(entry, 'meta[type="languages"]')
}

export function extractTextTypes(entry: ExtractedEntry) {
	return extractMultiple(entry, 'meta[type="texttypes"]')
}


// export default function extractMetadata(entry: ConfigEntry) {
// 	const selector = "meta"
// 	let els = entry.document.querySelectorAll(selector)
// 	const metadata: ExtractedMetadata = {}
// 	Array.from(els).forEach(el => {
// 		metadata[el.getAttribute('type')] = el.getAttribute('value')
// 	})

// 	// Add has_date boolean
// 	metadata.has_date = metadata.hasOwnProperty('date') && metadata.date !== '' && metadata.date != null

// 	// Add a sender_or_recipient array
// 	const persons = []
// 		.concat(metadata.sender, metadata.recipient)
// 		.filter(p => p != null)
// 	metadata.sender_or_recipient = persons

// 	function split(key: string) {
// 		const values = (metadata[key] as string)
// 		metadata[key] = [...new Set(values)]
// 	}

// 	split('texttypes')
// 	split('languages')

// 	return metadata
// }
