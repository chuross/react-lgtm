import axios from 'axios'

// const apiBaseUrl = process.env.API_URL;
const apiBaseUrl = 'http://192.168.99.100:3000';

export default class LgtmApi {

  static getUploadList(offset, limit) {
    return axios.get(`${apiBaseUrl}/uploads`, {
      params: { offset: offset, limit: limit }
    }).then(res => res.data);
  }

  static uploadFile(blob) {
    const data = new FormData();
    data.append('file', blob);
    return axios.post(`${apiBaseUrl}/uploads`, data)
      .then(res => res.data);
  }
}
