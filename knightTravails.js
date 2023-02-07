const Square = (location, prevSquare = null) => {
  const movesXAxis = [2, 2, 1, 1, -1, -1, -2, -2];
  const movesYAxis = [1, -1, 2, -2, 2, -2, 1, -1];
  const tempArray = [];

  while (movesXAxis.length > 0) {
    const move = [
      location[0] + movesXAxis.shift(),
      location[1] + movesYAxis.shift(),
    ];

    tempArray.push(move);
  }

  const possibleMoves = tempArray.filter((item) => (
    (item[0] < 8 && item[0] > -1)
    && (item[1] < 8 && item[1] > -1)
  ));

  return { location, prevSquare, possibleMoves };
};

const knightMoves = (startLocation, endLocation) => {
  // Early exit if one of the values passed is invalid
  const valid = /^[0-7]$/;

  if (!valid.test(startLocation[0]) || !valid.test(startLocation[1])) {
    console.log('Start location is off the board!');
    return;
  }

  if (!valid.test(endLocation[0]) || !valid.test(endLocation[1])) {
    console.log('End location is off the board!');
    return;
  }

  // Continue function if values passed are valued
  const startingSquare = Square(startLocation);
  const queue = [startingSquare];
  const path = [];
  let moves = 0;
  let currentSquare;

  // Create the graph
  while (queue.length > 0) {
    const square = queue.shift();

    if ((square.location[0] === endLocation[0]) && (square.location[1] === endLocation[1])) {
      currentSquare = square;
      path.push(square.location);
      break;
    }

    square.possibleMoves.forEach((item) => {
      queue.push(Square(item, square));
    });
  }

  // Find the path and the number of moves
  while (currentSquare.prevSquare !== null) {
    currentSquare = currentSquare.prevSquare;
    path.push(currentSquare.location);
    moves += 1;
  }

  // Log path
  const logPath = () => {
    while (path.length > 0) {
      const location = path.pop();
      console.log(location);
    }
  };

  console.log(`You made it in ${moves} moves. Here's your path:`);
  logPath();
};

// Test
knightMoves([3, 3], [4, 7]);
knightMoves([0, 0], [7, 7]);
knightMoves([-1, 0], [7, 7]);
knightMoves([0, 0], [7, 8]);
