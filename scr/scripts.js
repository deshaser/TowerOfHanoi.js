var dragSrcEl = null;
var cols = document.querySelectorAll('.hoop');
var towers = document.querySelectorAll('.tower-wrapper');

cols[0].setAttribute('draggable','true');
[].forEach.call(cols, function(col, index) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});
[].forEach.call(towers, function(tower) {
    tower.addEventListener('dragenter', handleDragEnter, false);
    tower.addEventListener('dragover', handleDragOver, false);
});

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
    this.parentNode.setAttribute('topHoopID', li ? li.getAttribute('hoopID') : '0');
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
    if (ul.getAttribute('topHoopID') <= dragSrcEl.getAttribute('hoopID')) {
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
    this.parentNode.setAttribute('topHoopID', dragSrcEl.getAttribute('hoopID'));
}







