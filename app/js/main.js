// Team-info popover

let teamInfoToggles = document.querySelectorAll('.team-menu-toggle');
let teamMenu = document.querySelector('.main-menu__popover');

teamInfoToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        teamMenu.classList.toggle('popover--opened');
    })
})

// Main Menu

let menuToggle = document.querySelector('.main-menu__toggle');
let menu = document.querySelector('.main-menu');
let mainMenuInner = document.querySelector('.main-menu__inner');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('main-menu--opened');
    mainMenuInner.classList.toggle('main-menu__inner--opened');

    if (teamMenu.classList.contains('popover--opened')) {
        teamMenu.classList.toggle('popover--opened');
    }
});

// User info popover

let userInfo = document.querySelector('.user-info');
let userPopover = document.querySelector('.header-right-menu__popover');

userInfo.addEventListener('click', (evt) => {
    evt.preventDefault();
    userPopover.classList.toggle('popover--opened');
});

// Popups

let newBoardToggles= document.querySelectorAll('.new-board-toggle');
let newMemberToggles = document.querySelectorAll('.new-member-toggle');
let popupContainer = document.querySelector('.popup-container');
let popupNewBoard = document.querySelector('.popup--new-board');
let popupNewMember = document.querySelector('.popup--new-member');
let popupNewTask = document.querySelector('.popup--new-task');
let popupTask = document.querySelector('.popup--task');

newBoardToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        popupContainer.classList.toggle('popup-container--opened');
        popupNewBoard.classList.toggle('popup--opened');
    })
})

newMemberToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        popupContainer.classList.toggle('popup-container--opened');
        popupNewMember.classList.toggle('popup--opened');
    })
})

// New task popup and open existing task
let board = document.querySelector('.task-board');

const categories = {
    "Нужно сделать": "to-do",
    "В разработке": "in-work",
    "Просрочено": "not-done",
    "Сделано": "done"
};

board.addEventListener('click', (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains('new-task-toggle')) {
        popupContainer.classList.toggle('popup-container--opened');
        popupNewTask.classList.toggle('popup--opened');

        if (!evt.target.classList.contains('popup__close-toggle')) {
            let category = evt.target.parentNode.childNodes[1].textContent;
            let formSelect = document.querySelector('.new-task-select');
            formSelect.value = categories[category];
        }
    }
    else if (evt.target.closest('.task-toggle')) {
        popupContainer.classList.toggle('popup-container--opened');
        popupTask.classList.toggle('popup--opened');
    }
})

// Form attachment

let attachmentName = document.querySelector('.form__attachment-name');
let attachmentInput = document.querySelector('.form__input--attachment');

attachmentInput.addEventListener('change', (evt) => {
    const file = evt.target.files[0].name;
    attachmentName.textContent = file;
    attachmentName.style.color = "#3D3E59";
    attachmentName.style.fontSize = "16px";
})


