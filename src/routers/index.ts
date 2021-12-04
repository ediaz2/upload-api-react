import formidable from 'formidable'
import { App } from '@tinyhttp/app'
import { nanoid } from 'nanoid'
import { createReadStream } from 'fs'

import { S3Service } from '../providers/s3.service.js'
import { getFileExt } from '../helpers/getFileExt.js'
import { log } from '../config/log.js'

const s3 = new S3Service()

const routes = new App()

routes.post('/api/v1/upload', async (req, res) => {
  try {
    const form = formidable({ multiples: true })
    const { err, fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
          return
        }
        resolve({ err, fields, files })
      })
    })

    const { image }: { image: formidable.File } = files

    const ext = getFileExt(String(image.originalFilename))

    if (!['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      log.error('UPLOAD', `Invalid file extension: [ .${ext} ]`)
      return res.status(400).json({
        success: false,
        message: 'Invalid file type',
      })
    }

    const path = `upload/images/${nanoid()}.${ext}`

    const fileStream = createReadStream(image.filepath)

    const key = await s3.upload(path, String(image.mimetype), fileStream)
    const url = await s3.getUrl(String(key))

    res.status(201).json({ url })
  } catch (err: any) {
    log.error('UPLOAD', err.message)
    res.status(400).json({ error: err.message })
  }
})

export { routes }
