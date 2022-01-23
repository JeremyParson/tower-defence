// determines the width and height of the canvas in pixels
let canvas_size = [700, 500];
// determines the number of cells on the grid
let grid_size = [25, 25];
// determines the size  of each cell in the grid
let grid_cell_size = [25, 25];

let spawn_position = [3, 3];
let base_position = [22, 13];

// stores the path
let game_grid = [];

function setup() {
  // setup canvas
  createCanvas(canvas_size[0], canvas_size[1]);
  background(0);

  // create wd grid using grid_size for dimension
  game_grid = Array.from(Array(grid_size[0]), () => new Array(grid_size[1]));

  // generate path from enemy spawn to player base and add path to grid
  let path = get_random_path(spawn_position, base_position);
  for (index in path) {
    let position = path[parseInt(index)];
    game_grid[position[0]][position[1]] = -2;
  }

  // generate flowmaps on path
  generate_flow_map(game_grid, base_position);
  
  console.table(game_grid)
}

function draw() {
  render_grid(game_grid);
}

// generates a random path from a given start positon to end position
function get_random_path(start_position, end_position) {
  let current_position = start_position;
  let path = [];
  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  while (!equals(current_position, end_position)) {
    if (Math.random() > 0.5) {
      current_position[0] += current_position[0] > end_position[0] ? -1 : 1;
    } else {
      current_position[1] += current_position[1] > end_position[1] ? -1 : 1;
    }

    path.push([...current_position]);
  }
  return path;
}

// generates a "flow map" which assigns a step value to all path cells
function generate_flow_map(grid, start_position) {
  // create a list of cells to be visited and store current position
  let current_position = start_position;
  let open = [Cell(current_position)];

  // loop until there are no more cells to visit
  while (open.length) {
    let currentCell = open.pop();
    // set the paths value on grid
    set_value(grid, currentCell.position, currentCell.step);

    // look through neighboring cells for other path cells
    let directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];
    // check the 4 neighboring cells
    for (let direction of directions) {
      let child_cell_position = add(currentCell.position, direction);
      // determine if cell is on path and is unvisited
      if (get_value(grid, child_cell_position) == -2) {
        open.push(Cell(child_cell_position, currentCell.step + 1));
      }
    }
  }
}

function Cell(position, step = 0) {
  return {
    position: position,
    step: step,
  };
}

// renders the game grid
function render_grid(grid) {
  for (x in game_grid) {
    for (y in game_grid[x]) { 
      let cell_draw_position = [x * grid_cell_size[0], y * grid_cell_size[1]];
      fill(game_grid[x][y] != -1 ? 255 : 0);
      rect(
        cell_draw_position[0],
        cell_draw_position[1],
        grid_cell_size[0],
        grid_cell_size[1]
      );
      fill(255, 0, 0)
      text(game_grid[x][y], cell_draw_position[0], cell_draw_position[1] + (grid_cell_size[1] / 2))
    }
  }
}

function add(x, y) {
  return x.map((x, i) => x + y[i]);
}

function get_value(array, position) {
  return array[position[0]][position[1]];
}

function set_value(array, position, value) {
  array[position[0]][position[1]] = value;
}
