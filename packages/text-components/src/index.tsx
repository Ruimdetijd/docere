import styled from 'styled-components'

import getPb from './pb'
import Popup from './popup'
import Rs, { EntityWrapper } from './rs'
import Tooltip, { TooltipBody } from './tooltip'

const Hi = styled.span`
	${(props: DocereComponentProps) => {
		if (!props.attributes.hasOwnProperty('rend')) return ''
		const has = (rendStyle: string) => props.attributes.rend.indexOf(rendStyle) > -1
		const rules = []
		if (has('underline')) rules.push('text-decoration: underline;')
		if (has('super')) rules.push('font-style: italic;')
		if (has('italic') || has('i')) rules.push('font-style: italic;')
		return rules.join('')
	}}
`

const Lb = styled.span`
	display: block;

	&:before {
		box-sizing: border-box;
		color: #666;
		content: counter(linenumber);
		counter-increment: linenumber;
		font-size: .8em;
		position: absolute;
		text-align: right;
		width: 42px;
		margin-left: -48px;
		padding-right: 8px;
	}
`

export {
	EntityWrapper,
	getPb,
	Hi,
	Lb,
	Popup,
	Rs,
	Tooltip,
	TooltipBody
}
