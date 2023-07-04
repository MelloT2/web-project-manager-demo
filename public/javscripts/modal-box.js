// task-form
const task_box = document.querySelector(".task-form-box");
const new_task_btn = document.querySelector(".new-task");
const task_form = document.querySelector(".task-form");

// invite-form
const invite_box = document.querySelector(".invite-form-box");
const invite_btn = document.querySelector(".invite-to-project");
const invite_form = document.querySelector(".invite-form"); 

// teammate-box
const teammate_box = document.querySelector(".teammate-box");
const teammate_modal = document.querySelector(".teammate-container");
const teammate_btn = document.querySelector(".teammate-menu");


// on off task form
        // off task form
        task_box.addEventListener("click", (e) => {
            console.log(e.target);
            if(e.target == task_box) {
                task_box.style.display = "none";
            }
        });

        // on task form
        new_task_btn.addEventListener("click", () => {
            task_box.style.display = "block";
        });

// on off invite form
        // off invite form
        invite_box.addEventListener("click", (e) => {
            console.log(e.target);
            if(e.target == invite_box) {
                invite_box.style.display = "none";
            }
        });

        // on invite form
        invite_btn.addEventListener("click", () => {
            invite_box.style.display = "block";
        });

// on off teammate madol
        // off teammate modal
        teammate_box.addEventListener("click", (e) => {
            console.log(e);
            if(e.target == teammate_box) {
                teammate_box.style.display = "none";
            }
        });

        // on teammate modal
        teammate_btn.addEventListener("click", () => {
            teammate_box.style.display = "block";
        });

    