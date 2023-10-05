export default (data: any = [], message: Array<string> = [], validate: boolean = true) => {
  return {
    data: data,
    message: message,
    validate: validate
  }
}
