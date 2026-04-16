import 'server-only'

import { v2 as cloudinary, ConfigOptions } from 'cloudinary'

import { getEnvironment } from '@/core/lib/env'

const MAX_IMAGE_UPLOAD_MB = 5
const VALID_MIME_TYPES = ['image/webp']

const getCloudinaryConfig = (): ConfigOptions => {
  const environment = getEnvironment()

  return {
    cloud_name: environment.CLOUDINARY_CLOUD_NAME,
    api_key: environment.CLOUDINARY_API_KEY,
    api_secret: environment.CLOUDINARY_API_SECRET,
    secure: true,
  }
}

let isConfigured = false

const ensureCloudinary = (): void => {
  if (isConfigured) {
    return
  }

  cloudinary.config(getCloudinaryConfig())
  isConfigured = true
}

export const uploadImage = async (file: File, folder: string): Promise<string> => {
  if (!VALID_MIME_TYPES.includes(file.type)) {
    throw new Error('Valid image formats: ' + VALID_MIME_TYPES.join(', '))
  }

  const maxUploadBytes = MAX_IMAGE_UPLOAD_MB * 1024 * 1024
  if (file.size > maxUploadBytes) {
    throw new Error(`Image must be smaller than ${MAX_IMAGE_UPLOAD_MB}MB.`)
  }

  ensureCloudinary()

  const buffer = Buffer.from(await file.arrayBuffer())
  const environment = getEnvironment()
  const rootFolder = environment.CLOUDINARY_FOLDER
  const asset_folder = `${rootFolder}/${folder}`

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: crypto.randomUUID(),
        asset_folder,
        resource_type: 'image',
        format: 'webp',
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error('Cloudinary upload failed.'))
          return
        }
        const optimizedUrl = result.secure_url.replace('/upload/', '/upload/q_auto/f_auto/')
        resolve(optimizedUrl)
      },
    )
    stream.end(buffer)
  })
}
