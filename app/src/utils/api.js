import axios from 'axios';

const apiUrl = process.env.API_URL || 'http://localhost:3001';

export const getItems = async () => {
  const { data } = await axios.get(`${ apiUrl }/items`);
  return data;
};

export const postVote = async (itemId, userToken) => {
  await axios(`${ apiUrl }/vote`, {
    method: 'POST',
    data: { itemId, userToken },
  });
};

export const deleteVote = async (itemId, userToken) => {
  await axios(`${ apiUrl }/vote`, {
    method: 'DELETE',
    data: { itemId, userToken },
  });
};

export const postItem = async (value, _id, userToken) => {
  await axios(`${ apiUrl }/item`, {
    method: 'POST',
    data: { value, _id, userToken },
  });
};