// determines the width and height of the canvas in pixels
let canvas_size = [400, 400]
// determines the number of cells on the grid
let grid_size = [25, 25]
// determines the size  of each cell in the grid
let grid_cell_size = [25, 25]

//

// stores the path
let grid = []

function setup () {
    // setup canvas
    createCanvas(canvas_size[0], canvas_size[1])
    background(0)

    // setup grid
    grid = [...Array(grid_size[0])].map(e => Array(grid_size[1]));

    // generate random path

}

function draw () {
    
}

function get_path (start_position, end_position)