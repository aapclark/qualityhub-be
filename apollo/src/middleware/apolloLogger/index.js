

// const apolloLogger = ({ req }) => {
//   const { method, original, url, statusCode } = req
//   now = new Date()
//   res = `${now}
//       -- ${method} to ${url} -- ${statusCode}`
//   console.log(res)
// }

const apolloLogger = {
  requestDidStart({ request }) {
    const { query, http } = request
    const httpSymbols = Object.getOwnPropertySymbols(http)
    // creates object from 'Request internals' symbol in http obj
    const requestInternals = http[httpSymbols[1]]
    // builds date and string
    const now = new Date()
    const date = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`

    const res = `${requestInternals.method} -- ${date}`
    // console.log(res)
    return {
      parsingDidStart(ctx) {
        console.log('parsing started')
        console.log(`parsing CTX`, ctx)
      },
      validationDidStart(ctx) {
        console.log('validation started')
      }
    }

  }
}


export default apolloLogger
