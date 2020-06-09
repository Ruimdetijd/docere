import english from './en'

export type LanguageMap = Record<keyof typeof english, string>

const dutch: LanguageMap = {
	active: 'actief',
	clear: "Leeg maken",
	filter: "Filter",
	filters: "Filters",
	highest_first: "Hoogste eerst",
	lowest_first: "Laagste eerst",
	of: "van",
	order: "Volgorde",
	remove_filter: "Verwijder filter",
	result: "Resultaat",
	results: "Resultaten",
	search_documents: "zoek documenten",
	sort_by: 'sorteren',
	view_more: 'Toon meer',
	view_less: 'Toon minder',
}

export default dutch
