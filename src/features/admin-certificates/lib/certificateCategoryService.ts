import 'server-only'

import { connectDB } from '@/core/lib/db'
import { CertificateCategoryModel } from '@/features/db/models/CertificateCategoryModel'
import { CertificateCategoryListItem } from '@/features/types/CertificateCategoryListItem'

export const getAll = async (query?: string): Promise<CertificateCategoryListItem[]> => {
  await connectDB()

  const filter = query ? { name: { $regex: query, $options: 'i' } } : {}
  const certificateCategories = await CertificateCategoryModel.find(filter).sort({ name: 1 })

  return certificateCategories.map((certificateCategory) => ({
    id: certificateCategory.id,
    name: certificateCategory.name,
  }))
}

export const getById = async (id: string): Promise<CertificateCategoryListItem | null> => {
  await connectDB()

  const certificateCategory = await CertificateCategoryModel.findById(id)

  if (!certificateCategory) {
    return null
  }

  return {
    id: certificateCategory.id,
    name: certificateCategory.name,
  }
}

export const update = async (id: string, name: string): Promise<void> => {
  await connectDB()

  await CertificateCategoryModel.findByIdAndUpdate(id, { name })
}

export const remove = async (id: string): Promise<void> => {
  await connectDB()

  await CertificateCategoryModel.findByIdAndDelete(id)
}
