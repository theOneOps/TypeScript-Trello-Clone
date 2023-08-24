// import e from "cors";

// let addnewItemBtn = document.querySelector(".add-new-item-btn") as HTMLButtonElement;

let newContainer : HTMLDivElement;
let currentContainer:HTMLDivElement;
let currentFormDiv:HTMLDivElement;
let ulListItems:HTMLUListElement;
let currentInput:HTMLInputElement;
let currentForm:HTMLFormElement;

let addnewItemBtnALL:NodeListOf<HTMLButtonElement>; 
function addListenerstContainer()
{
    let allContainer = document.querySelectorAll(".global-container") as NodeListOf<HTMLDivElement>;
    allContainer.forEach(container=> {
        removeContainer(container)
    })
}


function removeContainer(el:HTMLDivElement)
{
    //remove container succeeded
    const allbtn = el.querySelectorAll(".remove-container-btn") as NodeListOf<HTMLButtonElement>;
    allbtn.forEach(btn => {removeContainerListeners(btn)});

    //preventDefalut on all form
    const allform = el.querySelectorAll("form") as NodeListOf<HTMLFormElement>;
    allform.forEach(form => {form.addEventListener("submit", (e) => {e.preventDefault()})});
    //toggle form with the add new Item btn
    addnewItemBtnALL = el.querySelectorAll(".remove-create-item-btn") as NodeListOf<HTMLButtonElement>;

    addnewItemBtnALL.forEach(btn=>activeBtn(btn));
}

function createNewContainer()
{
    //ajout d'un nouveau container d'items
    let btn_create_container = document.querySelector(".add-container-btn") as HTMLButtonElement;

    btn_create_container.addEventListener("click", () => 
    {  
        let btnParent = btn_create_container?.parentElement as HTMLDivElement;
        let btnPParent = btnParent?.parentElement as HTMLDivElement;

        btnParent.classList.add('active');
        // console.log(btnPParent)

        let formDiv = btnPParent?.querySelector(".global-container-form") as HTMLDivElement;
        formDiv.classList.remove('active');

        let form = formDiv?.querySelector(".form-container-creation") as HTMLFormElement;

        form.addEventListener("submit", (e) => {e.preventDefault()});

        // ajout du clone d'un div container à notre nouvelle div container
        let formDivSubmitBtn = formDiv?.querySelector(".submit-creation-container") as HTMLButtonElement;


        formDivSubmitBtn.addEventListener("click", () => {
            let inputTitle = formDiv?.querySelector(".input-title-container") as HTMLInputElement;
        if (inputTitle.value !== "")
        {
            const globalContainer = document.querySelector(".global-container") as HTMLDivElement;
            // newContainer = globalContainer?.cloneNode() as HTMLDivElement;
            newContainer = document.createElement("div");
            newContainer.classList.add("global-container");
            newContainer.setAttribute("draggable", "true");

            const newContainerContent=
            `<div class="item-container">
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
        </div>`
        newContainer.innerHTML = newContainerContent;
        document.querySelector(".container")?.insertBefore(newContainer,document.querySelector(".global-create-btn-container"));
        removeContainer(newContainer);
        
        inputTitle.value = "";
    }}); 
});
}


function activeBtn(btn: HTMLButtonElement)
{
    btn.addEventListener("click", () => {
        addnewItemBtnALL.forEach(theBtn=>{
            theBtn?.parentElement?.classList.remove('active');
            let f = theBtn?.parentElement?.parentElement?.querySelector('.item-form-container') as HTMLDivElement;
            f.classList.add('active');
        })

        btn?.parentElement?.classList.add('active');
        let btnContainer = btn?.parentElement?.parentElement;

        let formDiv = btnContainer?.querySelector('.item-form-container') as HTMLDivElement;
        currentFormDiv = formDiv;
        currentFormDiv.classList.remove('active');
        
        // Selection of all current container...
        currentContainer = btn?.parentElement?.parentElement?.parentElement as HTMLDivElement; 
        ulListItems = currentContainer.querySelector(".item-list") as HTMLUListElement;

        // console.log(ulListItems);
        currentInput = currentFormDiv?.querySelector(".input-create-item") as HTMLInputElement;
        currentForm = currentFormDiv?.querySelector(".form-create-item") as HTMLFormElement;
        currentForm.addEventListener("submit", addNewItem);
        addDDListeners(currentContainer);
    });
}

function addNewItem(e:Event)
{
    e.preventDefault();
    if (currentInput.value !== "")
    {
        const li=`
        <li draggable="true">
        
    <span>${currentInput?.value}</span>
    <button class="remove-item-from-list-btn">X</button>
    </li>`;
    ulListItems?.insertAdjacentHTML("beforeend", li);
    currentInput.value = "";
    
    let theNewLi = ulListItems?.lastElementChild as HTMLLIElement;
    addDDListeners(theNewLi)
    if (theNewLi)
    {
        handleLiDeletion(theNewLi);
    }
}
}

function removeContainerListeners(btn: HTMLButtonElement)
{
    let btnContainer = btn?.parentElement?.parentElement?.parentElement;
    btn.addEventListener("click", () => {btnContainer?.remove()});
}

function handleLiDeletion(li: HTMLLIElement)
{
    const btn = li?.querySelector('.remove-item-from-list-btn') as HTMLButtonElement;
    btn.addEventListener("click", () => {li.remove()});
}

function addDDListeners(element: HTMLElement)
{
    element.addEventListener('dragstart',handleDragStart);
    element.addEventListener('dragover',handleDragOver);
    element.addEventListener('drop',handleDrop);
    element.addEventListener('dragend',handleDragEnd);
}

//drap and drop

let dragSrcEl:HTMLElement;
function handleDragStart(this:HTMLElement, e:DragEvent)
{
    e.stopPropagation();
    dragSrcEl = this;
    e.dataTransfer?.setData('text/html',this.innerHTML);
}

function handleDragOver(this:HTMLElement, e:DragEvent)
{
    e.preventDefault();
    // this.classList.add('over');
    // e.dataTransfer?.dropEffect = 'move';
}

function handleDrop(this:HTMLElement, e:DragEvent)
{
    e.stopPropagation();
    const receptionEl = this;

    if (dragSrcEl.nodeName === 'LI' && receptionEl.classList.contains("global-container"))
    {
        receptionEl.querySelector(".item-list")?.appendChild(dragSrcEl);
        addDDListeners(dragSrcEl);
        handleLiDeletion(dragSrcEl as HTMLLIElement);
    }

    if (dragSrcEl !== this && this.classList[0] === dragSrcEl.classList[0])
    {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer?.getData('text/html') as string;
        if (this.classList.contains("item-list"))
        {
            this.querySelectorAll('li').forEach((li:HTMLLIElement) => 
        {
        handleLiDeletion(li);
        addDDListeners(li);
    })
        }
        else
        {
            addDDListeners(this);
            handleLiDeletion(this as HTMLLIElement);
        }
        // this.querySelectorAll('li').forEach((li:HTMLLIElement) => 
        // {
        // handleLiDeletion(li);
        // addDDListeners(li);
}
}

function handleDragEnd(this:HTMLElement, e:DragEvent)
{
    e.stopPropagation();
    if (this.classList.contains("item-list"))
    {
        this.querySelectorAll('li').forEach((li:HTMLLIElement) => 
            {
            handleLiDeletion(li);
            addDDListeners(li);
        })
    }
    else
    {
        addDDListeners(this);
        handleLiDeletion(this as HTMLLIElement);
    }
    // this.querySelectorAll('li').forEach((li:HTMLLIElement) => 
    //         {
    //         handleLiDeletion(li);
    //         addDDListeners(li);
    //     })
}

addListenerstContainer()
createNewContainer()