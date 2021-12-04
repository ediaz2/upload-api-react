import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { AWS } from '../config/env.js'
import { log } from '../config/log.js'

export class S3Service {
  private readonly s3 = new S3Client({
    region: AWS.region,
    credentials: {
      accessKeyId: AWS.accessKeyId ?? '',
      secretAccessKey: AWS.secretAccessKey ?? '',
    },
  })

  private readonly bucket = AWS.bucket

  async upload(key: string, type: string, file: any): Promise<string | null> {
    try {
      const parallelUploads3 = new Upload({
        client: this.s3,
        leavePartsOnError: false,
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ContentType: type,
        },
      })

      parallelUploads3.on('httpUploadProgress', (progress) => {
        log.debug('AWS S3', progress)
      })

      await parallelUploads3.done()
      return key
    } catch (err: unknown) {
      if (err instanceof SyntaxError) log.error('AWS S3', err.message)
      return null
    }
  }

  async getUrl(key: string, expiresIn = 3600): Promise<string | null> {
    try {
      const input = {
        Bucket: this.bucket,
        Key: key,
      }
      const command = new GetObjectCommand(input)
      return getSignedUrl(this.s3, command, { expiresIn })
    } catch (err: unknown) {
      if (err instanceof SyntaxError) log.error('AWS S3', err.message)
      return null
    }
  }
}
