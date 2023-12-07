import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

const PostDetails = () => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (postId) {
      getSelectedPost(postId);
    }
  }, [postId]);

  useEffect(() => {
    console.log("selectedPost:", selectedPost);
  }, [selectedPost]);

  const getSelectedPost = async (postId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/blog/${postId}`
      );
      console.log("API response:", response.data);
      setSelectedPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Header />
      {selectedPost ? (
        <div className="detalles" key={selectedPost[0].id}>
          <div className="detalle">
            <h2>{selectedPost[0].titulo}</h2>
            <p>Autor: {selectedPost[0].autor}</p>
            <p className="contenido">Contenido:{selectedPost[0].contenido}</p>
            {selectedPost[0].fecha_publicacion ? (
              <p>
                Fecha de publicación:{" "}
                {formatDate(selectedPost[0].fecha_publicacion)}
              </p>
            ) : (
              <p>Fecha de publicación no disponible</p>
            )}
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default PostDetails;
