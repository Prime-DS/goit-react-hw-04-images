import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const LIMIT = 12;
const KEY_API = '29398467-8a653d7b4fed816ab704a6050';
const instance = axios.create({
  baseURL: URL,
  params: {
    per_page: LIMIT,
    key: KEY_API,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = async (q, page) => {
  const { data } = await instance.get('/', {
    params: {
      page,
      q,
    },
  });
  return data;
};
