import { bold, dim, red, green, Color } from 'colorette'
import boxen from 'boxen'

const logger = (color: Color, scope: string, message: any) => {
  if (typeof message === 'string') {
    console.log(color(bold(`[${scope}]`)), color(message))
  } else {
    console.log(color(bold(`[${scope}]`)))
    console.dir(message)
  }
}

const log = {
  main: (message: string) =>
    console.log(green(boxen(message, { padding: 1, borderColor: 'green', borderStyle: 'bold' }))),
  info: (scope: string, message: any) => logger(green, scope, message),
  error: (scope: string, message: string) => logger(red, scope, message),
  debug: (scope: string, message: any) => logger(dim, scope, message),
}

export { log }
