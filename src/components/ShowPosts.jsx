import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import { abrir, cerrar } from "../modal.js";
import { Link } from "react-router-dom";
import Header from "./Header";

const ShowPosts = () => {
  const url = "http://127.0.0.1:4000/api/blog";
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [fecha_publicacion, setFechaPublicacion] = useState("");
  const [contenido, setContenido] = useState("");

  const [errores, setErrores] = useState({});
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Renderizar
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const apiUrl = searchTerm ? `${url}/busqueda/${searchTerm}` : url;
      const respuesta = await axios.get(apiUrl);
      setPosts(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [searchTerm]);

  const publicar = async () => {
    try {
      // Realiza validaciones
      const nuevosErrores = {};

      if (!titulo.trim()) {
        nuevosErrores.titulo = "El título es obligatorio";
      }

      if (!autor.trim()) {
        nuevosErrores.autor = "El autor es obligatorio";
      }

      if (!fecha_publicacion.trim()) {
        nuevosErrores.fecha_publicacion = "La fecha es obligatoria";
      }

      if (!contenido.trim()) {
        nuevosErrores.contenido = "El contenido es obligatorio";
      }

      // Actualiza el estado de errores
      setErrores(nuevosErrores);

      // Si hay errores, detiene la publicación
      if (Object.keys(nuevosErrores).length > 0) {
        return;
      }

      //Realiza la solicitud POST a la API
      const respuesta = await axios.post(url, {
        titulo,
        autor,
        fecha_publicacion,
        contenido,
      });

      console.log("Respuesta de la API:", respuesta.data);

      // Limpia los campos
      setTitulo("");
      setAutor("");
      setFechaPublicacion("");
      setContenido("");
      setErrores({});
      cerrar();
      getPosts();
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };

  return (
    <div className="div-principal">
      <Header />
      <div className="centrado">
        <div className="contenedor-modal" id="modal">
          <div className="formulario-modal">
            <div className="boton-cerrar">
              <button onClick={cerrar}>
                <i className="fa fa-times close"></i>
              </button>
            </div>

            <div className="datos-formulario">
              <div className="datos">
                <label htmlFor="">
                  <i className="fas fa-tag"></i>
                </label>
                <input
                  type="text"
                  placeholder="TITULO"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                {errores.titulo && (
                  <span className="error">{errores.titulo}</span>
                )}
              </div>
              <div className="datos">
                <label htmlFor="">
                  <i class="fa-regular fa-address-card"></i>
                </label>
                <input
                  type="text"
                  placeholder="AUTOR"
                  id="autor"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
                {errores.autor && (
                  <span className="error">{errores.autor}</span>
                )}
              </div>
              <div className="datos">
                <label htmlFor="">
                  <i class="fa-regular fa-calendar"></i>
                </label>
                <input
                  type="date"
                  name=""
                  id="fecha_publicacion"
                  value={fecha_publicacion}
                  onChange={(e) => setFechaPublicacion(e.target.value)}
                />
                {errores.fecha_publicacion && (
                  <span className="error">{errores.fecha_publicacion}</span>
                )}
              </div>
              <div className="datos">
                <label htmlFor="">
                  <i className="fas fa-sticky-note"></i>
                </label>
                <textarea
                  name=""
                  id="contenido"
                  cols="30"
                  rows="10"
                  placeholder="CONTENIDO"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                ></textarea>
                {errores.contenido && (
                  <span className="error">{errores.contenido}</span>
                )}
              </div>
              <div>
                <button onClick={publicar} className="boton-publicar">
                  PUBLICAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contenedor-boton">
        <div>
          <input
            type="text"
            placeholder="Buscar por autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button onClick={abrir} className="añadir">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="grid-contenedor">
        <div className="grid">
          {posts.map((post, i) => (
            <div className="card" key={post.id}>
              <div className="header-card">
                <h1>{post.titulo}</h1>
                <h2>{post.autor}</h2>
              </div>
              <div className="body-card">
                <p>{post.contenido}</p>
              </div>
              <div className="footer-card">
                <div>
                  <p>{new Date(post.fecha_publicacion).toLocaleDateString()}</p>
                </div>
                <div className="btn-mostrar">
                  <Link to={`/post/${post.id}`} className="link-mostrar">
                    MOSTRAR
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ShowPosts;
