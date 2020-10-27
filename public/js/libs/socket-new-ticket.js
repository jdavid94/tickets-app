// Command to activated connection
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connectect', function() {
    console.log('User connected');
});

socket.on('disconnect', function() {
    console.log('User Disconnected');
});

// on State
socket.on('ticketState', function(resp) {
    console.log(resp.state);
    label.text(resp.state);
});

$('button').on('click', function() {
    //console.log('click');
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});