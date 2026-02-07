$(document).ready(function () {

    // 1️⃣ Prendo l'id dalla query string (?id=)
    const params = new URLSearchParams(window.location.search);
    const agentId = parseInt(params.get("id"));

    if (!agentId) {
        console.error("ID agente non valido");
        return;
    }

    // 2️⃣ Carico il JSON
    $.getJSON("data/agents.json", function (data) {

        // 3️⃣ Filtro l'agente in base all'id
        const agent = data.agents.find(a => a.id === agentId);

        if (!agent) {
            console.error("Agente non trovato");
            return;
        }

        // 4️⃣ Popolo la card con i dati dell'agente
        $("#profilePic").attr("src", agent.profile_pic);
        $("#fullName").text(`${agent.nome} ${agent.cognome}`);
        $("#status").val(agent.status);
        $("#matricola").text(`Matricola: ${agent.matricola}`);
        $("#bio").text(agent.bio);

        // Listener cambio status (solo frontend per ora)
        $("#status").on("change", function () {
            const newStatus = $(this).val();
            alert(`Nuovo status per ${agent.cognome} ${agent.nome}: ${newStatus}`);
        });

    }).fail(function () {
        console.error("Errore nel caricamento di agents.json");
    });

});


