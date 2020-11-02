import { getQueryString, getPath } from "@docere/common"
import { indexOfIterator } from '@docere/common/src/utils'

describe('Common', () => {
	describe('URL', () => {
		describe('Get paths', () => {
			it('Should handle getPath', () => {
				expect(() => getPath(null)).toThrow('[getPath] Project ID cannot be null')
				expect(() => getPath({ projectId: null })).toThrow('[getPath] Project ID cannot be null')
				expect(getPath({ projectId: 'p' })).toBe('/projects/p')
				expect(getPath({ projectId: 'p', entryId: 'e' })).toBe('/projects/p/entries/e')
				expect(getPath({ projectId: 'p', pageId: 'a' })).toBe('/projects/p/pages/a')
				expect(getPath({ projectId: 'p', entryId: 'e', query: null })).toBe('/projects/p/entries/e')
				expect(getPath({ projectId: 'p', entryId: 'e', query: {} })).toBe('/projects/p/entries/e')
				expect(getPath({ projectId: 'p', entryId: 'e', query: { facsimileId: new Set(['f']) } })).toBe('/projects/p/entries/e?fi=f')
				expect(getPath({ projectId: 'p', entryId: 'e', query: { facsimileId: new Set(['f']), lineId: new Set(['l']) } })).toBe('/projects/p/entries/e?fi=f&li=l')
			})

			it('Should handle getQueryString', () => {
				expect(getQueryString(null)).toBe('')
				expect(getQueryString({})).toBe('')
				expect(getQueryString({ entityId: new Set(['12']) })).toBe('?ei=12')
				expect(getQueryString({ entityId: new Set(['12', '13']) })).toBe('?ei=12&ei=13')
				expect(getQueryString({ entityId: new Set(['12', '13', '14']) })).toBe('?ei=12&ei=13&ei=14')
				expect(getQueryString({ entityId: new Set(['12', '13']), facsimileId: new Set(['14']) })).toBe('?ei=12&ei=13&fi=14')
				expect(getQueryString({ entityId: new Set(['13']), facsimileId: new Set(['14']), blockId: new Set(['15']) })).toBe('?ei=13&fi=14&bi=15')
				expect(getQueryString({ entityId: new Set(['13']), facsimileId: new Set(['14']), blockId: new Set(['15']), lineId: new Set(['16']) })).toBe('?ei=13&fi=14&bi=15&li=16')
			})
		})
	})

	describe('Utils', () => {
		it('Should get the index of an iterable (Set or keys of Map)', () => {
			const set = new Set([1, 2, 3, 4])
			expect(indexOfIterator(set, 1)).toBe(0)
			expect(indexOfIterator(set, 2)).toBe(1)
			expect(indexOfIterator(set, 3)).toBe(2)
			expect(indexOfIterator(set, 4)).toBe(3)
			expect(indexOfIterator(set, 0)).toBe(null)
			expect(indexOfIterator(set, 5)).toBe(null)
			expect(indexOfIterator(set, null)).toBe(null)

			const map = new Map([['a1', 1], ['a2', 2], ['a3', 3], ['a4', 4]])
			expect(indexOfIterator(map, 'a1')).toBe(0)
			expect(indexOfIterator(map, 'a2')).toBe(1)
			expect(indexOfIterator(map, 'a3')).toBe(2)
			expect(indexOfIterator(map, 'a4')).toBe(3)
			expect(indexOfIterator(map, 'a0')).toBe(null)
			expect(indexOfIterator(map, 'a5')).toBe(null)
			expect(indexOfIterator(map, null)).toBe(null)
		})
	})
})
