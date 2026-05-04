export type Isp = {
  id: string
  name: string
  logoUrl: string
  selectable: boolean
}

export const ISP_LIST: Isp[] = [
  {
    id: 'iqfiber',
    name: 'IQ Fiber',
    logoUrl:
      'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0c9abbccf0a51770761bc_logo-iqfiber.png',
    selectable: true,
  },
  {
    id: 'resound',
    name: 'Resound Networks',
    logoUrl:
      'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03c0735118df0c21dc5_logo-resound.png',
    selectable: false,
  },
  {
    id: 'vistabeam',
    name: 'Vistabeam',
    logoUrl:
      'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03cfcd3e7bba80f5bcb_logo-vistabeam.png',
    selectable: false,
  },
  {
    id: 'directcomm',
    name: 'Direct Communications',
    logoUrl:
      'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03858560196ce1215ac_logo-directcomm.png',
    selectable: false,
  },
  {
    id: 'intellipop',
    name: 'Intellipop',
    logoUrl:
      'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03870c80f7c0964b6ab_logo-intellipop.png',
    selectable: false,
  },
  {
    id: 'lilaconnect',
    name: 'LilaConnect',
    logoUrl: 'https://logo.clearbit.com/lilaconnect.com',
    selectable: false,
  },
  {
    id: 'ting',
    name: 'Ting Internet',
    logoUrl: 'https://logo.clearbit.com/ting.com',
    selectable: false,
  },
  {
    id: 'nextlink',
    name: 'Nextlink Internet',
    logoUrl: 'https://logo.clearbit.com/nextlink.com',
    selectable: false,
  },
  {
    id: 'crestview',
    name: 'Crestview Networks',
    logoUrl: 'https://logo.clearbit.com/crestviewnetworks.com',
    selectable: false,
  },
  {
    id: 'wisper',
    name: 'Wisper Internet',
    logoUrl: 'https://logo.clearbit.com/wisperisp.com',
    selectable: false,
  },
]

export const IQ_FIBER = ISP_LIST[0]

const FALLBACK_PALETTE = [
  '#6366F1', // indigo
  '#14B8A6', // teal
  '#F59E0B', // amber
  '#F43F5E', // rose
  '#10B981', // emerald
  '#8B5CF6', // violet
]

export function ispFallbackColor(id: string): string {
  let sum = 0
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i)
  return FALLBACK_PALETTE[sum % FALLBACK_PALETTE.length]
}

export function ispInitials(name: string): string {
  return name.trim().slice(0, 2).toUpperCase()
}
