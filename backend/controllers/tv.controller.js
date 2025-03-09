import { fetchFromTMBD } from "../services/tmbd.service.js";

export const getTrendingTV = async (req, res) => {
  try {
    const data = await fetchFromTMBD(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTV =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({ success: true, content: randomTV });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};

export const getTVTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send(null);
    }
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};

export const getTVDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send(null);
    }
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};

export const getSimilarTVs = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send(null);
    }
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};

export const getTVByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send(null);
    }
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};
