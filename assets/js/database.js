document.addEventListener("DOMContentLoaded", () => {

  const tableBody = document.querySelector("#agentsTable tbody");
  const modal = document.getElementById("codeModal");
  const codeInput = document.getElementById("accessCode");
  const confirmBtn = document.getElementById("confirmCode");
  const closeBtn = document.getElementById("closeModal");

  let selectedAgentId = null;

  // ===== STATUS COLOR HELPER =====
  function getStatusColor(status) {
    switch (status) {
      case "Operativo":
        return "green";
      case "In missione":
        return "orange";
      case "Spia nemica":
        return "red";
      case "Offline":
        return "gray";
      default:
        return "white";
    }
  }

  // ===== RENDER TABLE =====
  function renderTable(agents) {
    tableBody.innerHTML = "";

    agents.forEach(agent => {
      const row = document.createElement("tr");
      row.classList.add("agent-row");
      row.dataset.id = agent.id;

      row.innerHTML = `
        <td>${agent.matricola}</td>
        <td>${agent.nome}</td>
        <td>${agent.cognome}</td>
        <td style="color:${getStatusColor(agent.status)}; font-weight:bold;">
          ${agent.status}
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  // ===== LOAD DATA =====
  fetch("data/agenti.json")
    .then(res => res.json())
    .then(data => {

      let agents = data.agents;

      // Se esistono modifiche salvate localmente
      const savedAgents = JSON.parse(localStorage.getItem("agentsData"));
      if (savedAgents) {
        agents = savedAgents;
      }

      renderTable(agents);
    })
    .catch(error => {
      console.error("Errore nel caricamento JSON:", error);
    });


  // ===== CLICK SU RIGA =====
  document.addEventListener("click", function (e) {
    const row = e.target.closest(".agent-row");
    if (!row) return;

    selectedAgentId = row.dataset.id;

    codeInput.value = "";
    modal.style.display = "flex";
  });


  // ===== CONFERMA CODICE =====
  confirmBtn.addEventListener("click", () => {
    if (codeInput.value === "7924") {
      window.location.href = `agent.html?id=${selectedAgentId}`;
    } else {
      alert("Codice di accesso errato!");
    }
  });


  // ===== CHIUSURA MODALE =====
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});

