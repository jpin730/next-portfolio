import { Model, Schema, model, models } from 'mongoose'

import { ModelName } from '../consts/model-name'

export interface CertificateIssuerDocument {
  name: string
}

const certificateIssuerSchema = new Schema<CertificateIssuerDocument>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
})

export const CertificateIssuerModel: Model<CertificateIssuerDocument> =
  models.CertificateIssuer ??
  model(ModelName.CERTIFICATE_ISSUER, certificateIssuerSchema, 'certificate_issuers')
