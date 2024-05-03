import axios from "axios";

const API_KEY = "qlT9gWXnPtuxeEwaffyrruiXmTzAjiSAODCCawXg";
//fetch data from api
export const getPictureOfTheDay = async () => {
  try {
    const url = `https://api.nasa.gov/planetary/apod`;

    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};

//fetch data from api
export const getMarsRoverPhotos = async (rover, camera) => {
  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=40`;

    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};
export const getMarsRoverPhotosPage = async (page, selected) => {
  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=40`;

    const response = await axios.get(url, {
      params: {
        page: page,
        camera: selected,
        api_key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};
export const getEarth = async () => {
  try {
    const url = `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2018-01-01&&dim=0.10`;

    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};
export const getEpic = async () => {
  try {
    const url = `https://api.nasa.gov/EPIC/api/natural/images`;

    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};
