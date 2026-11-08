import { app } from './app.js'

import { HOST, PORT } from './runtime-config.js'

const server = app.listen(PORT, HOST, () => {
  console.info(`Server listening on http://${HOST.includes(':') ? `[${HOST}]` : HOST}:${PORT}`)
})
server.on('error', error => {
  console.error('Server failed:', error.message)
  process.exitCode = 1
})

let shuttingDown = false
const shutdown = () => {
  if (shuttingDown) return
  shuttingDown = true
  setTimeout(() => process.exit(1), 10_000).unref()
  server.close(error => process.exit(error ? 1 : 0))
}
process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
