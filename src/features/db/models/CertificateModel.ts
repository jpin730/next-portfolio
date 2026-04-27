import { Model, Schema, Types, model, models } from 'mongoose'

import { ModelName } from '../consts/model-name'

export interface CertificateDocument {
  name: string
  image: string
  issuedAt: Date
  categories: Types.ObjectId[]
  issuer: Types.ObjectId
  legacyId?: string
}

const certificateSchema = new Schema<CertificateDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  issuedAt: {
    type: Date,
    required: true,
  },
  categories: {
    type: [{ type: Schema.Types.ObjectId, ref: ModelName.CERTIFICATE_CATEGORY, required: true }],
    required: true,
  },
  issuer: {
    type: Schema.Types.ObjectId,
    ref: ModelName.CERTIFICATE_ISSUER,
    required: true,
  },
  legacyId: {
    type: String,
    unique: true,
    required: false,
  },
})

export const CertificateModel: Model<CertificateDocument> =
  models.Certificate ?? model(ModelName.CERTIFICATE, certificateSchema, 'certificates')
