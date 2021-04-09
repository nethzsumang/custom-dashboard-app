/**
 * Get readable weather from 7timer data
 * Source: https://www.7timer.info/doc.php?lang=en#api
 * @param {*} apiWeather
 */
const getReadableWeather = function (apiWeather) {
  if (['clearday', 'clearnight'].includes(apiWeather) === true) {
    return '< 20% cloud cover'
  }

  if (['pcloudyday', 'pcloudynight'].includes(apiWeather) === true) {
    return '20% - 60% cloud cover'
  }

  if (['mcloudyday', 'mcloudynight'].includes(apiWeather) === true) {
    return '60% - 80% cloud cover'
  }

  if (['cloudyday', 'cloudynight'].includes(apiWeather) === true) {
    return '> 80% cloud cover'
  }

  if (['humidday', 'humidnight'].includes(apiWeather) === true) {
    return '> 90% relative humidity, < 60% cloud cover'
  }

  if (['lightrainday', 'lightrainnight'].includes(apiWeather) === true) {
    return '< 4mm/hr precipitation, > 80% cloud cover'
  }

  if (['oshowerday', 'oshowernight'].includes(apiWeather) === true) {
    return '< 4mm/hr precipitation, 60% - 80% cloud cover'
  }

  if (['ishowerday', 'ishowernight'].includes(apiWeather) === true) {
    return '< 4mm/hr precipitation, < 60% cloud cover'
  }

  if (['lightsnowday', 'lightsnownight'].includes(apiWeather) === true) {
    return '< 4mm/hr precipitation'
  }

  if (['rainday', 'rainnight'].includes(apiWeather) === true) {
    return '> 4mm/hr precipitation'
  }

  if (['snowday', 'snownight'].includes(apiWeather) === true) {
    return '> 4mm/hr precipitation'
  }

  if (['rainsnowday', 'rainsnownight'].includes(apiWeather) === true) {
    return 'Precipitation with ice pellets or freezing rain'
  }

  return apiWeather
}

export {
  getReadableWeather
}
