### Javascript Interview Questions and Answers
-------
#### Javascript
-------
##### 1. What is typeof null
```javascript
typeof null // o/p- object
typeof NaN // o/p- number
```
-------
##### 1. How to get NaN
```javascript
"a" / 2 // O/p- NaN
```
-------
##### 2. null == null
```javascript
null == null // o/p- true
null === null // o/p- true
```
- Interesting part is normally if anything have typeof "object" then you can not compair it directly
- As an example typeof [] is object or typeof {} is object if we try [] == [] or  {} == {} returns false.
- Reason is object cant compair directly as it can have diff values or type of content
- Even after that null == null returns true, the reason is, it is mistake of javascript as null have some value and javascript consider it as a object value
- so once you try to compare it then as it have value you can compare it but because of its legacy issue typeof null shows object
-------
##### 3. What is Closures
-------
##### 4. What is deepCopy and shallowCopy
-------
##### 5. Write down fibonacci series logic?
-------
##### 6. What is diff between substring, substr
-------
##### 7. How to reverse string in one line
-------
##### 8. What is Scope and what is blog scope
-------
##### 9. What is Closure
-------
##### 10. What is Callback function and anonymous function
-------
##### 11. Is let and const support hoisting? // temporal zone
-------
##### 12. What is promise?
-------
##### 13. What is destructuring?
-------
##### 14. What is micro function and macro function?
-------
##### 15. How to improve application performance?
-------
##### 16. What are generators?
- In JavaScript, generators are special functions that allow you to pause and resume execution — making them powerful for handling asynchronous tasks, lazy iteration, and complex control flows.
-------
##### 17. What are the diff between arrow function and normal function
-------
##### 18. What is prototype
-------
##### 19. What is diff between stopPropagation() and preventDefault() where to use what?
-------
##### 20. What is Symbol and why we use it?
-------
##### 21. Call(), apply() and bind()
-------
##### 22. Explain function composition and currying in JS?
-------
##### 23. Garbage collection and memory leak | how does javascript manage memory management?
-------
##### 24. What is a JavaScript engine and how does it work?
-------
##### 25. What is WeakMap and WeakSet?
-------
##### 26. Explain capturing vs bubbling phase. How do you stop propagation?
-------
##### 27. Some Practical questions
```javascript
------------------------------------------
- scenario 1:
null === null // o/p- true
------------------------------------------
- scenario 2:
[] === [] // o/p- false
------------------------------------------
- scenario 3:
{} === {} // o/p- throws error
------------------------------------------
- scenario 4:
const a = {};
const b = {};
a === b // o/p- false
------------------------------------------
- scenario 5:
true - false // O/p- 1
------------------------------------------
- scenario 6:
const a = 0;
a ?? false // O/p - 0
a || false // O/p - false
------------------------------------------
- scenario 7:
0.1 + 0.2 == 0.3 // O/p- false
// Reason: 0.1 + 0.2 = 0.30000000000000004 != 0.3
------------------------------------------
- scenario 8:
i/p - [1, [2,3], [4,5,6], 7, 8]
O/p- [1,2,3,4,5,6,7,8]
// [1, [2,3], [4,5,6], 7, 8].flat()
i/p- [1, [2,3,[4,5, [6,7],8]],9].flat()
o/p- [1, 2, 3, [4,5, [6,7],8], 9]
i/p- [1, [2,3,[4,5, [6,7],8]],9].flat().flat()
o/p- [1, 2, 3, 4,5, [6,7],8, 9]
------------------------------------------
- scenario 9:
i/p - [11, 45, 9, 1000]
O/p- [0011, 0045, 0009, 1000]
// [11, 45, 9, 1000].map((item)=> String(item).padStart(4, '0'));
------------------------------------------
- scenario 10:
i/p - [1,2,3,4,5,6]
- Process
- Duplicate each value
- check numbers greater than 7
- Sum all numbers to form single value 30
O/p- 30
// [1,2,3,4,5].map((item)=> item * 2).filter((item)=> item > 7).reduce((item, total)=> total + item, 0);
------------------------------------------
- scenario 11:
i/p - 
var a = 20;
console.log(window.a);  // 20
console.log(this.a);    // 20
------------------------------------------
- scenario 12:
i/p - 
console.log('a');
setTimeout(() => console.log('b'), 0);
Promise().resolve().then((res) => console.log('c'));
console.log('d');
------------------------------------------
- scenario 13: // Event loop
i/p -
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
------------------------------------------
```
-------
##### 3. Types of errors and details
- There are 3 types of errors
    - Syntax Error
    - Type Error
    - Refference Error
-------
##### 3. What is event loop
- Include
    - Call stack
    - micro task | job queue                        // Promise, async, await, MutationObservers, queueMicrotask(), process.nextTick() (Node.js only)
    - Macro task | task queue | callback queue (After rendering)      // setTimeout, setInterval, fetch, I/O __File read write__, UI rendering events __onclick, onscroll,etc__, postMessage(), websocket
- Priority
    - Check for call stack to complete task
    - If call stack empty then process for all microtasks
    - Then pick macro tasks
```javascript
// Code Snippet
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```
- Steps of execution
    -  "1" logged immediately (synchronous)
    -  setTimeout(...) sent to → Web API
    -  Promise.resolve() created immediately (synchronous)
    -  "4" logged immediately
    -  Web API finishes setTimeout timer → sends callback → Callback Queue
    -  Promise `.then(...)` handler → goes to Microtask Queue
    -  Event loop checks: Call Stack empty? ✅
    -  Execute all Microtasks first → logs "3"
    -  Then move to Callback Queue → logs "2"
-------
#### CSS
-------
##### 1. Flex? tell me 5 flex properties you used?
-------
##### 2. How to align div center?
- Standard way margin
    - margin: auto; left: 0; right: 0, top:0, bottom: 0; position absolute; width: needed;
    - OR
    - position: absolute; left: 50%; top: 50%; transform: tralate(-50%, -50%)
- Flex
    - display: flex; align-item: center; justify-content: center;
- display: grid
    - display: grid; place-item: center; height: 100vh;
- display: table
    - display: table; height: 100vh; width: 100% and child display: table-cell; vertical-align: middle; text-align: center;
- using calc
    - position: absolute; left: calc(50% - (sizeofdiv / 2)); top: calc(50% - (sizeofdiv / 2));
-------
##### 3. What is pseudoElement and pseudoClasses
- pseudoElement: used to style __specific parts of an element__, rather than the entire element itself.
    - before
    - after
    - first-letter
    - first-line
    - selection
- pseudoClasses: used to __select elements__ based on their state, position
    - :hover
    - :focus
    - :first-child
    - :nth-child(n)
    - :visited
-------
##### 4. What is BOX model
-------
##### 5. What’s the difference between overflow: hidden, clip-path, and mask?
-------
##### 6. Difference between visibility: hidden, display: none, and opacity: 0
-------
##### 7. em and rem
-------
##### 8. css priorities for class, element, ids, inline and important
-------
##### 9. one-dimensional vs two-dimensional layouts.
-------
##### 10. having two div elements, width 100% and inside div set padding it will goes outside of parent div. how to take care
- box-sizing: border-box
-------
##### 11. How does auto-fit differ from auto-fill in CSS Grid?
-------
##### 12. Explain how min-content, max-content, and fit-content work in Grid
-------
#### Angular
-------
##### 1. Promises vs RxJs observable
-------
##### 2. signal
-------
##### 3. reactive form vs template driven form
-------
##### 4. Sometime you update variable in angular but it didnt reflect over UI (Change detection, need to update reference __best approach is spread operator__)
-------
#### HTML
-------
- Scenario Based Question
    - Flaoat related question
    - If you have 4 div, first div float right, second float left, 3rd and 4th div dont have float property.
    - What will be output
    - [view Here](https://codepen.io/yogeshjadhav/pen/JoGpQOQ)
