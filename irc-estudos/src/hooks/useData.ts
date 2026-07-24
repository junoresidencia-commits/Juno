import { useContext } from 'react'
import { DataContext, type DataApi } from './data-context'

export type { DataApi }

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
