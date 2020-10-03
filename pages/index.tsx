import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import React from 'react'
import classNames from 'classnames'
import {
  Button,
  FormControl,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import SyncAltIcon from '@material-ui/icons/SyncAlt'
import { getLanguages } from '../services/translate'

const useStyles = makeStyles({
  root: {
    marginLeft: 64,
    marginRight: 64,
    marginTop: 48,
    marginBottom: 48,
  },
  section: {
    marginTop: 32,
  },
  durationFieldWidth: {
    width: 200,
  },
  textFieldMargins: {
    marginTop: 24,
    marginBottom: 24,
    width: '40%',
    marginRight: 32,
    '&:last-child': {
      marginRight: 'unset',
      marginLeft: 32,
    },
  },
  textFieldContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    marginLeft: 16,
    minWidth: 240,
  },
  textToTextTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  exchangeArrow: {
    marginLeft: 16,
  },
  uploadButton: {
    marginRight: 16,
  },
  textFieldMarginsImage: {
    marginTop: 24,
    marginBottom: 24,
    width: '60%',
  },
  uploadButtonGroup: {
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
  },
})

export const getStaticProps: GetStaticProps = async (context) => {
  const languages = await getLanguages()
  return {
    props: { languages },
  }
}

export default function Home(props: any) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div id="title">
        <Typography variant="h2">{'Coderman Translates'}</Typography>
      </div>
      <TextToText languages={props.languages} />
      <ImageToText />
      <SpeechToText />
    </div>
  )
}

function SpeechToText(props: any) {
  const classes = useStyles()
  const inputEl = React.useRef(null)
  const [inputFile, setInputFile] = React.useState<File>()
  const [translatedText, setTranslatedText] = React.useState<string>('')

  const onFilePickedHandler = async () => {
    if (inputEl.current) {
      const inputRef: HTMLInputElement = inputEl.current!
      const uploadedFile = inputRef.files![0]
      if (uploadedFile) {
        setInputFile(uploadedFile)
        const formData = new FormData()
        formData.append('file', uploadedFile)
        const response = await fetch('/api/speech-translate', {
          method: 'POST',
          body: formData,
        })
        const translation = (await response.json()).translation
        setTranslatedText(translation)
      }
    }
  }

  return (
    <div>
      <div id="section-speech-to-text" className={classes.section}>
        <div className={classes.textToTextTitle}>
          <Typography variant="h4">{'Speech-to-Text Translation'}</Typography>
        </div>
        <div>
          <TextField
            className={classNames(
              classes.textFieldMarginsImage,
              classes.durationFieldWidth
            )}
            id="source-text"
            margin="none"
            autoComplete="off"
            type="text"
            rows={3}
            multiline={true}
            value={translatedText}
            placeholder="Upload an sound clip to see the translated text"
            onChange={(e) => {}}
            variant="outlined"
          />
        </div>
        <input
          hidden
          id="raised-button-speech-file"
          type="file"
          ref={inputEl}
          onChange={onFilePickedHandler}
        />
        <div className={classes.uploadButtonGroup}>
          <label
            htmlFor="raised-button-speech-file"
            className={classes.uploadButton}
          >
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <Typography variant="body1" align="left">
            {!inputFile ? 'No file uploaded' : inputFile.name}
          </Typography>
        </div>
      </div>
    </div>
  )
}

function ImageToText(props: any) {
  const classes = useStyles()
  const inputEl = React.useRef(null)
  const [inputFile, setInputFile] = React.useState<File>()
  const [translatedText, setTranslatedText] = React.useState<string>('')

  const onFilePickedHandler = async () => {
    if (inputEl.current) {
      const inputRef: HTMLInputElement = inputEl.current!
      const uploadedFile = inputRef.files![0]
      if (uploadedFile) {
        setInputFile(uploadedFile)
        const formData = new FormData()
        formData.append('file', uploadedFile)
        const response = await fetch('/api/image-translate', {
          method: 'POST',
          body: formData,
        })
        const translation = (await response.json()).translation
        setTranslatedText(translation)
      }
    }
  }

  return (
    <div>
      <div id="section-image-to-text" className={classes.section}>
        <div className={classes.textToTextTitle}>
          <Typography variant="h4">{'Image-to-Text Translation'}</Typography>
        </div>
        <div>
          <TextField
            className={classNames(
              classes.textFieldMarginsImage,
              classes.durationFieldWidth
            )}
            id="source-text"
            margin="none"
            autoComplete="off"
            type="text"
            rows={3}
            multiline={true}
            value={translatedText}
            placeholder="Upload an image to see the translated text"
            onChange={(e) => {}}
            variant="outlined"
          />
        </div>
        <input
          hidden
          id="raised-button-file"
          type="file"
          ref={inputEl}
          onChange={onFilePickedHandler}
        />
        <div className={classes.uploadButtonGroup}>
          <label htmlFor="raised-button-file" className={classes.uploadButton}>
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <Typography variant="body1" align="left">
            {!inputFile ? 'No file uploaded' : inputFile.name}
          </Typography>
        </div>
      </div>
    </div>
  )
}

function TextToText(props: any) {
  const classes = useStyles()
  const [targetLn, setTargetLn] = React.useState<string>('')
  const [sourceText, setSourceText] = React.useState<string>('')
  const [translatedText, setTranslatedText] = React.useState<string>('')

  return (
    <div>
      <div id="section-text-to-text" className={classes.section}>
        <div className={classes.textToTextTitle}>
          <Typography variant="h4">{'Text-to-Text Translation'}</Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="target-language-picker-label"
              id="target-language-picker"
              value={targetLn}
              onChange={(e) => setTargetLn(e.target.value as string)}
            >
              {props.languages.map((ln: any) => {
                return (
                  <MenuItem key={ln.code} value={ln.code}>
                    {ln.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <IconButton
            className={classes.exchangeArrow}
            onClick={() => {
              const temp = sourceText
              setSourceText(translatedText)
              setTranslatedText(temp)
            }}
          >
            <SyncAltIcon />
          </IconButton>
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            className={classNames(
              classes.textFieldMargins,
              classes.durationFieldWidth
            )}
            id="source-text"
            margin="none"
            autoComplete="off"
            type="text"
            rows={3}
            multiline={true}
            placeholder="Enter the text to be translated"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            variant="outlined"
          />
          <IconButton
            onClick={async () => {
              const res = await fetch('/api/text-translate', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sourceText: sourceText,
                  targetLanguage: targetLn,
                }),
              })
              console.log(res.body)
              const response = await res.json()
              const translation = response.translation
              setTranslatedText(translation)
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
          <TextField
            className={classNames(
              classes.textFieldMargins,
              classes.durationFieldWidth
            )}
            id="translated-text"
            margin="none"
            autoComplete="off"
            type="text"
            placeholder="Translated text will show when the translate button is clicked"
            rows={3}
            multiline={true}
            value={translatedText}
            // Translated text is not user settable.
            onChange={() => {}}
            variant="outlined"
          />
        </div>
      </div>
    </div>
  )
}
