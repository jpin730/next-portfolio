import { Model, Schema, model, models } from 'mongoose'

import { ModelName } from '../consts/model-name'

export interface CertificateCategoryDocument {
  name: string
}

const certificateCategorySchema = new Schema<CertificateCategoryDocument>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
})

export const CertificateCategoryModel: Model<CertificateCategoryDocument> =
  models.CertificateCategory ??
  model(ModelName.CERTIFICATE_CATEGORY, certificateCategorySchema, 'certificate_categories')
