import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function NewVagas() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qualification, setQualification] = useState("");
  const [formation, setFormation] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const companyId = localStorage.getItem("companyId");

  async function handleNewVaga(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      qualification,
      formation,
      workplace,
      value,
    };
    try {
      await api.post("vagas", data, {
        headers: {
          Authorization: companyId,
        },
      });

      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar vaga, tente novamente");
    }
  }

  return (
    <div className="new-vagas-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="FranJobs" />
          <h1>Cadastrar nova vaga</h1>
          <p>
            Descreva a vaga detalhadamente para encontrar um profissional para
            preenchê-la.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewVaga}>
          <input
            placeholder="Título da Vaga"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Qualificação"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
          <input
            placeholder="Formação Acadêmica"
            value={formation}
            onChange={(e) => setFormation(e.target.value)}
          />
          <input
            placeholder="Local de Trabalho"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
          />
          <input
            placeholder="Salário"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar Vaga
          </button>
        </form>
      </div>
    </div>
  );
}
