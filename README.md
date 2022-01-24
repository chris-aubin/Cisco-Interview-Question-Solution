# Cisco Interview Question Solution

Given a binary tree reprsented in a string as a sequence of parent-child pairs in no particular order, i.e.:

> (A,B) (B,D) (D,E) (A,C) (C,F) (E,G) 

Where the first letter inside each parentheses represents a parent node and the second represents its child, print out the binary tree in lexicographical (alphabetical) order. For the above input, the output should look like

> (A(B(D(E(G))))(C(F)))

Detect the following errors, and if any are found, output them in priority order (error number smallest to largest).

#### Errors:
* E1 - Invalid input format (missing symbols, more than one blank space as pair separators)
* E2 - Duplicate (Parent, Child) pairs
* E3 - Invalid binary tree (parent has more than 2 children)
* E4 - Input contains a forest (multiple root nodes)
* E5 - Input contain cycles within the tree (ex: child's child = parent)

##### Example #1:
> (A,B) (B,D) (D,E) (A,C) (C,F) (E,G) -> (A(B(D(E(G))))(C(F)))

##### Example #2
> (A,B) (A,C)  (B,E) (B,F) -> E1

##### Example #3
> (A,B) (B,C) (A,B) (A,C) -> E2

##### Example #4
> (A,B) (A,C) (A,D) (B,E) -> E3

##### Example #5
> (A,B) (A,C) (B,D) (E,F) (F,G) (F,H) -> E4

##### Example #6
> (A,B) (A,C) (B,D) (D,C) -> E5

Similar problem: https://www.chegg.com/homework-help/questions-and-answers/3-tree-binary-tree-represented-sequence-parent-child-pairs-example-b-c-b-g-c-h-e-f-b-d-c-e-q42330174
