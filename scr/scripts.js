var rules = document.getElementById('rules');
var rulesButton = document.getElementById('rules-button');
var numberOfHoops = document.getElementById('numberOfHoops');
var start = document.getElementById('start');
var closeRules = document.getElementById('closeRules');
var shadow = document.getElementById('shadow');
var newGame = document.getElementById('newGame');
var tower1 = document.getElementById('tower1');
var tower3 = document.getElementById('tower3');
var resetMenu = document.getElementById('resetMenu');
var rulesMenu = document.getElementById('rulesMenu');
var countIterationsEl = document.getElementById('countIterationsEl');
var timerEl = document.getElementById('timer');
var j = 7; // Max number of hoop.
var state; // State from closeRulesButton.
var number; // Number inserted hoops.
var countIterations = 0; // The number drag&drop iterations.
var dragSrcEl = null;
var timerId;
var timerSum = 0; // The passing game, in sec.
var cols = document.querySelectorAll('.hoop');
var towers = document.querySelectorAll('.tower-wrapper');

rulesButton.addEventListener('click', rulesButtonClick, false);
rulesMenu.addEventListener('click', rulesMenuClick, false);
closeRules.addEventListener('click', closeRulesClick, false);
start.addEventListener('click', startClick, false);
resetMenu.addEventListener('click', resetMenuClick, false);
    
[].forEach.call(towers, function(tower) {
    tower.addEventListener('dragenter', handleDragEnter, false);
    tower.addEventListener('dragover', handleDragOver, false);
});
        
function rulesButtonClick() {
    newGame.classList.add('hide');
    rules.classList.remove('hide');
}
function rulesMenuClick() {
    rules.classList.remove('hide');
    shadow.classList.remove('hide');
    clearInterval(timerId);
}
function closeRulesClick() {
    if (state != 1) {
        newGame.classList.remove('hide');
    } else {
        shadow.classList.add('hide');
        timer();
    }
    rules.classList.add('hide');
} 
function startClick() {
    state = 1;
    number = parseInt(numberOfHoops.value);
    if (typeof number == 'number' && number >= 3 && number <=7 ) {
        var els = document.createDocumentFragment();
        var el;
        for (i = 0; i < number; i++ ) {
            el = document.createElement('li');
            el.className = 'hoop hoop' + j;
            el.setAttribute('data-hoopID', j);
            if (i == 0) {
                el.setAttribute('draggable','true');
            }
            el.addEventListener('dragstart', handleDragStart, false);
            el.addEventListener('dragleave', handleDragLeave, false);
            el.addEventListener('drop', handleDrop, false);
            el.addEventListener('dragend', handleDragEnd, false);
            j--;
            els.appendChild(el);
        }
        j = 7;
        tower1.innerHTML = '';
        tower1.appendChild(els);
        newGame.classList.add('hide');
        shadow.classList.add('hide');
        timer();
    } else {
        alert('Enter a number from 3 to 7');
    }
}
function resetMenuClick() {
    newGame.classList.remove('hide');
    shadow.classList.remove('hide');
    clearInterval(timerId);
} 
function timer() {
    timerId = setInterval(function() {
        timerSum++;
        timerEl.innerHTML = timerSum;
    }, 1000);
}

function handleDragStart(e) {
    // this / e.target is the source node.
    this.style.opacity = '0.5'; 
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    if(navigator.appName.indexOf("Internet Explorer") == -1) { // If not IE.
        e.dataTransfer.setData('text/html', this.innerHTML);
    };
    var nextEl = this.nextElementSibling;
    if (nextEl) {
        nextEl.setAttribute('draggable','true');
    };
    var li = this.parentNode.children[1];
    this.parentNode.setAttribute('data-topHoopID', li ? li.getAttribute('data-hoopID') : '0');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    };
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    var ul = this.children[0];
    var li = ul.firstChild;
    if (ul.getAttribute('data-topHoopID') <= dragSrcEl.getAttribute('data-hoopID')) {
        ul.insertBefore(dragSrcEl, li);
    } else {
        return false;
    };
}

function handleDragLeave(e) {
    // this / e.target is previous target element.
}

function handleDrop(e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    };
    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    };
    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    this.style.opacity = '1';
    var nextEl = this.nextElementSibling;
    if (nextEl) {
        nextEl.removeAttribute('draggable');
    };
    this.parentNode.setAttribute('data-topHoopID', dragSrcEl.getAttribute('data-hoopID'));
    countIterations++;
    countIterationsEl.innerHTML = countIterations;
    if (tower3.children.length == number) {
        clearInterval(timerId);
        alert('Congratulations! \nYou have completed the puzzle.');
    };
}























