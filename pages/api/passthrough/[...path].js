import { getToken } from "next-auth/jwt"

export default async function handler(req, res) {
  const token = await getToken({req})
  const { path } = req.query
  console.log(path)
  console.log(token)
  res.status(200)
  res.end()
}