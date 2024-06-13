# Lean 4 Game

This is the source code for a Lean game platform hosted at [adam.math.hhu.de](https://adam.math.hhu.de).

## Creating a Game

Please follow the tutorial [Creating a Game](doc/create_game.md). In particular, the following steps might be of interest:

* Step 5: [How to Run Games Locally](doc/running_locally.md)
* Step 7: [How to Update an existing Game](doc/update_game.md)
* Step 8: [How to Publishing a Game](doc/publish_game.md)
* [Troubleshooting](doc/troubleshoot.md)

## Documentation

The documentation is very much work in progress but the linked documentation here
should be up-to-date:

### Game creation API

- [Creating a Game](doc/create_game.md): **the main document to consult**.
- [More about Hints](doc/hints.md): describes the `Hint` and `Branch` tactic.

### Frontend API

* [How to Run Games Locally](doc/running_locally.md): play a game on your computer
* [How to Update an existing Game](doc/update_game.md): update to a new lean version
* [How to Publishing a Game](doc/publish_game.md): load your game to adam.math.hhu.de for others to play

### Backend

not fully written yet.

* [Server](doc/DOCUMENTATION.md): describes the server part (i.e. the content of `server/` und `relay/`).

## Contributing

Contributions to `lean4game` are always welcome!

## Security

Providing the use access to a Lean instance running on the server is a severe security risk. That is why we start the Lean server with bubblewrap.

## Credits

The project has pimarily been developed by Alexander Bentkamp and Jon Eugster.

It is based on ideas from the [Lean Game Maker](https://github.com/mpedramfar/Lean-game-maker) and the [Natural Number Game
(NNG)](https://www.ma.imperial.ac.uk/~buzzard/xena/natural_number_game/)
by Kevin Buzzard and Mohammad Pedramfar, and on Patrick Massot's prototype: [NNG4](https://github.com/PatrickMassot/NNG4).
