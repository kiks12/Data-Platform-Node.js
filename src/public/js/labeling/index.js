
const activeImageElement = document.getElementById("activeImage")
const activeImageId = document.getElementById("activeImageId")
const activeImageName = document.getElementById("activeImageName")
const activeImagePath = document.getElementById("activeImagePath")
const pendingsContainer = document.getElementById("pendings")
const pendingCount = document.getElementById("pendingCount")
const submitBtn = document.getElementById("submitButton")
const activeTaskId = document.getElementById("taskId")
const activeTaskTitle = document.getElementById("title")
const activeTaskDescription = document.getElementById("description")
const activeTaskLabels = document.getElementById("labels")
const activeTaskStatus = document.getElementById("status")
const imagePagination = document.getElementById("imagePagination")
const labelsContainer = document.getElementById("labelsContainer")


let active = {}
let activeImage = {}
let tasks = []

const nodes = new Nodes()
const pagination = new Pagination()
const validator = new Validator()


// BUTTON CLICK EVENT LISTENERS
const submitLabels = async () => {
  const updatedImages = active.Images
  if (validator.nullCheckImages(updatedImages)) return alert("Make sure images labels are not null")
  const images = await putImageLabelsAPI(updatedImages)
  const activeTask = await putLabelingTaskAsDoneAPI(active.labelingTaskId)
  if (images && activeTask) {
    pagination.currentPage = 0
    alert("Data submitted successfully")
    setup()
  }
}
// BUTTON CLICK EVENT LISTENERS



// HTTP FETCHING TASKS FUNCTIONS
const fetchTasks = async () => {
  try {
    const res = await fetch("http://localhost:3000/labeling/api/read")
    const json = await res.json()
    if (json.length !== 0) active = json[0]
    return Promise.resolve(json)
  } catch (err) {
    console.error(err)
    return Promise.resolve([])
  }
}

const putImageLabelsAPI = async (updatedImages) => {
  try {
    const res = await fetch("http://localhost:3000/labeling/api/images", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedImages)
    });
    const json = await res.json()
    return json ? Promise.resolve(true) : Promise.resolve(false)
  } catch (err) {
    console.error(err)
    return Promise.resolve(false)
  }
}

const putLabelingTaskAsDoneAPI = async (labelingTaskId) => {
  try {
    const res = await fetch(`http://localhost:3000/labeling/api/${labelingTaskId}/done`, {
      method: "PUT"
    })
    const json = await res.json()
    return json ? Promise.resolve(true) : Promise.resolve(false)
  } catch (err) {
    console.error(err)
    return Promise.resolve(false)
  }

}
// HTTP FETCHING TASKS FUNCTIONS



// DOM ELEMENTS STYLING
const setStyleOfPendingTaskCard = (task, div, name, description) => {
  div.classList.add("card", "my-2", "p-3", "px-4", "shadow-sm")
  div.classList.add(task.labelingTaskId === active.labelingTaskId ? "bg-primary" : "-")
  div.classList.add(task.labelingTaskId === active.labelingTaskId ? "text-light" : "-")
  div.style.cursor = "pointer"
}
// DOM ELEMENTS STYLING



// DOM MANIPULATION FUNCTIONS
const setTasksOnDOM = async () => {
  pendingCount.textContent = `(${tasks.length})`
  tasks.forEach((task, idx) => {
    const taskDiv = document.createElement("div")
    const taskName = document.createElement("h5")
    const taskDescription = document.createElement("p")

    setStyleOfPendingTaskCard(task,taskDiv, taskName, taskDescription)

    taskName.textContent = task.name
    taskDescription.textContent = task.description
    taskDiv.id = `task-${idx}`
    taskDiv.appendChild(taskName)
    taskDiv.appendChild(taskDescription)

    taskDiv.addEventListener("click", () => {
      active = tasks[idx]
      setActiveTask()
      clearContainers()
      setTasksOnDOM()
    })

    pendingsContainer.appendChild(taskDiv)
  }); 
}

const clearContainers = () => {
  nodes.clearChildren(pendingsContainer)
}

const createLabelOptions = (label, labelIndex) => {
  const labelDiv = document.createElement("div")
  const labelCheck = document.createElement("input")
  const labelElement = document.createElement("label")
  labelCheck.id = `${pagination.currentPage}-${label}`
  labelCheck.name = `${pagination.currentPage}`
  labelCheck.type = "radio"
  labelCheck.value = label
  labelCheck.checked = label === activeImage.label
  labelCheck.classList.add("mx-2")

  labelCheck.addEventListener("change", () => {
    active.Images[pagination.currentPage].label = label
  })

  labelElement.textContent = label
  labelElement.htmlFor = `${pagination.currentPage}-${label}`

  labelDiv.appendChild(labelCheck)
  labelDiv.appendChild(labelElement)
  labelsContainer.appendChild(labelDiv)
}

const setActiveImage = async () => {
  nodes.clearChildren(labelsContainer)
  activeImage = active.Images[pagination.currentPage]
  activeImageElement.src = activeImage.path.slice(3)
  activeImageElement.style.maxHeight = "62vh"
  activeImageElement.style.width = "auto"
  activeImageId.textContent = activeImage.imageId
  activeImageName.textContent = activeImage.name
  activeImagePath.textContent = activeImage.path
  active.labels.forEach(createLabelOptions)
}

const setImagePagination = async () => {
  nodes.clearChildren(imagePagination)
  pagination.setPageCount(active.Images.length)
  pagination.getPages().forEach((page, pageIndex) => {
    const pageElement = document.createElement("li")
    pageElement.id = `image-${pageIndex}`
    pageElement.classList.add("page-item", "page-link", pagination.currentPage === pageIndex ? "active" : "-", "px-3")
    pageElement.textContent = page

    pageElement.addEventListener("click", () => {
      pagination.currentPage = pageIndex
      setActiveTask()
    })

    imagePagination.appendChild(pageElement)
  })
}

const setActiveTask = async () => {
  nodes.clearChildren(activeTaskLabels)

  activeTaskId.textContent = active.labelingTaskId
  activeTaskTitle.textContent = active.name
  activeTaskDescription.textContent = active.description
  active.labels.forEach((label) => {
    const labelElement = document.createElement("li")
    labelElement.classList.add("list-group-item")
    labelElement.textContent = label
    activeTaskLabels.appendChild(labelElement)
  })
  activeTaskStatus.textContent = active.Status
  
  await setImagePagination()
  await setActiveImage()
}

const setup = async () => {
  clearContainers()
  tasks = await fetchTasks()
  await setTasksOnDOM()
  await setActiveTask()
}
// DOM MANIPULATION FUNCTIONS



// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", setup)
submitBtn.addEventListener("click", submitLabels)
// EVENT LISTENERS
