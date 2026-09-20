export type Product = {
  id: string
  name: string
  type: string
  price: string
  slug: string
  description: string
  image?: string
  sizeInfo?: string
  materialInfo?: string
  requiredImageCount: number
  isReadyMade: boolean
}
