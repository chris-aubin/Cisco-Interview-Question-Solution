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
  return 'E2';
}

// Count how many time each parent occurs
let parentsCounts = parentsArray.reduce((prev, curr) => {
  prev[curr] = (prev[curr] || 0) + 1
  return prev
}, {})
// Check for E3 (parent with more than 2 children)
for (const count of Object.values(parentsCounts)){
  if (count > 2) {
    return 'E3';
  }
}




