import axios from 'axios'

// const apiBaseUrl = process.env.API_URL;
const apiBaseUrl = 'http://192.168.99.100:3000';

export default class LgtmApi {

  static getImage(id) {
    return axios.get(`${apiBaseUrl}/uploads/${id}`)
      .then(res => res.data.result);
  }

  static getImages(offset, limit) {
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
