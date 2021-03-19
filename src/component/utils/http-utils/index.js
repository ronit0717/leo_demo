import axios from "axios";

const POFO_URL = process.env.REACT_APP_POFO_URL;
const CLIENT_ID = process.env.REACT_APP_X_POFO_CLIENT_ID;

const getConfig = sendClientInfo => {
  const config = sendClientInfo
    ? {
        headers: {
          "X-Pofo-Client-Id": CLIENT_ID
        }
      }
    : null;
  return config;
};

export const doGet = (controller, sendClientInfo) => {
  const getUrl = POFO_URL + controller;
  return axios.get(getUrl, getConfig(sendClientInfo));
};

export const doGetById = (controller, id, sendClientInfo) => {
  const getUrl = POFO_URL + controller + "/" + id;
  return axios.get(getUrl, getConfig(sendClientInfo));
};

export const doDelete = (controller, id, sendClientInfo) => {
    const deleteUrl = POFO_URL + controller + "/" + id;
    return axios.delete(deleteUrl, getConfig(sendClientInfo));
  };

export const doPost = (controller, body, sendClientInfo) => {
  const postUrl = POFO_URL + controller;
  return axios.post(postUrl, body, getConfig(sendClientInfo));
};

export const doPut = (controller, id, body, sendClientInfo) => {
  const putUrl = POFO_URL + controller + "/" + id;
  return axios.put(putUrl, body, getConfig(sendClientInfo));
};
