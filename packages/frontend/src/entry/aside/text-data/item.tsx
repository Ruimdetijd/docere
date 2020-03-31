import * as React from 'react'
import styled from 'styled-components'
import { small } from '../../index.components'
import type { EntryStateAction, Entity } from '@docere/common'

const Li = styled.li`
	color: #CCC;
	cursor: pointer;
	height: 48px;
	line-height: 48px;
	padding-left: 1em;

	&:after {
		${small}
		color: #777;
		content: ${(props: { count: number }) => props.count > 1 ? `"(${props.count})"` : ''};
	}
`

interface Props {
	active: boolean
	dispatch: React.Dispatch<EntryStateAction>
	entity: Entity
}
export default function ItemInText(props: Props) {
	const handleClick = React.useCallback(() => {
		props.dispatch({ type: 'SET_ENTITY', id: props.entity.id })
	}, [props.entity])

	return (
		<Li
			count={props.entity.count}
			onClick={handleClick}
		>
			{props.entity.value}
		</Li>
	)
}
