import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;
const apiPort = process.env.API_PORT;
const apiUrl = apiBaseUrl && apiPort ?
  `${ apiBaseUrl }:${ apiPort }` :
  'http://localhost:3001';

export const getItems = async userToken => {
  const { data } = await axios(`${ apiUrl }/items`, {
    method: 'GET',
    params: { userToken },
  });
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

export const postUserName = async (userName, userToken) => {
  await axios(`${ apiUrl }/username`, {
    method: 'POST',
    data: { userName, userToken },
  });
};

export const getUserName = async userToken => {
  const { data } = await axios(`${ apiUrl }/username`, {
    method: 'GET',
    params: { userToken }
  });
  return data;
}