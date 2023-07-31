const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAll = document.querySelector(".footer button");
const showData = document.querySelector(".footer .show-data");



inputBox.onkeyup = () =>{
    
    let userData = inputBox.value;
    
    if(userData.trim() != null){
        
        addBtn.classList.add("active");
    } else {
            addBtn.classList.remove("active");
    }
}

    
    addBtn.onclick = () =>{
        let userData = inputBox.value
       
        let getLocalStorage = localStorage.getItem("New Task");
       
        if(getLocalStorage == null){
           
            listArr = [];
        } else{
            
            listArr = JSON.parse(getLocalStorage);
        }
        
         addBtn.classList.remove("active");
        listArr.push(userData);
        localStorage.setItem("New Task", JSON.stringify(listArr));

        showtask();
    }

    function showtask() {
        //getting localstorage data
        let newTask = localStorage.getItem("New Task");
        if(newTask == null){
            listArr = [];
        } else{
            listArr = JSON.parse(newTask);
        }

        const pendingNumb = document.querySelector(".pendingTask");
        pendingNumb.textContent = listArr.length;

        if(listArr.length > 0){
            clearAll.classList.add("active");
        }else{
            clearAll.classList.remove("active");
        }

        let htmlTag = '';
        listArr.forEach((value, index) =>{
            htmlTag += `<li>${value}<span onclick="todoDelete(${index})";><i class="bx bx-trash"></i></span></li>`
        })
        
        todoList.innerHTML = htmlTag;
        inputBox.value = "";
    }
    
    
    function todoDelete(index){
        let getLocalStorage = localStorage.getItem("New Task");
        listArr = JSON.parse(getLocalStorage);
        // delete or remove the particular list
        listArr.splice(index, 1);
        // after remove the list again updated
        localStorage.setItem("New Task", JSON.stringify(listArr));
        showtask();
    }

    
    clearAll.onclick = () => {
        // empty array created
        listArr = [];
        // after remove the list again updated
        localStorage.setItem("New Task", JSON.stringify(listArr));
        showtask();
    }


 window.onload = () =>{
    showtask();
 }
