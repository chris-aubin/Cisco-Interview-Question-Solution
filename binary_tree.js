let nodes = "(A,B) (A,C) (B,D) (D,C)"; 

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

// Check for E4 (more than 1 root)
let difference = new Set(parentsArray.filter(x => !childrenArray.includes(x)));
if (difference.size > 1) {
  return 'E4';
}

// Count how many time each child occurs
let childrenCounts = childrenArray.reduce((prev, curr) => {
  prev[curr] = (prev[curr] || 0) + 1
  return prev
}, {})
// Check for E5 (child with more than 1 parent)
for (const count of Object.values(childrenCounts)){
  if (count > 1) {
    return 'E5';
  }
}

