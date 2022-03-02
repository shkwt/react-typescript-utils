import { DirtyDate } from './type'
import { parseFormat } from './parseFormat'

export const toFormat = (dirtyDate: DirtyDate = new Date(), format: string = 'YYYY/MM/DD') => {
  const date = new Date(dirtyDate)

  const getDate = (l: string) => {
    switch(l){
      case "Y":
        return date.getFullYear();
      case "M":
        return date.getMonth() + 1;
      case "D":
        return date.getDate();
      default: 
        return date.getDate()
    }
  }

  let res = format;
  parseFormat().forEach(info => {
    res = res.replace(
      new RegExp(`${info.letters}`, 'ug'),
      String(getDate(info.letter)).padStart(info.count, "0").slice(-info.count)
    )
  })

  return res
}