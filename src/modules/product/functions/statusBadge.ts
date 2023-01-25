import { Status } from '../../../../_generated_/types'

export function statusBadgeClassName(
  status: Status | null | undefined
): string {
  switch (status) {
    case 'ACTIVE':
      return 'badge-success'
    case 'DRAFT':
      return 'badge-info'
    case 'ARCHIVED':
      return ''
    default:
      return 'badge-success'
  }
}

export function statusBadgeLabel(status: Status | null | undefined): string {
  switch (status) {
    case 'ACTIVE':
      return 'Actif'
    case 'DRAFT':
      return 'Ébauche'
    case 'ARCHIVED':
      return 'Archivé'
    default:
      return 'Actif'
  }
}
