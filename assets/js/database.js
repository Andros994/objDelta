$(document).ready(function () {

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
                default:
                    statusClass = "bg-light text-dark";
            }

            $("#agentsTable").append(`
                <tr class="agent-row" data-id="${agent.id}" style="cursor:pointer">
                    <td><strong>${agent.matricola}</strong></td>
                    <td>${agent.nome}</td>
                    <td>${agent.cognome}</td>
                    <td>
                        <span class="badge ${statusClass}">
                            ${agent.status}
                        </span>
                    </td>
                </tr>
            `);

        });

        $(".agent-row").on("click", function () {
            const id = $(this).data("id");
            window.location.href = `agent.html?id=${id}`;
        });

    }).fail(function () {
        console.error("Errore nel caricamento di agents.json");
    });

});
