let nodes = "(A,B) (B,C) (A,B) (A,C)"; 

let pairsStrings = nodes.split(' ');
// Split into array of pairs, in which each pair is an array
let pairsArrays = pairsStrings.map(i => i.replace(/\(|\)/g, '').split(','));
// Create array of only parent nodes
let parentsArray = pairsArrays.map(i => i[0]);
// Create array of only child nodes
let childrenArray = pairsArrays.map(i => i[1]);

// Check for E2 (duplicate (Parent, Child) pairs)
let setPairsStrings = new Set(pairsStrings);
if (setPairsStrings.size !== pairsStrings.length) {
  return 'E2'
}
