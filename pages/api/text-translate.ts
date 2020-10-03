import { NextApiRequest, NextApiResponse } from 'next'
import { translateText } from '../../services/translate'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('text-translate received:', req.body)
  res.statusCode = 200
  const translation = await translateText(
    req.body.sourceText,
    req.body.targetLanguage
  )
  console.log('text-translate replied:', translation)
  res.json({ translation })
}
