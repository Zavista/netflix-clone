import { fetchFromTMBD } from "../services/tmbd.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMBD(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};

export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
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

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
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

export const getMovieByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US`
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
