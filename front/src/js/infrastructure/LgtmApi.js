import axios from 'axios'

const apiBaseUrl = '';

export default class LgtmApi {

  static getImage(id) {
    return axios.get(`${apiBaseUrl}/uploads/${id}`)
      .then(res => res.data.result);
  }

  static getImages(offset = 0, limit = 20) {
    return axios.get(`${apiBaseUrl}/uploads`, {
      params: { offset: offset, limit: limit }
    }).then(res => res.data.result);
  }

  static deleteImage(id) {
    return axios.delete(`${apiBaseUrl}/uploads/${id}`)
      .then(res => res.data.result);
  }

  static uploadImage(blob) {
    const data = new FormData();
    data.append('file', blob);
    return axios.post(`${apiBaseUrl}/uploads`, data)
      .then(res => res.data.result);
  }
}
