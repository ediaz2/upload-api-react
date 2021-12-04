import { config } from 'dotenv'

config()

// Server
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Amazon S3
const AWS = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'sa-east-1',
  bucket: process.env.AWS_BUCKET,
}

export { AWS, PORT, NODE_ENV }
