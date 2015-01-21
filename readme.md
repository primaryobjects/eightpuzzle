Eight Puzzle Solver
=========

Solves the eight-puzzle (sliding block puzzle) by using the A* algorithm.

A* Algorithm Details
---

The program works by taking the starting state and evaluating the next possible moves, applying a cost value to each next state.

The cost (h) of a state is calculated by adding up the manhatten distance of each block from their goal state. For example, if a particular block is 3 moves left and 2 moves down from its goal state, then this adds 5 to the cost. You repeat this for the other blocks.

A cost (g) is also applied to each state, which cooresponds to the depth to reach this part of the path. This provides a penalty to re-visiting an already-visited state.

The final A* cost of a state is: f(n) = h(n) + g(n)

The A* algorithm then selects the next unvisited state with the lowest cost. The selected state may even be a parent state, higher up in the path. Each child state records it's parent, so that once a solution is found, you can walk backwards up the parent path to return the solution.

Compare the results of this program to online versions, using A* and manhatten distance:
https://n-puzzle-solver.appspot.com/
http://himanshug.info/8puzzle/8puzzle.html

Examples
---

```
start: [4, 7, 6, 
        3, 2, 8, 
        0, 5, 1],

end:   [1, 2, 3,
        4, 5, 6,
        7, 8, 0],
```
A solution is found in 22 steps.
LLDRDRULURDLDRULLDRUUL

```
start: [2, 1, 5, 
        4, 0, 7, 
        6, 8, 3],

end:   [1, 2, 3,
        4, 5, 6,
        7, 8, 0],
```
A solution is found in 22 steps.
LURDDLUURRDLULDRDRUULL

```
start: [6, 4, 8, 
        1, 5, 7, 
        0, 3, 2],

end:   [1, 2, 3,
        4, 5, 6,
        7, 8, 0],
```
A solution is found in 26 steps.
LDDRUULDRULLDDRUULDDRURULL

Running It
---

```
node app
```

Fun Fact
----

The number of possible eight-puzzle configurations at each step from the goal can be calculated by running a breadth-first search from the goal. Then evaluate backwards down all paths. Doing this shows all possible board configurations from the goal, as shown below.

![Screenshot 1](https://raw.githubusercontent.com/primaryobjects/eightpuzzle/master/depth/steps-from-goal.png)

License
----

MIT

Author
----
Kory Becker
http://www.primaryobjects.com/kory-becker