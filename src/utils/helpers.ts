// TODO: Lint code
/* eslint-disable */

interface IObjectMapper {
  [key: string]: string | number
}

const detectDayLight = () => {
  const today = new Date()
  const currentHour = today.getHours()
  if (currentHour < 12) {
    return "Good Morning"
  } else if (currentHour < 18) {
    return "Good Afternoon"
  } else {
    return "Good Evening"
  }
}

const checkAllValues = (objectEntries: any) => {
  return Object.values(objectEntries).every(value => value)
}

const omitAnObjectKey = (obj: any, ...props: any[]) => {
  const result = { ...obj }
  props.forEach(prop => {
    delete result[prop]
  })
  return result
}

const findObjectByValueInArray = (
  arr: IObjectMapper[] | any,
  value: string,
  objectKey: string,
) => {
  return arr && arr.find((obj: IObjectMapper) => value === obj[objectKey])
}

const calculatePerc = (amount: string) => {
  const perc = 2.5 / 100
  const num = Number(amount)
  return (perc * num).toFixed(2) + ""
}

const formatToDays = (date: string) => {
  const date_1 = new Date(date)
  const date_2 = new Date()

  const difference = date_1.getTime() - date_2.getTime()
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return TotalDays
}

const formatDateAndTime = (date: string) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const d = new Date(date)
  const year = d.getFullYear()
  const day = d.getDate()
  const month = months[d.getMonth()]

  let hours = d.getHours()
  let minutes: any = d.getMinutes()
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? "0" + minutes : minutes
  const strTime = hours + ":" + minutes + " " + ampm

  return `${month} ${day}, ${year} ${strTime}`
}

const formatToHoursOrDays = (date: string) => {
  const dateTime = new Date(date).getTime()
  const currentTime = new Date().getTime()

  const timeDifference = currentTime - dateTime

  const minutes = Math.floor(timeDifference / (1000 * 60))
  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
  const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000))

  if (minutes < 60) {
    return `${minutes}m`
  }
  if (hours < 24) {
    return `${hours}h`
  }
  if (days < 365) {
    return `${days}d`
  }
  return `${years}y`
}

export const Helper = {
  detectDayLight,
  checkAllValues,
  omitAnObjectKey,
  findObjectByValueInArray,
  calculatePerc,
  formatToDays,
  formatDateAndTime,
  formatToHoursOrDays,
}
