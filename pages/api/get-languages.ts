import { NextApiRequest, NextApiResponse } from 'next'
import { getLanguages, translateText } from '../../services/translate'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return await getLanguages()
}
