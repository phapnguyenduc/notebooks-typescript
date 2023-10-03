export default (data: any, message: Array<string>, status: number, validate: boolean = true) => {
  return {
    data: data,
    message: message,
    status: status,
    validate: validate
  }
}
