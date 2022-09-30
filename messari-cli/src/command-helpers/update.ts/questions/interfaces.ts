export interface Input {
  type: string
  name: string
  message: string
}

export interface Select {
  type: string
  name: string
  message: string
  choices: string[]
}

export interface Confirmation {
  type: string
  name: string
  message: string
}
