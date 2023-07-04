// sidebar task
let openSidebarEl = document.querySelectorAll(".chat-icon");
const sidebarEl = document.getElementById("sidebar");
const closeSidebarBtn = document.querySelector(".close-task-sidebar");

// tab-content
const buttonsContainer = document.querySelector(".tab-container");

const tabButtons = document.querySelectorAll(".task-tab-button");

const tabContents = document.querySelectorAll(".tab-content");

//open sidebar task
openSidebarEl.forEach(comment => {
    comment.addEventListener("click", () => {
        sidebarEl.style.transform = "translate(0px)";
    });
});

//close sidebar task
closeSidebarBtn.addEventListener("click", () => {
    sidebarEl.style.transform = "translate(455px)";
});


// tab-content
buttonsContainer.addEventListener("click", (event) => {
    
    console.log(event.target);
    console.log(event.type);
    console.log(event.currentTarget);
    console.log(event.target.tagName);

    // if(event.target.tagname !== "BUTTON") {
    //     return;
    // }

    // if(!event.target.classList.contains("task-tab-button")) {
    //     return;
    // }

    tabButtons.forEach(button => {
        if (event.target.tagname !== "BUTTON") {

            button.classList.remove("active-button");
        }
    });

    event.target.classList.add("active-button");

    
    tabContents.forEach(tabContent => {
        if(tabContent.classList.contains("active-tab-content")) {
            tabContent.classList.remove("active-tab-content");
        }
    });


    console.log(event.target.dataset.id);

    tabContents.forEach(tabContent => {
        if(tabContent.id == event.target.dataset.id) {
            tabContent.classList.add("active-tab-content");
        } 
    });
});



