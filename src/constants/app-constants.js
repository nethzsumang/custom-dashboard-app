/** @var string Local Storage key for Dashboard Data */
const LOCAL_STORAGE_DASHBOARD_DATA_KEY = 'custom_dashboard/data'

/**
 * Card Types
 */
const CARD_TYPES = {
  CUSTOM: 'Custom',
  WEATHER: 'Weather',
  PICTURE_CAROUSEL: 'Picture Carousel'
  // DATA_TABLE: 'Data Table'
}

/** @var string Default Dashboard data if there are no available data in user's storage */
const DEFAULT_INITIAL_DASHBOARD_DATA = [
  {
    path: '/',
    name: 'Index',
    cards: [
      {
        title: 'Test Card',
        subtitle: 'Subtitle',
        type: CARD_TYPES.CUSTOM,
        content: 'Lorem ipsum dolor sit amet consectetur elit adespescing elit.',
        dataSource: {},
        id: 1
      }
    ]
  }
]

/**
 * Default Card Data
 */
const DEFAULT_CARD_DATA = {
  id: null,
  title: '',
  subtitle: '',
  type: CARD_TYPES.CUSTOM,
  content: '',
  dataSource: {}
}

/**
 * Default Dashboard Data
 */
const DEFAULT_DASHBOARD_DATA = {
  id: null,
  path: '',
  name: '',
  cards: []
}

/**
 * Weather Sources
 */
const WEATHER_SOURCES = {
  SEVEN_TIMER: '7timer',
  GOWEATHER: 'GoWeather'
}

export {
  LOCAL_STORAGE_DASHBOARD_DATA_KEY,
  CARD_TYPES,
  DEFAULT_INITIAL_DASHBOARD_DATA,
  DEFAULT_CARD_DATA,
  DEFAULT_DASHBOARD_DATA,
  WEATHER_SOURCES
}
