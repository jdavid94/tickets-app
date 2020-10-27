// Command to activated connection
var socket = io();
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('Desk is Required');
}
var desk = searchParams.get('desk');
console.log(desk);
var label = $('small');
$('h1').text('Desk ' + desk);
$('button').on('click', function() {
    socket.emit('attendTicket', { desk: desk }, function(resp) {
        if (resp === 'Not Tickets') {
            $('h5').text(resp);
            alert(resp);
            return;
        }
        $('h5').text('Ticket ' + resp.number);
    })
});