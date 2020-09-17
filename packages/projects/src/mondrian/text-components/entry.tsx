import React from 'react'
import styled from 'styled-components'
import { getNote, getPb, Lb, Hi, Paragraph, getEntity, PagePartPopupBody, PopupBodyWrapper, PopupBodyLink } from '@docere/text-components'
import { Colors, DEFAULT_SPACING } from '@docere/common'

import type { DocereComponentProps, DocereConfig } from '@docere/common'

function xml2json(xml: string) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(xml, 'application/xml')
	const imgUrl = doc.querySelector('*|Image').getAttribute('rdf:about')
	const title = doc.querySelector('*|Description *|title[*|lang="en"]').textContent
	const created = doc.querySelector('*|Description *|created[*|lang="en"]').textContent
	const creator = doc.querySelector('*|Description *|creator[*|lang="en"]').textContent
	const artform = doc.querySelector('*|VisualArtwork *|artform[*|lang="en"]').textContent
	const coverage = doc.querySelector('*|Description *|coverage').textContent

	return {
		artform,
		coverage,
		imgUrl,
		title,
		created,
		creator
	}
}

async function getRkdImage(id: string) {
	const url = `/api/rkdimages/${id}`
	const response = await fetch(url)
	return await response.text()
}

function useRkdImage(id: string) {
	const [rkdImage, setRkdImage] = React.useState(null)
	React.useEffect(() => {
		let unmounted = false

		getRkdImage(id).then(xml => {
			const json = xml2json(xml)
			if (!unmounted) setRkdImage(json)
		})

		return () => unmounted = true
	}, [id])
	return rkdImage
}

const Wrapper = styled.div`
	display: grid;
	grid-template-rows: 32px auto;
	grid-template-columns: fit-content(0) auto;
	grid-column-gap: 1rem;
	grid-row-gap: .5rem;
	padding: 1rem;

	h2 {
		grid-column: 1 / -1;
		padding: 0;
		margin: 0;

		small {
			color: #AAA;
			font-weight: normal;
			margin-left: .5rem;
		}
	}

	img {
		max-height: ${DEFAULT_SPACING * 3}px;
		max-width: ${DEFAULT_SPACING * 3}px;
	}
`

function RkdArtworkPopupBody(props: DocereComponentProps) {
	if (props.activeEntity == null) return null
	const rkdImage = useRkdImage(props.activeEntity.id)
	if (rkdImage == null) return null

	return (
		<PopupBodyWrapper>
			<Wrapper>
				<h2>{rkdImage.title} <small>{rkdImage.created}</small></h2>
				<img src={rkdImage.imgUrl} />
				<div>
					<div>{rkdImage.creator}</div>
					<div>{rkdImage.coverage}</div>
				</div>
			</Wrapper>
			<PopupBodyLink entityConfig={props.activeEntity.config}>
				<a
					href={`https://rkd.nl/en/explore/images/${props.activeEntity.id}`} target="_blank"
					onClick={ev => ev.stopPropagation()}
				>
					source: RKD.nl
				</a>
			</PopupBodyLink>
		</PopupBodyWrapper>
	)
}

function MondrianLb(props: DocereComponentProps) {
	return (
		<>
			<Lb {...props} />
			{
				props.entrySettings['panels.text.showLineBeginnings'] &&
				props.attributes.rend?.indexOf('indent') > -1 &&
				<span>&nbsp;&nbsp;</span>
			}
		</>
	)
}

export default async function entryComponents(_config: DocereConfig) {
	return {
		// Show <add> in green in the diplomatic version and in default color in the read version
		add: styled.span`
			color: ${(props: DocereComponentProps) => props.entrySettings['panels.text.showLineBeginnings'] ? Colors.Green : 'initial'};
		`,
		// Show <del> in red in the diplomatic version and hide in the read version
		del: styled.span`
			color: ${Colors.Red};
			display: ${(props: DocereComponentProps) => props.entrySettings['panels.text.showLineBeginnings'] ? 'inline' : 'none'};
		`,
		lb: MondrianLb,
		pb: getPb(props => props.attributes.facs?.slice(1)),
		ptr: getNote(props => props.attributes.target.slice(1)),
		hi: Hi,
		p: Paragraph,
		'ref[target^="bio.xml#"]': getEntity({
			// extractType: () => 'bio',
			extractKey: props => /^bio\.xml#(.*)$/.exec(props.attributes.target)[1],
			PopupBody: PagePartPopupBody
		}),
		'ref[target^="biblio.xml#"]': getEntity({
			// extractType: () => 'biblio',
			extractKey: props => /^biblio\.xml#(.*)$/.exec(props.attributes.target)[1],
			PopupBody: PagePartPopupBody
		}),
		'rs[type="artwork-m"][key]': getEntity({
			// extractType: () => 'rkd-artwork-link',
			extractKey: props => props.attributes.key,
			PopupBody: RkdArtworkPopupBody
		}),
	}

}