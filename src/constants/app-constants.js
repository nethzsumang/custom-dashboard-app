/** @var string Local Storage key for Dashboard Data */
const LOCAL_STORAGE_DASHBOARD_DATA_KEY = 'custom_dashboard/data'

/**
 * Card Types
 */
const CARD_TYPES = {
  CUSTOM: 'Custom'
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
        content: 'Lorem ipsum dolor sit amet consectetur elit adespescing elit.'
      }
    ]
  }
]

/**
 * Default Card Data
 */
const DEFAULT_CARD_DATA = {
  title: '',
  subtitle: '',
  type: CARD_TYPES.CUSTOM,
  content: ''
}

export {
  LOCAL_STORAGE_DASHBOARD_DATA_KEY,
  CARD_TYPES,
  DEFAULT_INITIAL_DASHBOARD_DATA,
  DEFAULT_CARD_DATA
}
