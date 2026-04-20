import { Model, Schema, model, models } from 'mongoose'

import { ModelName } from '../consts/model-name'
import { transformToJson } from '../utils/transformToJson'

export interface CertificateIssuerDocument {
  name: string
}

const certificateIssuerSchema = new Schema<CertificateIssuerDocument>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform: transformToJson,
    },
  },
)

export const CertificateIssuerModel: Model<CertificateIssuerDocument> =
  models.CertificateIssuer ??
  model(ModelName.CERTIFICATE_ISSUER, certificateIssuerSchema, 'certificate_issuers')
