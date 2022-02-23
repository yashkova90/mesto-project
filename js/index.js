
const popupButtonClose = document.querySelectorAll('.popup #close');

popupButtonClose.forEach((button) => {
    button.addEventListener('click', () => {
        popupClose();
    });
});

function popupOpen (id) {
    const popup = document.getElementById('popup-' + id);

    popup.classList.add('popup_active');

    setTimeout(function () {
     popup.classList.add('popup_show');
    });

    return popup;
}

function popupClose () {
    const active = document.querySelectorAll('.popup_active');

    active.forEach((popup) => {
        popup.classList.remove('popup_show');

        setTimeout(function () {
          popup.classList.remove('popup_active');
        }, 200);
    });
}

const formProfile = document.getElementById('form-profile');
const formCard = document.getElementById('form-card');

const profileTitle = document.getElementById('profile-title');
const profileSubtitle = document.getElementById('profile-subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const gallery = document.getElementById('gallery');

profileEditButton.addEventListener('click', (e) => {
    popupOpen('profile');
});

profileAddButton.addEventListener('click', (e) => {
    popupOpen('card');
});

formProfile.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = formProfile.querySelector('#profile-name');
    const description = formProfile.querySelector('#profile-description');

    profileTitle.innerText = name.value;
    profileSubtitle.innerText = description.value;

    popupClose();
});

formCard.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = formCard.querySelector('#card-name');
    const link = formCard.querySelector('#card-link');

    gallery.prepend(cardAdd({ name: name.value, link: link.value }));
    popupClose();
});

// cards

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function cardAdd (item) {
    const template = document.getElementById('gallery-item').content;
    const card = template.querySelector('.gallery__item');
    const clone = card.cloneNode(true);

    const name = clone.querySelector('.gallery__title');
    const picture = clone.querySelector('.gallery__picture');
    const trash = clone.querySelector('.gallery__remove');
    const like = clone.querySelector('.gallery__like');

    name.innerText = item.name;
    picture.src = item.link;

    trash.addEventListener('click', (e) => {
        clone.remove();
    });

    like.addEventListener('click', (e) => {
      like.classList.toggle('gallery__like_active');
    });

    picture.addEventListener('click', (e) => {
      const popup = popupOpen('picture');
      const picture = popup.querySelector('#picture-image');
      const title = popup.querySelector('#picture-title');

      picture.src = item.link;
      title.innerText = item.name;
    });

    return clone;
}

initialCards.forEach(it => {
  gallery.appendChild(cardAdd(it));
});