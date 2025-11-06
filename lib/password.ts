import argon2 from 'argon2'

export const hashPassword = (password: string) => {
  return argon2.hash(password, {
    type: argon2.argon2id,
    timeCost: 4,
    memoryCost: 2 ** 16,
  })
}

export const verifyPassword = (hash: string, password: string) => {
  return argon2.verify(hash, password)
}
