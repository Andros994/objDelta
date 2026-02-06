$(document).ready(function () {

    $.getJSON("data/agents.json", function (data) {

        data.agents.forEach(agent => {

            const row = `
                <tr class="agent-row" data-id="${agent.id}" style="cursor:pointer">
                    <td>${agent.matricola}</td>
                    <td>${agent.nome}</td>
                    <td>${agent.cognome}</td>
                    <td>
                        <span class="badge bg-success">${agent.status}</span>
                    </td>
                </tr>
            `;

            $("#agentsTable").append(row);
        });

        $(".agent-row").on("click", function () {
            const agentId = $(this).data("id");
            window.location.href = `agent.html?id=${agentId}`;
        });

    });


});

