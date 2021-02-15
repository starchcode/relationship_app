class RelationshipFinder {
  constructor(dbContent, target) {
    this.dbContent = dbContent;
    this.target = target;
    this.result = [];
    this.shortestResult = [];
  }
  //starting location and starting row
  traverse(currentColumn, currentResult) {
    let nextResult;
    let lastElement = currentResult[currentResult.length - 1];
    if (lastElement == this.target)
      return this.result.push(currentResult); //push results

    if (currentColumn + 1 > this.dbContent.length - 1 || currentColumn < 0)
      return null; //return nothing if reached last column and not found

      // look for target for every column after current one!
    for (let i = currentColumn + 1; i < this.dbContent.length; i++) {
    //if our last element is equal our next element's first row
      if (lastElement == this.dbContent[i][0]) {
        let nextColumn = [...this.dbContent[i]]
        nextColumn.shift(); // remove first element
        nextResult = [...currentResult, ...nextColumn];
        this.traverse(i, nextResult);
      }
    } //also look for target before current column!
    for (let i = currentColumn - 1; i > 0; i--) {
      if (lastElement == this.dbContent[i][0]) {
        let nextColumn = [...this.dbContent[i]]
        nextColumn.shift(); // remove first element
        nextResult = [...currentResult, ...nextColumn];
        this.traverse(i, nextResult);
      }
    }
  }

  shortestRelationship(){
    let allLength = this.result.map(answer => {
      return answer.length
    })
    
    var minLengthIndex = allLength.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
    console.log(this.result[minLengthIndex])
  }
}
export default RelationshipFinder;

//example of use:

// let relationships = [
//   [1, "x", 2], // 0
//   [1, "x", 4], // 1
//   [5, "x", 4], // 2
//   [2, "x", 3], //3
//   [3, "x", 5], //4
//   [3, "x", 4], //5
//   [5, "x", 8888], //6
// ];

// let rel = new RelationshipFinder(relationships, 4);
// rel.traverse(0, rel.dbContent[0]); //
// rel.shortestRelationship();
