import { useQuery } from "react-query";
import { useState } from "react";
import { fetchPopularMovies } from "../DataApi";
import MovieCard from "./MovieCard";

import { Pagination } from "antd";
import "./MovieDetailsDisplay.css";

const Maincard = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery(["popularMovies", page], () =>
    fetchPopularMovies(page)
  );

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="container2">
      <h3 className="main-card-title">Latest Movies</h3>
      <div className="row">
        {data &&
          data.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-5 ">
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
      <div className="pagechanger">
        <Pagination
          defaultCurrent={1}
          current={page}
          total={500}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Maincard;
