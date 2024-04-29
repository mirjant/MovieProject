import axios from "axios";

export async function fetchPopularMovies(page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=1d1d8844ae1e746c459e7be85c15c840&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
}

export async function fetchMovieDetailsById(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1d1d8844ae1e746c459e7be85c15c840&append_to_response=credits`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export async function fetchMovieVideoById(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1d1d8844ae1e746c459e7be85c15c840`
    );
    const data = response.data;
    if (data.results) {
      return data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
}

export async function searchMovies(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=1d1d8844ae1e746c459e7be85c15c840&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}


export async function fetchTopRatedMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=1d1d8844ae1e746c459e7be85c15c840`
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
}
