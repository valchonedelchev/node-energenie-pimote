'use strict';

var rpio = require('rpio');

rpio.init({
    gpiomem: true,
    mapping: 'physical'
});

// The GPIO pins for the Energenie module
var BIT1 = 11;
var BIT2 = 15;
var BIT3 = 16;
var BIT4 = 13;
var ON_OFF_KEY = 18;
var ENABLE = 22;

rpio.open(BIT1, rpio.OUTPUT, rpio.LOW);
rpio.open(BIT2, rpio.OUTPUT, rpio.LOW);
rpio.open(BIT3, rpio.OUTPUT, rpio.LOW);
rpio.open(BIT4, rpio.OUTPUT, rpio.LOW);
rpio.open(ENABLE, rpio.OUTPUT, rpio.LOW);
rpio.open(ON_OFF_KEY, rpio.OUTPUT, rpio.LOW);

// Codes for switching on and off the sockets
//           all     1       2       3       4
var ON = ['1101', '1111', '0111', '1011', '0011'];
var OFF = ['1100', '1110', '0110', '1010', '0010'];

// Set state to OFF by default
var s_state = [0, 0, 0, 0, 0];

module.exports = {
    msleep: function(ms) {
        rpio.msleep(ms);
    },
    switchOn: function(socket, tout) {
        this.set_state(socket, 1);
        this.send(socket, ON, tout);
    },
    switchOff: function(socket, tout) {
        this.set_state(socket, 0);
        this.send(socket, OFF, tout);
    },
    send: function(socket, state, tout) {
        // console.log('socket: ' + socket, state[socket]);
        rpio.write(BIT1, state[socket][0] == 1 ? rpio.HIGH : rpio.LOW);
        rpio.write(BIT2, state[socket][1] == 1 ? rpio.HIGH : rpio.LOW);
        rpio.write(BIT3, state[socket][2] == 1 ? rpio.HIGH : rpio.LOW);
        rpio.write(BIT4, state[socket][3] == 1 ? rpio.HIGH : rpio.LOW);
        rpio.msleep(100);

        if (!tout) {
            tout = 250;
        }

        rpio.write(ENABLE, rpio.HIGH);
        rpio.msleep(parseInt(tout));
        rpio.write(ENABLE, rpio.LOW);
    },
    set_state: function(socket, state) {
        s_state[socket] = state;
    },
    get_state: function(socket) {
        return s_state[socket];
    },
    close: function() {
        rpio.close(BIT1);
        rpio.close(BIT2);
        rpio.close(BIT3);
        rpio.close(BIT4);
        rpio.close(ENABLE);
        rpio.close(ON_OFF_KEY);
    }
};
