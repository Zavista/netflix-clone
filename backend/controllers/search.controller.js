import { User } from "../models/user.model.js";
import { fetchFromTMBD } from "../services/tmbd.service.js";

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMBD(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ content: response.results, success: true });
  } catch (error) {
    console.log("Error in searchPerson controller: ", error);
    res.status(500).json({ message: "Internal server error", success });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMBD(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ content: response.results, success: true });
  } catch (error) {
    console.log("Error in searchMovie controller: ", error);
    res.status(500).json({ message: "Internal server error", success });
  }
};

export const searchTV = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMBD(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ content: response.results, success: true });
  } catch (error) {
    console.log("Error in seachTV controller: ", error);
    res.status(500).json({ message: "Internal server error", success });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ content: req.user.searchHistory, success: true });
  } catch (error) {
    console.log("Error in getSearchHistory controller: ", error);
    res.status(500).json({ message: "Internal server error", success });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ message: "Item removed from search history", success: true });
  } catch (error) {
    console.log("Error in removeItemFromSearchHistory controller: ", error);
    res.status(500).json({ message: "Internal server error", success });
  }
};
