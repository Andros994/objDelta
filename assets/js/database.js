$(document).ready(function () {

    let selectedAgentId = null;

    $.getJSON("data/agents.json", function (data) {

        data.agents.forEach(agent => {

            let statusClass = "";

            switch (agent.status) {
                case "Operativo":
                    statusClass = "bg-success";
                    break;
                case "In missione":
                    statusClass = "bg-warning text-dark";
                    break;
                case "Spia nemica":
                    statusClass = "bg-danger";
                    break;
                case "Offline":
                    statusClass = "bg-secondary";
                    break;
            }

            $("#agentsTable").append(`
                <tr class="agent-row" data-id="${agent.id}" style="cursor:pointer">
                    <td><strong>${agent.matricola}</strong></td>
                    <td>${agent.nome}</td>
                    <td>${agent.cognome}</td>
                    <td><span class="badge ${statusClass}">${agent.status}</span></td>
                </tr>
            `);

        });

    });

    // 🔹 CLICK SU RIGA
    $(document).on("click", ".agent-row", function () {
        selectedAgentId = $(this).data("id");

        $("#accessCode").val(""); // pulisco campo
        const modal = new bootstrap.Modal(document.getElementById('accessModal'));
        modal.show();
    });

    // 🔹 CLICK SU CONFERMA
    $("#confirmAccess").on("click", function () {

        const enteredCode = $("#accessCode").val();

        if (enteredCode === "7924") {

            window.location.href = `agent.html?id=${selectedAgentId}`;

        } else {

            alert("Codice di accesso errato!");

        }

    });

});
