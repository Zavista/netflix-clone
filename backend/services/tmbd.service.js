import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMBD = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMBD_API_KEY,
    },
  };

  const res = await axios.get(url, options);

  if (res.status !== 200) {
    console.log(res.data);
    throw new Error("Failed to fetch data from TMBD" + response.statusToText);
  }

  return res.data;
};
