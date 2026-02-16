$(document).ready(function() {

  const urlParams = new URLSearchParams(window.location.search);
  const agentId = urlParams.get("id");

  let agentData = null;

  // ===== LOAD AGENT DATA =====
  function loadAgent() {

    // Primo controllo: dati salvati in localStorage
    let savedAgents = JSON.parse(localStorage.getItem("agentsData"));

    if (savedAgents) {
      agentData = savedAgents.find(agent => agent.id == agentId);
      if (agentData) {
        populateFields(agentData);
        return;
      }
    }

    // Se non ci sono dati salvati, carica dal JSON originale
    $.getJSON("data/agents.json", function(data) {
      agentData = data.agents.find(agent => agent.id == agentId);
      if (agentData) {
        populateFields(agentData);
      } else {
        alert("Agente non trovato!");
      }
    }).fail(function() {
      console.error("Errore nel caricamento JSON");
    });

  }

  // ===== POPOLA I CAMPI =====
  function populateFields(agent) {
    $("#nome").val(agent.nome);
    $("#cognome").val(agent.cognome);
    $("#status").val(agent.status);
    $("#frequenza").val(agent.frequenza_contatto);
    $("#coordinate").val(agent.ultime_coordinate_note);
    $("#bio").val(agent.bio);
  }

  // ===== SALVA MODIFICHE =====
  $("#saveAgentBtn").on("click", function() {

    if (!agentData) return;

    const updatedAgent = {
      ...agentData,
      nome: $("#nome").val(),
      cognome: $("#cognome").val(),
      status: $("#status").val(),
      frequenza_contatto: $("#frequenza").val(),
      ultime_coordinate_note: $("#coordinate").val(),
      bio: $("#bio").val()
    };

    // Recupera lista attuale da localStorage
    let agents = JSON.parse(localStorage.getItem("agentsData")) || [];

    // Se localStorage è vuoto, inizializzalo con JSON originale
    if (agents.length === 0) {
      $.getJSON("data/agents.json", function(data) {
        agents = data.agents;
        saveToLocalStorage(updatedAgent, agents);
      });
    } else {
      saveToLocalStorage(updatedAgent, agents);
    }
  });

  // ===== FUNZIONE DI SALVATAGGIO =====
  function saveToLocalStorage(updatedAgent, agents) {
    const index = agents.findIndex(a => a.id == updatedAgent.id);
    if (index !== -1) {
      agents[index] = updatedAgent;
    } else {
      agents.push(updatedAgent);
    }

    localStorage.setItem("agentsData", JSON.stringify(agents));
    alert("Modifiche salvate correttamente!");
  }

  // ===== INIZIALIZZA =====
  loadAgent();

});
