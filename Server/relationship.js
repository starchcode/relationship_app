class RelationshipFinder {
  constructor(maze, target) {
    this.maze = maze;
    this.target = target;
    this.result = [];
    this.shortestResult = [];
  }
  traverse(currentColumn, currentResult) {
    let nextResult;

    if (currentResult[currentResult.length - 1] == this.target)
      return this.result.push(currentResult); //push results

    if (currentColumn + 1 > this.maze.length - 1 || currentColumn < 0)
      return null; //return nothing if not found

      // look for target for every column after current one!
    for (let i = currentColumn + 1; i < this.maze.length; i++) {
    //if our last element is equal our next element's first row
      if (currentResult[currentResult.length - 1] == this.maze[i][0]) {
        nextResult = [...currentResult, ...this.maze[i]];
        this.traverse(i, nextResult);
      }
    } //also look for target before current column!
    for (let i = currentColumn - 1; i > 0; i--) {
      if (currentResult[currentResult.length - 1] == this.maze[i][0]) {
        nextResult = [...currentResult, ...this.maze[i]];
        this.traverse(i, nextResult);
      }
    }
  }
}

let relationships = [
  [1, "x", 2], // 0
  [1, "x", 4], // 1
  [5, "x", 4], // 2
  [2, "x", 3], //3
  [3, "x", 5], //4
  [3, "x", 4], //5
  [5, "x", 8888], //6
];

let rel = new RelationshipFinder(relationships, 4);
rel.traverse(0, rel.maze[0]);
console.log(rel.result);
