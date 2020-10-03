import { IncomingForm } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import { imageToText } from '../../services/translate'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  // read file from the temporary path
  const filepath = (data as any)?.files?.file.path
  const contents = await fs.readFile(filepath, {
    encoding: 'utf8',
  })

  const translation = await imageToText(filepath)
  console.log('translated:', translation)
  res.json({ translation })
}
