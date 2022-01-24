function SExpression(nodes) {
    
    // Check for E1 (invalid input format (missing symbols, more than one 
    // blank space as pair separators))
    
    // Check for double space
    if (nodes.indexOf('  ') !== -1) {
        return 'E1';
    }
    let open = false;
    
    // Check parenthesis
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === '(') {
            if (open === true) {
                return 'E1';
            }
            open = true;
        }
        if (nodes[i] === ')') {
            if (open === false) {
                return 'E1';
            }
            open = false;
        }
    }
    
    // Split input into an array of strings, in which each string is of the form 
    // (parent, child) i.e. (A,B) 
    let pairsStrings = nodes.split(' ');
    
    // Split into array of pairs, in which each pair is an array of the form
    // [parent, child] i.e. [A,B]
    let pairsArrays = pairsStrings.map(i => i.replace(/\(|\)/g, '').split(','));
    
    // Create array of only parent nodes
    let parentsArray = pairsArrays.map(i => i[0]);
    
    // Create array of only child nodes
    let childrenArray = pairsArrays.map(i => i[1]);
    
    // Initialise root variable
    let root;
    
    // Initialise object to represent tree in which the key is a char that  
    // represents parent and the value is an array of that parent's children, 
    // i.e. {A: [B,C]}
    let tree = {};
    
    // Populate tree object
    for (const pair of pairsArrays) {
        if (tree[pair[0]]) {
            // Check for E2 (duplicate (Parent, Child) pairs)
            if (tree[pair[0]].includes(pair[1])) {
                return 'E2';
            }
            // Check for E3 (parent with more than 2 children)
            if (tree[pair[0]].length > 1) {
                return 'E3'
            }
            tree[pair[0]].push(pair[1]);
        }
        else {
            tree[pair[0]] = [pair[1]];
        }
    }

    // Check for E4 (more than 1 root)
    let difference = new Set(parentsArray.filter(x => !childrenArray.includes(x)));
    if (difference.size > 1) {
        return 'E4';
    }
    root = difference.values().next().value;

    // Count how many time each child occurs
    let childrenCounts = childrenArray.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1
        return prev
    }, {})
    // Check for E5 (child with more than 1 parent)
    for (const count of Object.values(childrenCounts)) {
        if (count > 1) {
            return 'E5';
        }
    }
    
    function SExpressionHelper(root, tree) {
        if (tree[root]) {
            if (tree[root][1]) {
                return root + '(' + SExpressionHelper(tree[root][0], tree) + ')' + '(' + SExpressionHelper(tree[root][1], tree) + ')';
            }
            else {
                return root + '(' + SExpressionHelper(tree[root][0], tree) + ')';
            }
        }
        else {
            return root;    
        }
    }
    
    return '(' + SExpressionHelper(root, tree) + ')';
    
}
