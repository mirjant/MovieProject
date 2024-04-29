import React, { useState } from "react";
import { Button, Modal } from "antd";
import MovieCard from "./Movies/MovieCard";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const ModalFavorites = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Function to fetch favorites from local storage
  const fetchFavoritesFromLocalStorage = () => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesFromStorage);
  };

  // Open the modal and fetch favorites from local storage
  const showModal = () => {
    setIsModalOpen(true);
    fetchFavoritesFromLocalStorage();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const ButtonStyle = {
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: "25px",
    marginTop: "-8px",
    paddingRight: "20px",
  };

  return (
    <>
      <button style={ButtonStyle} onClick={showModal}>
        {favorites.length > 0 ? <HeartFilled /> : <HeartOutlined />}{" "}
      </button>

      <Modal
        title="Favorite Movies"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        
      >
        <div
          key={favorites.id}
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "auto auto ",
            rowGap: "10px",
            
          }}
        >
          {favorites.map((favorite) => (
            <div className="  modal-card" key={favorite.id}>
              <MovieCard movie={favorite} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalFavorites;
