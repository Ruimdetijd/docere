type PanelsProps =
	EntryProps &
	EntryState &
	{
		entryDispatch: React.Dispatch<EntryStateAction>
	}

type TextPanelBaseProps = Pick<PanelsProps, 'activeEntity' | 'activeNote' | 'activeFacsimile' | 'activeFacsimileAreas' | 'appDispatch' | 'entryDispatch' | 'entry' | 'searchQuery' | 'settings'>
interface TextPanelProps extends TextPanelBaseProps {
	layer: TextLayer
}

type WitnessAnimationPanelProps = TextPanelProps
