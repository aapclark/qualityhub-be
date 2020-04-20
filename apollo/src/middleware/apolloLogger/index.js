


const apolloLogger = {
  requestDidStart({ request }) {
    const { query, http } = request
    const httpSymbols = Object.getOwnPropertySymbols(http)
    // creates object from 'Request internals' symbol in http obj
    const requestInternals = http[httpSymbols[1]]
    // builds date and string
    const now = new Date()
    const date = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`

    const info = `${requestInternals.method} -- ${query} -- ${date}`
    console.log(info)
    return {
      parsingDidStart(ctx) {
        console.log('Parsing Started')
        // console.log(`parsing CTX`, ctx)
      },
      validationDidStart(ctx) {
        console.log('Validation started.')
      }
    }
  }
}


export default apolloLogger
