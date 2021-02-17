class RelationshipFinder {
  constructor(dbContent,startingElement, target) {
    this.dbContent = dbContent;
    this.target = target;
    this.startingElement = startingElement;
    this.result = [];
    this.shortestResult = [];
  }
  //starting location and starting row
  traverse(currentColumn, currentResult, startingElement) {
    let nextResult;
    let lastElement = currentResult[currentResult.length - 1];
    if (lastElement == this.target)
      return this.result.push(currentResult); //push results

    if (currentColumn + 1 > this.dbContent.length - 1 || currentColumn < 0)
      return null; //return nothing if reached last column and not found

      // look for target for every column after current one!
    for (let i = currentColumn + 1; i < this.dbContent.length; i++) {
     
    //if our last element is equal our next element's first row
      if (lastElement == this.dbContent[i][0] && startingElement !== this.dbContent[i][this.dbContent[0].length-1]) {
        let nextColumn = [...this.dbContent[i]]
        nextColumn.shift(); // remove first element
        nextResult = [...currentResult, ...nextColumn];
        this.traverse(i, nextResult, startingElement);
      }
    } //also look for target before current column!
    for (let i = currentColumn - 1; i > 0; i--) {
      
      if (lastElement == this.dbContent[i][0] && startingElement !== this.dbContent[i][this.dbContent[0].length-1]) {
        let nextColumn = [...this.dbContent[i]]
        nextColumn.shift(); // remove first element
        nextResult = [...currentResult, ...nextColumn];
        this.traverse(i, nextResult, startingElement);
      }
    }
  }

  shortestRelationship(){
    let allLength = this.result.map(answer => {
      return answer.length
    })
    
    var minLengthIndex = allLength.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
    this.shortestResult= [...this.result[minLengthIndex]]
    console.log('shortest result is: ',this.shortestResult)
    return this.shortestResult
  }
  
  search(){
    rel.dbContent.forEach((init, index) => {
  if (init[0] ==  this.startingElement) this.traverse(index, this.dbContent[index], this.startingElement)
})
  }
}

let relationships = [
  [1, "x", 2], 
  [2, "x", 1],
  [1, "x", 4], 
  [5, "x", 4], 
  [2, "x", 3],
  [5, 'x', 1], 
  [3, "x", 5], 
  [3, "x", 4],
  [5, "x", 8888],
];


// EXAMPLE OF USE
// let rel = new RelationshipFinder(relationships,1, 4); //Array, startingElement, target

// rel.search(); //search it
// console.log('all results', rel.result) //see all results if you want to see all results
// rel.shortestRelationship(); //Look for shortest result and log it to the console

