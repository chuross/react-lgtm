import axios from 'axios'
import config from 'Config'

export default class LgtmApi {

  static getImage(id) {
    return axios.get(`${config.api.baseUrl}/uploads/${id}`)
      .then(res => res.data.result);
  }

  static getImages(offset = 0, limit = 20) {
    return axios.get(`${config.api.baseUrl}/uploads`, {
      params: { offset: offset, limit: limit }
    }).then(res => res.data.result);
  }

  static deleteImage(id) {
    return axios.delete(`${config.api.baseUrl}/uploads/${id}`)
      .then(res => res.data.result);
  }

  static uploadImage(blob) {
    const data = new FormData();
    data.append('file', blob);
    return axios.post(`${config.api.baseUrl}/uploads`, data)
      .then(res => res.data.result);
  }
}
