import React from 'react'
import { useComponents, DocereComponentContainer, usePage, DispatchContext } from '@docere/common'
import DocereTextView from '@docere/text'

import { LinkFooter, EntityWithLinkWrapper } from './link-wrapper'

import type { Entity } from '@docere/common'
import { EntityComponentProps, EntityWrapper } from './wrapper'


interface PageLinkProps {
	entity: Entity
	children: React.ReactNode
}
function PageLink(props: PageLinkProps) {
	// const history = useHistory()

	const goToPage = React.useCallback((ev: React.MouseEvent) => {
		ev.stopPropagation()

		// const urlObject = { pageId: props.entity.configId }
		// if (props.entity.id != null) urlObject.query = { entityId: new Set(props.entity.id) }

		// TODO Use dispatch? props.docereComponentProps.entryDispatch
		// navigate(urlObject)
	}, [props.entity])

	return (
		<LinkFooter
			entity={props.entity}
			onClick={goToPage}
		>
			{props.children}
		</LinkFooter>
	)
}

/**
 * Represents an entity in a text layer which is part of a {@link Page}.
 * 
 * A {@link Page} can be split in parts with the right configuration. This 
 * component shows a part of the page in a text layer. This can be used to
 * visualise (relatively simple and small sized) structured data.
 */
export const PagePartEntity = React.memo(function(props: EntityComponentProps) {
	const page = usePage(props.entity.configId)
	const components = useComponents(DocereComponentContainer.Page, page?.id)

	if (page == null) return null

	return (
		<EntityWrapper entity={props.entity}>
			<EntityWithLinkWrapper>
				<DocereTextView
					components={components}
					node={page.parts.get(props.entity.id)}
				/>
				<PageLink
					entity={props.entity}
				>
					Go to {page.title}
				</PageLink>
			</EntityWithLinkWrapper>
		</EntityWrapper>
	)
})
