

const apolloLogger = ({ req }) => {
  const { method, original, url, statusCode } = req
  now = new Date()
  res = `${now}
      -- ${method} to ${url} -- ${statusCode}`
  console.log(res)
}

const createLogger = () => {
  return apolloLogger
}


export default createLogger
