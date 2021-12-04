import { App } from '@tinyhttp/app'
import { cors } from '@tinyhttp/cors'
import { logger } from '@tinyhttp/logger'

import { PORT } from './config/env.js'
import { routes } from './routers/index.js'
import { log } from './config/log.js'

const app = new App()

/* ======= MIDDLEWARE ======= */
app.use(logger({ timestamp: { format: 'HH:mm:ss' } }))
app.use(cors())

/* ======= ROUTES ======= */
app.use(routes)

app.listen(Number(PORT), () => {
  log.main(`🚀 Server running ➜ PORT: ${PORT}`)
})
