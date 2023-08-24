"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
let addnewItemBtn = document.querySelector(".add-new-item-btn");
let newContainer;
let currentContainer;
let currentFormDiv;
let ulListItems;
let currentInput;
let currentForm;
let allListItemsBtns;
let addnewItemBtnALL;
function addListenerstContainer() {
    let allContainer = document.querySelectorAll(".global-container");
    allContainer.forEach(container => {
        removeContainer(container);
    });
}
function removeContainer(el) {
    //remove container succeeded
    const allbtn = el.querySelectorAll(".remove-container-btn");
    allbtn.forEach(btn => { removeContainerListeners(btn); });
    //preventDefalut on all form
    const allform = el.querySelectorAll("form");
    allform.forEach(form => { form.addEventListener("submit", (e) => { e.preventDefault(); }); });
    //toggle form with the add new Item btn
    addnewItemBtnALL = el.querySelectorAll(".remove-create-item-btn");
    addnewItemBtnALL.forEach(btn => activeBtn(btn));
}
function createNewContainer() {
    //ajout d'un nouveau container d'items
    let btn_create_container = document.querySelector(".add-container-btn");
    btn_create_container.addEventListener("click", () => {
        let btnParent = btn_create_container === null || btn_create_container === void 0 ? void 0 : btn_create_container.parentElement;
        let btnPParent = btnParent === null || btnParent === void 0 ? void 0 : btnParent.parentElement;
        btnParent.classList.add('active');
        // console.log(btnPParent)
        let formDiv = btnPParent === null || btnPParent === void 0 ? void 0 : btnPParent.querySelector(".global-container-form");
        formDiv.classList.remove('active');
        let form = formDiv === null || formDiv === void 0 ? void 0 : formDiv.querySelector(".form-container-creation");
        form.addEventListener("submit", (e) => { e.preventDefault(); });
        // ajout du clone d'un div container à notre nouvelle div container
        let formDivSubmitBtn = formDiv === null || formDiv === void 0 ? void 0 : formDiv.querySelector(".submit-creation-container");
        formDivSubmitBtn.addEventListener("click", () => {
            var _a;
            let inputTitle = formDiv === null || formDiv === void 0 ? void 0 : formDiv.querySelector(".input-title-container");
            if (inputTitle.value !== "") {
                const globalContainer = document.querySelector(".global-container");
                // newContainer = globalContainer?.cloneNode() as HTMLDivElement;
                newContainer = document.createElement("div");
                newContainer.classList.add("global-container");
                newContainer.setAttribute("draggable", "true");
                const newContainerContent = `<div class="item-container">
            <div class="item-title-container">
                <h2>${inputTitle.value}</h2>
                <button class="remove-container-btn">X</button>
            </div>
            <ul class="item-list"></ul>
        </div>
        <div class="form-container">
            <div class="create-item-form   ">
                <button class="remove-create-item-btn">Add a new Item</button>
            </div>
            <div class="item-form-container   active">
                <form class="form-create-item">
                    <input type="text" name="item-name" id="item-name" placeholder="Item name" class="input-create-item">
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>`;
                newContainer.innerHTML = newContainerContent;
                (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.insertBefore(newContainer, document.querySelector(".global-create-btn-container"));
                removeContainer(newContainer);
                inputTitle.value = "";
            }
        });
    });
}
function activeBtn(btn) {
    btn.addEventListener("click", () => {
        var _a, _b, _c, _d;
        addnewItemBtnALL.forEach(theBtn => {
            var _a, _b, _c;
            (_a = theBtn === null || theBtn === void 0 ? void 0 : theBtn.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            let f = (_c = (_b = theBtn === null || theBtn === void 0 ? void 0 : theBtn.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('.item-form-container');
            f.classList.add('active');
        });
        (_a = btn === null || btn === void 0 ? void 0 : btn.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        let btnContainer = (_b = btn === null || btn === void 0 ? void 0 : btn.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        let formDiv = btnContainer === null || btnContainer === void 0 ? void 0 : btnContainer.querySelector('.item-form-container');
        currentFormDiv = formDiv;
        currentFormDiv.classList.remove('active');
        // Selection of all current container...
        currentContainer = (_d = (_c = btn === null || btn === void 0 ? void 0 : btn.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement;
        ulListItems = currentContainer.querySelector(".item-list");
        // console.log(ulListItems);
        currentInput = currentFormDiv === null || currentFormDiv === void 0 ? void 0 : currentFormDiv.querySelector(".input-create-item");
        currentForm = currentFormDiv === null || currentFormDiv === void 0 ? void 0 : currentFormDiv.querySelector(".form-create-item");
        currentForm.addEventListener("submit", addNewItem);
        addDDListeners(currentContainer);
    });
}
function addNewItem(e) {
    e.preventDefault();
    if (currentInput.value !== "") {
        const li = `
        <li draggable="true">
        
    <span>${currentInput === null || currentInput === void 0 ? void 0 : currentInput.value}</span>
    <button class="remove-item-from-list-btn">X</button>
    </li>`;
        ulListItems === null || ulListItems === void 0 ? void 0 : ulListItems.insertAdjacentHTML("beforeend", li);
        currentInput.value = "";
        let theNewLi = ulListItems === null || ulListItems === void 0 ? void 0 : ulListItems.lastElementChild;
        addDDListeners(theNewLi);
        if (theNewLi) {
            handleLiDeletion(theNewLi);
        }
    }
}
function removeContainerListeners(btn) {
    var _a, _b;
    let btnContainer = (_b = (_a = btn === null || btn === void 0 ? void 0 : btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    btn.addEventListener("click", () => { btnContainer === null || btnContainer === void 0 ? void 0 : btnContainer.remove(); });
}
function handleLiDeletion(li) {
    const btn = li === null || li === void 0 ? void 0 : li.querySelector('.remove-item-from-list-btn');
    btn.addEventListener("click", () => { li.remove(); });
}
function addDDListeners(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragend', handleDragEnd);
}
//drap and drop
let dragSrcEl;
function handleDragStart(e) {
    var _a;
    e.stopPropagation();
    dragSrcEl = this;
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
    e.preventDefault();
    // this.classList.add('over');
    // e.dataTransfer?.dropEffect = 'move';
}
function handleDrop(e) {
    var _a, _b;
    e.stopPropagation();
    const receptionEl = this;
    if (dragSrcEl.nodeName === 'LI' && receptionEl.classList.contains("global-container")) {
        (_a = receptionEl.querySelector(".item-list")) === null || _a === void 0 ? void 0 : _a.appendChild(dragSrcEl);
        addDDListeners(dragSrcEl);
        handleLiDeletion(dragSrcEl);
    }
    if (dragSrcEl !== this && this.classList[0] === dragSrcEl.classList[0]) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.getData('text/html');
        // if (this.classList.contains("item-list"))
        // {
        //         this.querySelectorAll('li').forEach((li:HTMLLIElement) => 
        //     {
        //     handleLiDeletion(li);
        //     addDDListeners(li);
        // })
        // }
        // else
        // {
        //     addDDListeners(this);
        //     handleLiDeletion(this as HTMLLIElement);
        // }
        this.querySelectorAll('li').forEach((li) => {
            handleLiDeletion(li);
            addDDListeners(li);
        });
    }
}
function handleDragEnd(e) {
    e.stopPropagation();
    // if (this.classList.contains("item-list"))
    // {
    //     this.querySelectorAll('li').forEach((li:HTMLLIElement) => 
    //         {
    //         handleLiDeletion(li);
    //         addDDListeners(li);
    //     })
    // }
    // else
    // {
    //     addDDListeners(this);
    //     handleLiDeletion(this as HTMLLIElement);
    // }
    this.querySelectorAll('li').forEach((li) => {
        handleLiDeletion(li);
        addDDListeners(li);
    });
}
addListenerstContainer();
createNewContainer();
