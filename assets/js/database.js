$(document).ready(function() {

  const $tableBody = $("#agentsTable tbody");
  const $modal = $("#codeModal");
  const $codeInput = $("#accessCode");
  const $confirmBtn = $("#confirmCode");
  const $closeBtn = $("#closeModal");
  const $resetBtn = $("#resetDataBtn");

  let selectedAgentId = null;

  // ===== STATUS COLOR =====
  function getStatusColor(status) {
    switch (status) {
      case "Operativo": return "green";
      case "In missione": return "orange";
      case "Spia nemica": return "red";
      case "Offline": return "gray";
      default: return "black";
    }
  }

  // ===== RENDER TABLE =====
  function renderTable(agents) {
    $tableBody.empty();
    agents.forEach(agent => {
      const row = $(`
        <tr class="agent-row" data-id="${agent.id}">
          <td>${agent.matricola}</td>
          <td>${agent.nome}</td>
          <td>${agent.cognome}</td>
          <td style="color:${getStatusColor(agent.status)}; font-weight:bold;">
            ${agent.status}
          </td>
        </tr>
      `);
      $tableBody.append(row);
    });
  }

  // ===== LOAD DATA =====
  $.getJSON("data/agents.json", function(data) {

    let agents = data.agents;

    // Se esistono modifiche salvate localmente
    const savedAgents = JSON.parse(localStorage.getItem("agentsData"));
    if (savedAgents) {
      agents = savedAgents;
    }

    renderTable(agents);

  }).fail(function() {
    console.error("Errore nel caricamento JSON");
  });

  // ===== CLICK SU RIGA =====
  $(document).on("click", ".agent-row", function() {
    selectedAgentId = $(this).data("id");
    $codeInput.val("");
    $modal.show();
  });

  // ===== CONFERMA CODICE =====
  $confirmBtn.on("click", function() {
    if ($codeInput.val() === "7294") {
      window.location.href = `agent.html?id=${selectedAgentId}`;
    } else {
      alert("Codice di accesso errato!");
    }
  });

  // ===== CHIUSURA MODALE =====
  $closeBtn.on("click", function() {
    $modal.hide();
  });

  $(window).on("click", function(e) {
    if ($(e.target).is($modal)) {
      $modal.hide();
    }
  });

  // ===== RESET DATABASE =====
  $resetBtn.on("click", function() {
    if (confirm("Vuoi davvero ripristinare il database originale? Tutte le modifiche verranno perse.")) {
      localStorage.removeItem("agentsData");
      alert("Database ripristinato con successo!");
      location.reload();
    }
  });

});

