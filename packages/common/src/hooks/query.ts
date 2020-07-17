import React from 'react'
import { useLocation } from "react-router-dom"
import { UrlQuery } from '..'

function defaultUrlQuery(): UrlQuery {
	return {}
}

export default function useQuery() {
	const location = useLocation()
	const [query, setQuery] = React.useState<UrlQuery>(defaultUrlQuery())

	React.useEffect(() => {
		const nextQuery = defaultUrlQuery()
		for (const [key, value] of new URLSearchParams(location.search)) {
			if (key === 'ei') nextQuery.entityId = value
			if (key === 'ni') nextQuery.noteId = value
			if (key === 'fi') nextQuery.facsimileId = value
			if (key === 'li') nextQuery.lineId = value
		}
		setQuery(nextQuery)
	}, [location.search])

	return query 
}
