$(document).ready(function () {

    const params = new URLSearchParams(window.location.search);
    const agentId = parseInt(params.get("id"));

    $.getJSON("agents.json", function (data) {

        const agent = data.agents.find(a => a.id === agentId);

        if (!agent) {
            alert("Agente non trovato");
            return;
        }

        $("#profilePic").attr("src", agent.profile_pic);
        $("#fullName").text(`${agent.nome} ${agent.cognome}`);
        $("#status").text(agent.status);
        $("#bio").text(agent.bio);

    });

});