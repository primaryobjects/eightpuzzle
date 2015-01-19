/*
    Eight Puzzle Solver
    by Kory Becker 2015 http://primaryobjects.com/kory-becker

    Solves the eight-puzzle (sliding block puzzle) by using the A* algorithm.

    The program works by taking the starting state and evaluating the next possible moves, applying a cost value to each next state.
    The cost (h) of a state is calculated by adding up the manhatten distance of each block from their goal state.
    For example, if a particular block is 3 moves left and 2 moves down from its goal state, then this adds 5 to the cost. You repeat this for the other blocks.
    A cost (g) is also applied to each state, which cooresponds to the depth to reach this part of the path. This provides a penalty to re-visiting an already-visited state.

    The A* algorithm then selects the next state.
    Each child state records it's parent, so that once a solution is found, you can walk backwards up the parent path to return the solution.

    Compare the results of this program to online versions, using A* and manhatten distance:
    https://n-puzzle-solver.appspot.com/
    http://himanshug.info/8puzzle/8puzzle.html
*/

PuzzleManager = {
  size: 3,

  start: [6, 4, 8, 
          1, 5, 7, 
          0, 3, 2],
  end:   [1, 2, 3,
          4, 5, 6,
          7, 8, 0],

  h: function(state) {
    // Calculate h-cost of state. Add manhatten distance of each block from its goal.
    var cost = 0;

    for (var index in state) {
        var digit = state[index];
        if (digit != 0) {
            var goalIndex = PuzzleManager.end.indexOf(digit);

            // Calculate current position of digit and goal position of digit.
            var currentPosition = PuzzleManager.getXY(index);
            var goalPosition = PuzzleManager.getXY(goalIndex);

            // Calculate manhatten distance from currentPosition to goalPosition.
            cost += Math.abs(currentPosition.x - goalPosition.x) + Math.abs(currentPosition.y - goalPosition.y);
        }
    }

    return cost;
  },

  getXY: function(index) {
    // Returns the {x, y} coordinate for the specified index in the array (3x3 board).
    var x = index % PuzzleManager.size;
    var y = Math.floor(index / PuzzleManager.size);

    return {x: x, y: y};
  },

  print: function(state) {
    // Draws a representation of the state.
    var line = '';
    var count = 0;

    for (var index in state) {
        line += state[index] + ', ';

        if (count++ == PuzzleManager.size - 1) {
            console.log(line);
            line = '';
            count = 0;
        }
    }

    console.log('(' + PuzzleManager.h(state) + ')');
  },

  fringe: function(state) {
    // Returns an array of next available states.
    var nextStates = [];
    var blankIndex = state.indexOf(0);
    var blankPosition = PuzzleManager.getXY(blankIndex);

    // Right.
    if (blankIndex + 1 < PuzzleManager.size * PuzzleManager.size) {
        var tryPosition = PuzzleManager.getXY(blankIndex + 1);
        if (tryPosition.x > blankPosition.x) {
            // Valid move.
            var nextState = state.slice(0);

            // Swap blank with digit to the right.
            var tmp = nextState[blankIndex];
            nextState[blankIndex] = nextState[blankIndex + 1];
            nextState[blankIndex + 1] = tmp;

            // Calculate cost.
            var cost = PuzzleManager.h(nextState);
            nextStates.push({ state: nextState, h: cost, direction: 'L' });
        }
    }

    // Left.
    if (blankIndex - 1 > -1) {
        var tryPosition = PuzzleManager.getXY(blankIndex - 1);
        if (tryPosition.x < blankPosition.x) {
            // Valid move.
            var nextState = state.slice(0);

            // Swap blank with digit to the right.
            var tmp = nextState[blankIndex];
            nextState[blankIndex] = nextState[blankIndex - 1];
            nextState[blankIndex - 1] = tmp;

            // Calculate cost.
            var cost = PuzzleManager.h(nextState);
            nextStates.push({ state: nextState, h: cost, direction: 'R' });
        }
    }

    // Down.
    if (blankIndex + PuzzleManager.size < PuzzleManager.size * PuzzleManager.size) {
        var tryPosition = PuzzleManager.getXY(blankIndex + PuzzleManager.size);
        if (tryPosition.y > blankPosition.y) {
            // Valid move.
            var nextState = state.slice(0);

            // Swap blank with digit to the right.
            var tmp = nextState[blankIndex];
            nextState[blankIndex] = nextState[blankIndex + PuzzleManager.size];
            nextState[blankIndex + PuzzleManager.size] = tmp;

            // Calculate cost.
            var cost = PuzzleManager.h(nextState);
            nextStates.push({ state: nextState, h: cost, direction: 'U' });
        }
    }

    // Up.
    if (blankIndex - PuzzleManager.size > -1) {
        var tryPosition = PuzzleManager.getXY(blankIndex - PuzzleManager.size);
        if (tryPosition.y < blankPosition.y) {
            // Valid move.
            var nextState = state.slice(0);

            // Swap blank with digit to the right.
            var tmp = nextState[blankIndex];
            nextState[blankIndex] = nextState[blankIndex - PuzzleManager.size];
            nextState[blankIndex - PuzzleManager.size] = tmp;

            // Calculate cost.
            var cost = PuzzleManager.h(nextState);
            nextStates.push({ state: nextState, h: cost, direction: 'D' });
        }
    }

    return nextStates;
  },

  isGoal: function(state) {
    return (PuzzleManager.h(state) == 0);
  },

  run: function(state) {
    // Runs A* algorithm on starting state and returns list of states to goal.
    var result = null;
    var visited = {};
    var currentState = { state: state, h: PuzzleManager.h(state) + 1, g: 0 };
    var states = [ currentState ]; // list of discovered states
    var count = 0;

    while (!PuzzleManager.isGoal(currentState.state) && count++ < 99999) {
        // Mark this state as visited, so we don't go here again.
        visited[JSON.stringify(currentState.state)] = 1;

        // Get list of fringe states.
        currentState.children = PuzzleManager.fringe(currentState.state);

        // Add undiscovered states to our list of known states.
        for (var index in currentState.children) {
            currentState.children[index].parent = currentState;
            currentState.children[index].g = currentState.g + 1;

            if (!visited[JSON.stringify(currentState.children[index].state)]) {
                states.push(currentState.children[index]);
            }
        }

        // Sort states by cost.
        states = states.sort(function(a, b) { return (a.h + a.g) - (b.h + b.g) });

        // Move to the cheapest state (the first one in the sorted list).
        currentState = states[0];

        // Remove this state from the list of unvisited states, so that we don't visit it again (with this f-score).
        states.shift();
    }

    if (PuzzleManager.isGoal(currentState.state)) {
        var moves = 0;
        var path = '';
        result = {};
        result.states = [];

        // Walk backwards from solution back to starting state.
        while (JSON.stringify(currentState.state) != JSON.stringify(state)) {
            // Add this state to the front of the array.
            result.states.unshift(currentState);

            // Add the direction to the front.
            path = currentState.direction + path;

            // Follow parent path.
            currentState = currentState.parent;

            moves++;
        }

        // Add starting state to front.
        result.states.unshift({ state: state });
        result.moves = moves;
        result.path = path;
    }

    return result;
  }
};

// Solve eight-puzzle.
var result = PuzzleManager.run(PuzzleManager.start);

// Display game board states.
for (var i in result.states) {
    PuzzleManager.print(result.states[i].state);
}

// Display solution path.
console.log('Solution: ' + result.moves + ' steps');
console.log(result.path);
