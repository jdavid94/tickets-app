const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        console.log('Next Ticket');
        console.log(next);
        //Ejecutamos el CallBack con el siguiente ticket
        callback(next);
    });

    client.emit('ticketState', {
        state: ticketControl.getLastTicket(),
        last_4: ticketControl.getLast4Ticket()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk is Required'
            });
        }
        let attendTicket = ticketControl.attendTicket(data.desk);
        callback(attendTicket);
        // Refresh new changes in the last 4 - Emit Event
        client.broadcast.emit('last_4', {
            last_4: ticketControl.getLast4Ticket()
        })
    });
});