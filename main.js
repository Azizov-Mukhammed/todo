const box = document.querySelector(".box");
const btn = document.querySelector("button");
const input = document.querySelector(".input");
const checkbox = document.querySelectorAll(".checkbox");
const fbutton = document.querySelector(".footer__button");
const footerRow = document.querySelector(".footer__row p");
const footerRowSpan = document.querySelector(".footer__load");
const editButton = document.querySelector(".edit__btn");

let state = [];

// render function
const render = function (array) {
  // reset html
  box.innerHTML = "";

  array.forEach((el) => {
    box.innerHTML += `
    <div class="todo" id=${el.id}>
      <span class="todo__box ${el.checbox ? "active" : ""}" >
        <input type="checkbox" class="checkbox"${el.checbox ? "checked" : ""} />
          <p class="todo__text">${el.text}</p>
      </span>
      <p class="edits__box">
        <span class="edite"><i class="fa-solid fa-pen edit__pen"></i></span>
        <span class="delete"><i class="fa-solid fa-xmark edit__close"></i></span>
      </p>
    </div>`;
  });
  footerLoading(state.length);
};

// footerRow Function
const footerLoading = function (length) {
  let doneTask = state.filter((el) => el.checbox === true);

  footerRow.innerHTML = `${doneTask.length} of ${length} tasks done`;
  footerRowSpan.style.width = `${(doneTask.length / length) * 100}%`;

  if (state.length === 0) footerRowSpan.style.width = "0%";
};

// add todo
btn.addEventListener("click", () => {
  if (input.value.trim().length) {
    // new state
    state.push({
      id: state.length + 1,
      text: input.value,
      checbox: false,
    });

    // render
    render(state);
  }

  // reset input
  input.value = "";
});

// box buttons
box.addEventListener("click", (e) => {
  // checed logic
  if (e.target.closest(".checkbox")) {
    let id = +e.target.closest(".checkbox").parentElement.parentElement.id;
    let element = state.find((item) => item.id === id);
    element.checbox = !element.checbox;

    render(state);
  }

  // delete logic
  if (e.target.closest(".delete")) {
    let id = +e.target.closest(".delete").parentElement.parentElement.id;
    state = state.filter((el) => el.id !== id);
    console.log(e.target);
    render(state);
  }

  // edite open logic
  if (e.target.closest(".edite")) {
    let id = +e.target.closest(".edite").parentElement.parentElement.id;
    let element = state.find((item) => item.id === id);
    let elementInHtml = document.getElementById(id);

    elementInHtml.innerHTML = `
      <span class="edit" >
        <input type="checkbox" class="checkbox" 
        ${element.checbox ? "checked" : ""} />
          <input  class="edit__input"  type="text" value=${element.text} />
          <button class="edit__btn"><i class="fa-solid fa-check"></i></button>
      </span>

      <p class="edits__box">
        <span class="edite"><i class="fa-solid fa-pen edit__pen"></i></span>
        <span class="delete"><i class="fa-solid fa-xmark edit__close"></i></span>
      </p>
    `;
  }

  // edit close logic
  if (e.target.closest(".edit__btn")) {
    let id = +e.target.closest(".edit__btn").parentElement.parentElement.id;
    let element = state.find((item) => item.id === id);
    const value =
      e.target.closest(".edit__btn").previousSibling.previousSibling.value;
    element.text = value;

    render(state);
  }
});

// remove button
fbutton.addEventListener("click", () => {
  state = state.filter((el) => el.checbox !== true);
  render(state);
});
