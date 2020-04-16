import axios from 'axios';

const apiUrl = process.env.API_BASE_URL || 'http://localhost:3001';

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