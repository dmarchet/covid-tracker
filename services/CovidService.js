import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://covidtracking.com/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getCurrentUsTotals() {
    return apiClient.get('/us/current.json')
  },
  getAllUsData() {
    return apiClient.get('/us/daily.json')
  },
  getUsByDate(date) {
    return apiClient.get('us/' + date + '.json')
  },
  getTotalsByState() {
    return apiClient.get('/states/current.json')
  },
  getAllDataByState() {
    return apiClient.get('/states/daily.json')
  },
  getStateTotals(state) {
    return apiClient.get('/states/' + state + '/current.json')
  },
  getAllStateData(state) {
    return apiClient.get('/states/' + state + '/daily.json')
  },
  getStateByDate(state, date) {
    return apiClient.get('/states/' + state + '/' + date + '.json')
  },
}
