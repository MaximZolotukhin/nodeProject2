const getArgs = (args) => {
  const res = {}
  const [executer, file, ...rest] = args
  rest.forEach((element, index, array) => {
    if (element.startsWith('-')) {
      let value
      if (index === array.length - 1 || array[index + 1].startsWith('-')) {
        value = true
      } else {
        value = []
        for (let i = index + 1; i < array.length; i++) {
          if (array[i].startsWith('-')) {
            break
          }
          value.push(array[i])
        }
        if (value.length === 1 && element !== '-s') {
          value = value[0]
        }
      }
      res[element.substring(1)] = value
    }
  })
  return res
}
export { getArgs }
