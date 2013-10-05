var dragSrcEl = null;
var cols = document.querySelectorAll('.hoop');
var towers = document.querySelectorAll('.tower-wrapper');

[].forEach.call(cols, function(col) {
    col.setAttribute('draggable','true')
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});
[].forEach.call(towers, function(tower) {
    tower.addEventListener('dragenter', handleDragEnter, false)
    tower.addEventListener('dragover', handleDragOver, false);
});

function handleDragStart(e) {
    // this / e.target is the source node.
    this.style.opacity = '0.5'; 
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.children[0].insertBefore(dragSrcEl, this.children[0].firstChild);
}

function handleDragLeave(e) {
    // this / e.target is previous target element.
    /*this.classList.remove('over');*/  
}

function handleDrop(e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }
    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    /*[].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });*/
    this.style.opacity = '1';
}









