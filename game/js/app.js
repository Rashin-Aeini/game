let player = {
    row: 0,
    column: 0
};

function render() {

    document.querySelector('#game').innerHTML = '';

    for (let row in tileMap01.mapGrid) {
        let result = '<div class="row">';
        for (let column in tileMap01.mapGrid[row]) {
            let value = '';
            if ((tileMap01.mapGrid[row][column]).length == 1) {
                value = tileMap01.mapGrid[row][column][0]
            } else {
                value = tileMap01.mapGrid[row][column][1];
                value = value === "B" ? "F" : value;
            }
            switch (value) {
                case " ":
                    result += '<div class="tile-space"></div>'
                    break;
                case "W":
                    result += '<div class="tile-wall"></div>'
                    break;
                case "B":
                    result += '<div class="entity-block"></div>'
                    break;
                case "G":
                    result += '<div class="tile-goal"></div>'
                    break;
                case "P":
                    {
                        result += '<div id="entity-player"></div>';
                        player.row = row;
                        player.column = column;
                        break;
                    }
                default:
                    result += '<div class="entity-success"></div>'
                    break;
            }
        }
        result += '</div>'
        document.querySelector('#game').innerHTML += result;
    }

}

document.querySelector('body').addEventListener('keydown', function (e) {
    if (
        e.code == "ArrowUp" ||
        e.code == "ArrowDown" ||
        e.code == "ArrowRight" ||
        e.code == "ArrowLeft"
    ) {

        let position = {
            row: 0,
            column: 0,
            box: {
                row: 0,
                column: 0
            }
        };

        if (e.code == "ArrowUp") {
            position.row = Number(player.row) - 1;
            position.column = Number(player.column);
            position.box.row = Number(player.row) - 2;
            position.box.column = Number(position.column)
        }

        if (e.code == "ArrowDown") {
            position.row = Number(player.row) + 1;
            position.column = player.column;
            position.box.row = Number(player.row) + 2;
            position.box.column = Number(position.column)
        }

        if (e.code == "ArrowRight") {
            position.row = player.row;
            position.column = Number(player.column) + 1;
            position.box.row = player.row;
            position.box.column = Number(player.column) + 2;
        }

        if (e.code == "ArrowLeft") {
            position.row = player.row;
            position.column = Number(player.column) - 1;
            position.box.row = player.row;
            position.box.column = Number(player.column) - 2;
        }

        let change = false;

        if (tileMap01.mapGrid[position.row][position.column][0] != "W") {

            if (tileMap01.mapGrid[position.row][position.column][0] == " ") {
                tileMap01.mapGrid[position.row][position.column][0] = "P";
                change = true;
            }

            if (tileMap01.mapGrid[position.row][position.column][0] == "G") {
                if (tileMap01.mapGrid[position.row][position.column].length == 1) {
                    tileMap01.mapGrid[position.row][position.column].push("P");
                    change = true;
                } else {
                    if (tileMap01.mapGrid[position.box.row][position.box.column][0] == " ") {
                        tileMap01.mapGrid[position.row][position.column].pop();
                        tileMap01.mapGrid[position.row][position.column].push("P");
                        tileMap01.mapGrid[position.box.row][position.box.column][0] == "B"
                        change = true;
                    }
                    if (tileMap01.mapGrid[position.box.row][position.box.column][0] == "G" &&
                        tileMap01.mapGrid[position.box.row][position.box.column].length == 1) {
                        tileMap01.mapGrid[position.row][position.column].pop();
                        tileMap01.mapGrid[position.row][position.column].push("P");
                        tileMap01.mapGrid[position.box.row][position.box.column].push("B");
                        change = true;
                    }
                }

            }

            if (tileMap01.mapGrid[position.row][position.column][0] == "B") {
                if (tileMap01.mapGrid[position.box.row][position.box.column][0] == " ") {
                    tileMap01.mapGrid[position.box.row][position.box.column][0] = "B";
                    tileMap01.mapGrid[position.row][position.column][0] = "P";
                    change = true;
                }
                if (tileMap01.mapGrid[position.box.row][position.box.column][0] == "G" &&
                    tileMap01.mapGrid[position.box.row][position.box.column].length == 1) {
                    tileMap01.mapGrid[position.box.row][position.box.column].push("B");
                    tileMap01.mapGrid[position.row][position.column][0] = "P";
                    change = true;
                }
            }

            if (change) {
                //Clear old player position
                if (tileMap01.mapGrid[player.row][player.column][0] == "G") {
                    tileMap01.mapGrid[player.row][player.column].pop();
                } else {
                    tileMap01.mapGrid[player.row][player.column][0] = " ";
                }

                //Save new position
                player.row = Number(position.row);
                player.column = Number(position.column);
            }


        }


        //Replace map
        render();
    }
});

render();