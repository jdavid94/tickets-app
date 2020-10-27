const fs = require('fs');


class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last_4 = [];

        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last_4 = data.last_4;
        } else {
            this.countRestar();
        }
    }

    next() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${ this.last }`;
    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    getLast4Ticket() {
        return this.last_4;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'Not Tickets';
        }
        let numberTicket = this.tickets[0].number;
        this.tickets.shift();
        let attendTicket = new Ticket(numberTicket, desk);
        this.last_4.unshift(attendTicket);
        if (this.last_4.length > 4) {
            this.last_4.splice(-1, 1); // To delete de last element
        }
        console.log('Last 4')
        console.log(this.last_4);
        this.saveFile();
        return attendTicket;
    }


    countRestar() {
        this.last = 0;
        this.tickets = [];
        this.last_4 = [];
        console.log('System Init');
        this.saveFile();
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last_4: this.last_4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
    TicketControl
}