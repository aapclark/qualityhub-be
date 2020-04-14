import { server } from '../../server'

const options = {
  port: (process.env.APOLLO_PORT || process.env.PORT_TEST) || 3232
}


const globalSetup = async () => {
  global.httpServer = server
  await global.server.listen(options)

}

export default globalSetup
