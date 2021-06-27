type ErrorType = 'IMAGE_ONLY' | 'LIMIT'

interface IError {
  code: string
  message: string
  detail: string
}

export const UploadError: Readonly<Record<ErrorType, IError>> = {
  IMAGE_ONLY: {
    code: 'IMAGE_ONLY',
    message: 'Upload image only',
    detail: 'imageUpload'
  },
  LIMIT:{
    code: 'FILE_TO_LARGE',
    message: 'File to large',
    detail: 'limit'
  }
}