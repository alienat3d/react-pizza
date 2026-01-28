import {createSlice, PayloadAction} from '@reduxjs/toolkit'

// 22.1 Здесь мы типизируем слайс "filter":

// 1. Define the shape of your state
export interface FilterState {
    categoryName: string
    currentPage: number
    sortingDirection: 'asc' | 'desc'
    sortingTypeId: number
}

// 2. Define the payload for setFilters (since it handles string conversion)
// Incoming values from URLs are often strings, so we allow string | number here.
interface FilterParams {
    categoryName: string
    currentPage: string | number
    sortingTypeId: string | number
    sortingDirection: string
    searchValue: string
}

// 3. Apply the interface to initialState
const initialState: FilterState = {
    categoryName: 'all',
    currentPage: 1,
    sortingDirection: 'asc',
    sortingTypeId: 0,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // 4. Type the 'action' for each reducer
        setCategoryName(state, action: PayloadAction<string>) {
            state.categoryName = action.payload
        },
        setPageNumber(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setSortingDirection(state, action: PayloadAction<'asc' | 'desc'>) {
            state.sortingDirection = action.payload
        },
        setSortingTypeId(state, action: PayloadAction<number>) {
            state.sortingTypeId = action.payload
        },
        // This one is special because you accept an object
        setFilters(state, action: PayloadAction<FilterParams>) {
            state.categoryName = action.payload.categoryName
            state.currentPage = Number(action.payload.currentPage)
            state.sortingTypeId = Number(action.payload.sortingTypeId)
            // We assume the string is valid, or you could add validation here
            state.sortingDirection = action.payload.sortingDirection as 'asc' | 'desc'
        }
    },
})

export const {setCategoryName, setPageNumber, setSortingDirection, setSortingTypeId, setFilters} = filterSlice.actions

export default filterSlice.reducer