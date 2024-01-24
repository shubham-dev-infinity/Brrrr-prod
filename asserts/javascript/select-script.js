//look for container for select tag
var container = document.querySelector(".selection");

//look fot select tag
var select = document.querySelector("select");

//create div tag as custom selection
var customSelect = document.createElement("div");
customSelect.setAttribute("class", "custom-select");
customSelect.innerHTML = select.options[select.selectedIndex].innerHTML;
container.appendChild(customSelect);

//create div tag that will wraping the options div
var customOptionContainer = document.createElement("div");
customOptionContainer.setAttribute("class", "custom-select-container");

//create div tag for each option item
var numOption = select.length;

for (let i = 1; i < numOption; i++) {
    var customOption = document.createElement("div");
    customOption.setAttribute("class", "custom-select-item");
    customOption.innerHTML = select.options[i].innerHTML;
    customOptionContainer.appendChild(customOption);

    //add event listerner on each option
    customOption.addEventListener("click", () => selected(i));
}
container.appendChild(customOptionContainer);

customSelect.addEventListener("click", () => showOption());

const showOption = () => {
    customSelect.classList.toggle("option-active");
    if (!customOptionContainer.classList.contains("show")) {
        customOptionContainer.classList.add("show");
    } else {
        customOptionContainer.classList.remove("show");
        // customSelect.classList.toggle("option-active");
    }
    // container.appendChild(customOptionContainer);
};

//function when option is clicked
const selected = (index) => {
    //change to arrow up
    customSelect.classList.toggle("option-active");

    //hide the option items
    customOptionContainer.classList.remove("show");

    //remove selected atrribute on each option tag
    for (let i = 0; i < numOption; i++) {
        select.options[i].removeAttribute("selected");
    }

    //add selected atrribute on selected option
    select.options[index].setAttribute("selected", "");

    //change text on custom select into selected option
    customSelect.innerHTML = select.options[select.selectedIndex].innerHTML;
};
