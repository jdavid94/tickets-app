// Command to activated connection
var socket = io();
var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicket3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')

var lblEscritorio1 = $('#lblEscritorio1')
var lblEscritorio2 = $('#lblEscritorio2')
var lblEscritorio3 = $('#lblEscritorio3')
var lblEscritorio4 = $('#lblEscritorio4')

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]

socket.on('ticketState', function(data) {
    //console.log(data);
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play();
    updateHTML(data.last_4);
});

socket.on('last_4', function(data) {
    //console.log(data);
    updateHTML(data.last_4);
});

function updateHTML(last4) {
    for (var i = 0; i <= last4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + last4[i].number);
        lblEscritorios[i].text('Desk ' + last4[i].desk);
    }
}