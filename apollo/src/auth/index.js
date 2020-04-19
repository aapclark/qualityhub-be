import jwt from 'jsonwebtoken'

const secret = process.env.PRISMA_SECRET


export const generateToken = ({ id, email }) => {
  const payload = {
    id,
    email
  }
  const options = {
    expiresIn: '3d'
  }
  return jwt.sign(payload, secret, options)
}


// expect just a header object
export const validToken = header => {
  console.log(`header`, header)
  if (header) {
    const token = header.replace('Bearer ', '')

    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return {
          token: ``,
          valid: false
        }
      }
      else {
        return {
          token: generateToken(decoded),
          valid: true
        }
      }
    })
  }
  else {
    throw new Error('Not authenticated.')
  }
}


export const getUserID = token => {
  console.log(`determining user id from ${token}`)
  const pureToken = token.replace(`Bearer `, ``)

  try {
    const { id } = jwt.verify(pureToken, secret)
    console.log(`decoded id`, id)
    return id
  } catch {
    throw new Error('Not Authenticated.')
  }

}
