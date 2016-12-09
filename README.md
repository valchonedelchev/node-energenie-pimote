# node-energenie-pimote
Remotely control power sockets from the Raspberry Pi using https://www.npmjs.com/package/rpio node library.

# How to pair a socket
Here's how to (re)pair a Energenie socket 1:

1. Press and hold the button until the light start to flash quickly
2. Run the following command `pimote pair 1`

# How to switch on/off a socket
* To switch socket 1 on: `pimote on 1`
* To switch socket 1 off: `pimote off 1`

# pimote

```
pimote on 1
pimote off 1
pimote pair 1
```

# Methods

### close()

Use this method at the end of your program to close down the pins.

### switchOn(socketIndex, *timeout)

Switching __ON__ the socket using __socketIndex__ with optional timeout in miliseconds, default is to 250 and sets the state to ON.

### switchOff(socketIndex)

Switching __OFF__ the socket using __socketIndex__ and sets the state to ON.

### {get|set}_state(socketIndex)

This method is not quite reliable as the socket is stateless. It's usefull for long running precesses only.

# Author
Valcho Nedelchev
