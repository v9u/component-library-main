export interface Time {
  day: string
  hour: string
  minute: string
  second: string
}
const tow = (n: number): string => {
  return n >= 0 && n < 10 ? '0' + n : '' + n
}
const getCountdownTime = (timestamp: number): Time => {
  if (!timestamp) {
    return {
      day: '00',
      hour: '00',
      minute: '00',
      second: '00'
    }
  }
  const day = tow(Math.floor(timestamp / 86400)) //整数部分代表的是天；一天有24*60*60=86400秒 ；
  timestamp = timestamp % 86400 //余数代表剩下的秒数；
  const hour = tow(Math.floor(timestamp / 3600)) //整数部分代表小时；
  timestamp %= 3600 //余数代表 剩下的秒数；
  const minute = tow(Math.floor(timestamp / 60))
  timestamp %= 60
  return {
    day,
    hour,
    minute,
    second: tow(timestamp)
  }
}

export { getCountdownTime }
