import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])


  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data)
    });
  }, [])

  async function handleAddRepository() {
    const data = {
      title: 'Desafio Node.js',
      url: 'http://github.com/...',
      techs: ["Node.js", "Vue"],
    }
    const resp = await api.post('repositories', data)
    setRepositories([...repositories, resp.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(resp => resp.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <ul>
              <li><a href={repository.url} target="_blank">{repository.title}</a></li>
            </ul>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
