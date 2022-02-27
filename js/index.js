
const popupCloseButtons = document.querySelectorAll('.popup #close');
const popupPicture = document.querySelector('#popup-picture');
const pictureImage = popupPicture.querySelector('#picture-image');
const pictureTitle = popupPicture.querySelector('#picture-title');

const formProfile = document.getElementById('form-profile');
const formCard = document.getElementById('form-card');

const profileName = formProfile.querySelector('#profile-name');
const profileDescription = formProfile.querySelector('#profile-description');
const profileTitle = document.getElementById('profile-title');
const profileSubtitle = document.getElementById('profile-subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const gallery = document.getElementById('gallery');
const galleryTemplate = document.getElementById('gallery-item').content;
const galleryCard = galleryTemplate.querySelector('.gallery__item');

const cardName = formCard.querySelector('#card-name');
const cardLink = formCard.querySelector('#card-link');

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

popupCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    });
});

function openPopup (popup) {
    popup.classList.add('popup_active');

    setTimeout(function () {
     popup.classList.add('popup_show');
    });
}

function closePopup (popup) {
    popup.classList.remove('popup_show');

    setTimeout(function () {
      popup.classList.remove('popup_active');
    }, 200);
}

profileEditButton.addEventListener('click', (e) => {
    openPopup(document.querySelector('#popup-profile'));

    profileName.value = profileTitle.innerText;
    profileDescription.value = profileSubtitle.innerText;
});

profileAddButton.addEventListener('click', (e) => {
    openPopup(document.querySelector('#popup-card'));
});

formProfile.addEventListener('submit', (e) => {
    e.preventDefault();

    profileTitle.innerText = profileName.value;
    profileSubtitle.innerText = profileDescription.value;

    closePopup();
});

formCard.addEventListener('submit', (e) => {
    e.preventDefault();

    gallery.prepend(addCard({ name: cardName.value, link: cardLink.value }));

    cardName.value = '';
    cardLink.value = '';

    closePopup();
});

function addCard (item) {
    const clone = galleryCard.cloneNode(true);

    const name = clone.querySelector('.gallery__title');
    const picture = clone.querySelector('.gallery__picture');
    const trash = clone.querySelector('.gallery__remove');
    const like = clone.querySelector('.gallery__like');

    name.innerText = item.name;
    picture.src = item.link;
    picture.alt = item.name;

    trash.addEventListener('click', (e) => {
        clone.remove();
    });

    like.addEventListener('click', (e) => {
      like.classList.toggle('gallery__like_active');
    });

    picture.addEventListener('click', (e) => {
      openPopup(document.querySelector('#popup-picture'));

      pictureImage.src = item.link;
      pictureImage.alt = item.name;
      pictureTitle.innerText = item.name;
    });

    return clone;
}

initialCards.forEach(it => {
  gallery.appendChild(addCard(it));
});