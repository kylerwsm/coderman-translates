import vision from '@google-cloud/vision'
import speech from '@google-cloud/speech'

// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2
const projectId = 'coderman-translates'
const translate = new Translate({
  projectId,
  keyFilename: 'keys/coderman-translates-6e162a3e0ca3.json',
})

/**
 * Takes in a souce text, and translates it into another language.s
 */
export async function translateText(
  sourceText: string,
  targetLanguage: string
): Promise<string> {
  const [translation] = await translate.translate(sourceText, targetLanguage)
  return translation
}

export async function getLanguages() {
  const [languages] = await translate.getLanguages()
  return languages
}

export async function imageToText(imageBuffer: Buffer | string) {
  const client = new vision.ImageAnnotatorClient({
    projectId,
    keyFilename: 'keys/coderman-translates-6e162a3e0ca3.json',
  })
  const [result] = await client.textDetection(imageBuffer)
  const detections = result.textAnnotations
  const res = detections[0].description
  console.log('Text:', res)
  return res
}

export async function speechToText(fileName: string) {
  const client = new speech.SpeechClient({
    projectId,
    keyFilename: 'keys/coderman-translates-6e162a3e0ca3.json',
  })
  const fs = require('fs')
  const file = fs.readFileSync(fileName)
  const audioBytes = file.toString('base64')

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  }
  const config = {
    encoding: 'LINEAR16',
    languageCode: 'en-US',
    audioChannelCount: 2,
    enableSeparateRecognitionPerChannel: true,
  }
  const request = {
    audio: audio,
    config: config,
  }

  // Detects speech in the audio file
  const [response] = await client.recognize(request as any)
  const transcription = response.results[0].alternatives[0].transcript
  // const transcription = response.results
  //   .map((result) => result.alternatives[0].transcript)
  //   .join('\n')
  console.log(`Transcription: ${transcription}`)
  return transcription
}
