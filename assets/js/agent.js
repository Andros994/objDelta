const urlParams = new URLSearchParams(window.location.search);
const agentId = urlParams.get("id");

let agentData = null;

// Carica dati
fetch("agenti.json")
  .then(res => res.json())
  .then(data => {

    const agents = data.agents;

    // Se esiste versione salvata
    const savedAgents = JSON.parse(localStorage.getItem("agentsData"));
    const source = savedAgents ? savedAgents : agents;

    agentData = source.find(agent => agent.id == agentId);

    if (agentData) {
      document.getElementById("nome").value = agentData.nome;
      document.getElementById("cognome").value = agentData.cognome;
      document.getElementById("status").value = agentData.status;
      document.getElementById("frequenza").value = agentData.frequenza_contatto;
      document.getElementById("coordinate").value = agentData.ultime_coordinate_note;
      document.getElementById("bio").value = agentData.bio;
    }
  });


// SALVA MODIFICHE
document.getElementById("saveAgentBtn").addEventListener("click", () => {

  const updatedAgent = {
    ...agentData,
    nome: document.getElementById("nome").value,
    cognome: document.getElementById("cognome").value,
    status: document.getElementById("status").value,
    frequenza_contatto: document.getElementById("frequenza").value,
    ultime_coordinate_note: document.getElementById("coordinate").value,
    bio: document.getElementById("bio").value
  };

  // Recupera lista attuale
  fetch("agenti.json")
    .then(res => res.json())
    .then(data => {

      let agents = data.agents;

      const savedAgents = JSON.parse(localStorage.getItem("agentsData"));
      if (savedAgents) agents = savedAgents;

      const index = agents.findIndex(a => a.id == agentId);
      agents[index] = updatedAgent;

      localStorage.setItem("agentsData", JSON.stringify(agents));

      alert("Modifiche salvate correttamente!");
    });
});
