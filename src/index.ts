import { App } from '@tinyhttp/app'
import { cors } from '@tinyhttp/cors'
import { logger } from '@tinyhttp/logger'

import { PORT } from './config/env.js'
import { routes } from './routers/index.js'
import { log } from './config/log.js'

const app = new App()

/* ======= SETTINGS ======= */
app.set('port', PORT)

/* ======= MIDDLEWARE ======= */
app.use(logger({ timestamp: { format: 'HH:mm:ss' } }))
app.use(cors())

/* ======= ROUTES ======= */
app.use(routes)

app.listen(3000, () => {
  log.main(`🚀 Server running ➜ PORT: ${PORT}`)
})
