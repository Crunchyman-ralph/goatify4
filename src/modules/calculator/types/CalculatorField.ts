export type CalculatorField = {
  id: string
  order: number
  type: string
  name: string
  label: string
  operation: string
  value: number
  group?: string | null
  groupDetail?: string | null
  groupOrder?: string | null
  currency?: string | null
  canBeDeleted?: boolean | null
}
