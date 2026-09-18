const title = document.getElementById('title');
const input = document.getElementById('movieInput');
const addButton = document.getElementById('addBtn');
const movieList = document.getElementById('movieList');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const emptyMessage = document.getElementById("emptyMessage");
const filters = document.querySelectorAll(".filter");



let currentFilter = 'all';
let taskCount = 0;
let completeCount = 0;
let activeCountValue = 0;


addButton.addEventListener('click', () => {
    const movieName = input.value.trim();
    if(movieName === "") {
        return;
    }
    const li = document.createElement('li');
    li.classList.add("movie-item");

    const span = document.createElement('span');
    span.classList.add("movie-text");
    span.textContent = movieName;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    li.append(span, deleteBtn);
    movieList.append(li);

    resetFilter();
   

    li.addEventListener("click", () => {
        const isCompleted = li.classList.contains("done");

        li.classList.toggle("done");

        if(isCompleted) {
            activeCountValue++;
            completeCount--;
        } else {
            completeCount++;
            activeCountValue--;
        }
        activeCount.textContent = activeCountValue;
        completedCount.textContent = completeCount;
        updateFilter();
    })

    

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
      
        const isDone = li.classList.contains("done");
        li.remove();
        taskCount--;
        if (isDone) {
            completeCount--;
        } else {
            activeCountValue--;
        }
        totalCount.textContent = taskCount;
        activeCount.textContent = activeCountValue;
        completedCount.textContent = completeCount;
        
        if(taskCount === 0) {
            emptyMessage.style.display = "block";
        } 
        updateFilter();
        resetFilter();
    })

   
    emptyMessage.style.display = "none";
    activeCountValue++;
    activeCount.textContent = activeCountValue;
    taskCount++;
    totalCount.textContent = taskCount;
    input.value ="";
});

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addButton.click();
    }
})

filters.forEach ((filterli) => {
    filterli.addEventListener("click", () => {
        currentFilter = filterli.dataset.filter;
        filters.forEach((button) => {
            button.classList.remove("active");
        })
        filterli.classList.add("active");
        updateFilter();
        console.log(filterli.dataset.filter); 
    })
})



function updateFilter() {
    const movies = document.querySelectorAll(".movie-item");
    
    movies.forEach((movie) => {
        const isDone  = movie.classList.contains("done");
        if(currentFilter === "all") {
            movie.style.display = "flex";
        } else if(currentFilter ==="completed") {
            movie.style.display = isDone? "flex": "none";
        } else if(currentFilter === "active") {
            movie.style.display = isDone? "none": "flex";
        }

    })
}

function resetFilter() {
    if(currentFilter === "active" || currentFilter === "completed") {
        currentFilter = "all";
        filters.forEach((filter) => {
            filter.classList.remove("active");
        })
        document.querySelector('[data-filter = "all"]').classList.add("active");
        updateFilter();
    }
}

