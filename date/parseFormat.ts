import { isNaN } from './isNaN'

const baseFormat = 'YYYY/MM/DD';
const formatLetters = ['Y', 'M', 'D'];

export const parseFormat = (format = baseFormat, additionalFormatLetters: string[] = []) => {
  // ['YYYY', 'MM', 'DD']
  const extractedYMD = format.split(
    new RegExp(
      `[^${[...formatLetters, ...additionalFormatLetters].join('')}]+`,
      'ug'
    )
  ).filter(Boolean);

  const parseFormatResult = extractedYMD.map(l => ({
    letter: l.slice(-1), // Y, M, D, ...
    letters: l, // YYYY, MM, DD, ...
    count: l.length, // 4, 2, 2, ...
    regExp: `(.*?)(\\d{1,${l.length}})`
  }));

  return parseFormatResult
}



const getFormatLetterDate = (dateNumber: number, letters: string, dirtyDate: Date | null) => {
  const date = new Date(dirtyDate || 0)
  switch(letters){
    case 'YYYY': 
      if(String(dateNumber).length < 4) {
        date.setFullYear(2000 + Number(dateNumber))
      } else {
        date.setFullYear(dateNumber)
      }
      return date;
    case 'MM':
      date.setMonth(dateNumber - 1)
      return date
    case 'DD':
      date.setDate(dateNumber)
      return date;
    default: 
      return date;
  }
}



/*
 * parseDate that provides string to Date
 */
export const parseDate = (dirtyDate: string) => {
  let sliceIndex = 0;
  let slicedDirtyDate = dirtyDate.slice(sliceIndex)
  let date: Date | null = null;

  parseFormat().forEach(info => {
    const matchResult = slicedDirtyDate.match(
      new RegExp(info.regExp, 'u')
    );

    if(matchResult) {
      const dateNumber = Number(matchResult.filter((v) => !isNaN(v))[0]);
      date = getFormatLetterDate(dateNumber, info.letters, date)
      sliceIndex = matchResult[0].length
      slicedDirtyDate = slicedDirtyDate.slice(sliceIndex)
    }
  })

  return date as Date | null
}