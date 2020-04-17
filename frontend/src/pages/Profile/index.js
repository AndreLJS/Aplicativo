import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";
import logoImg from "../../assets/logo.png";

export default function Profile() {
  const [vagas, setVagas] = useState([]);

  const history = useHistory();
  const companyId = localStorage.getItem("companyId");
  const companyName = localStorage.getItem("companyName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: companyId,
        },
      })
      .then((response) => {
        setVagas(response.data);
      });
  }, [companyId]);

  async function handleDeleteVaga(id) {
    try {
      await api.delete(`vagas/${id}`, {
        headers: {
          Authorization: companyId,
        },
      });

      setVagas(vagas.filter((vaga) => vaga.id !== id));
    } catch (err) {
      alert("Erro ao deletar vaga, tente novamente.");
    }
  }
  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="FranJobs" />
        <span>Bem vindo, {companyName}</span>

        <Link className="button" to="/vagas/new">
          Cadastrar nova vaga
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#fc961e" />
        </button>
      </header>

      <h1>Vagas Cadastradas</h1>

      <ul>
        {vagas.map((vaga) => (
          <li key={vaga.id}>
            <strong>Vaga:</strong>
            <p>{vaga.title}</p>

            <strong>Descrição:</strong>
            <p>{vaga.description}</p>

            <strong>Local de Trabalho:</strong>
            <p>{vaga.workplace}</p>

            <strong>Salário:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(vaga.value)}
            </p>

            <button onClick={() => handleDeleteVaga(vaga.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
