"use strict";

const token = window.Laravel.csrfToken;

function changeSlide(slider, slideNumber) {
    const percentage = -100*slideNumber;
    const spaces = 4*slideNumber;
    slider.style.transform = `translateX(calc(${percentage}% - ${spaces}rem`;
    sliderCounter = slideNumber;
}

function displayErrorMessage(errorArea, message) {
    errorArea.textContent = message;
    errorArea.style.display = 'inline-block';
}
function csrfFetch(url, options = {}) {
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token
    };
    return fetch(url, options);
}

const toTopButton = document.querySelector(".to-top");
if (window.scrollY > window.innerHeight/2) {
    toTopButton.classList.add("active");
}
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight/2) {
        toTopButton.classList.add("active");
    } else {
        toTopButton.classList.remove("active");
    }
});

const burgerMenu = document.querySelector(".burger-menu");
burgerMenu.addEventListener("click", () =>{
    document.querySelector("header").classList.toggle("menu-open");
});

const loginSection = document.getElementById("login-section");
const loginButton = document.getElementById("open-login-modal");

if(loginButton) {
    loginButton.addEventListener("click", () => {
        loginSection.classList.add("active");
    });
}

const loginInterface = document.querySelector(".login-interface");
const registerInterface = document.querySelector(".register-interface");

const registrationLink = document.getElementById("registration-link");
registrationLink.addEventListener("click", () => {
    loginInterface.classList.remove("active");
    registerInterface.classList.add("active");
});

const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", () => {
    registerInterface.classList.remove("active");
    loginInterface.classList.add("active");
});

const closeModalsButtons = document.querySelectorAll(".close-modal");
closeModalsButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", ()=> {
        loginSection.classList.remove("active");
    });
});

const slider = document.querySelector(".slider");
const sliderLength = document.querySelectorAll(".slider article").length-1;
let sliderCounter = 0;

if (slider) {
    const sliderParent = slider.parentElement;
    const containerSlider = sliderParent.parentElement;

    const sliderLeftArrow = sliderParent.querySelector(".arrow-left");
    sliderLeftArrow.addEventListener("click", () => {
        if(sliderCounter == 0) {
            sliderCounter = sliderLength;
        } else {
            sliderCounter--;
        }

        if(containerSlider.querySelector(".slider-tags")) {
            containerSlider.querySelector(".slider-tags .active").classList.remove('active');
            containerSlider.querySelector(`.slider-tags li[data-position="${sliderCounter}"]`).classList.add('active');
        }

        changeSlide(slider, sliderCounter);
    })

    const sliderRightArrow = sliderParent.querySelector(".arrow-right");
    sliderRightArrow.addEventListener("click", () => {
        if(sliderCounter == sliderLength) {
            sliderCounter = 0;
        } else {
            sliderCounter++;
        }

        if(containerSlider.querySelector(".slider-tags")) {
            containerSlider.querySelector(".slider-tags .active").classList.remove('active');
            containerSlider.querySelector(`.slider-tags li[data-position="${sliderCounter}"]`).classList.add('active');
        }

        changeSlide(slider, sliderCounter);
    })
}

if (slider) {
    const sliderParent = slider.parentElement;
    const containerSlider = sliderParent.parentElement;
    const sliderTags = containerSlider.querySelectorAll('.slider-tags li');
    sliderTags.forEach((tag) => {
        tag.addEventListener("click", () => {
            containerSlider.querySelector('.slider-tags .active').classList.remove('active');
            tag.classList.add('active');
            changeSlide(slider, tag.dataset.position);
        })
    });
}

const openNotifButton = document.querySelectorAll(".open-notification");
openNotifButton.forEach((openNotif) => {
    openNotif.addEventListener("click", ()=> {
        const notification = openNotif.parentElement;

        if (notification.classList.contains('open')) {
            notification.style.height = '110px';
            notification.classList.remove('open');
        } else {
            const notificationContentHeight = notification.scrollHeight + 30;
            notification.style.height = notificationContentHeight + 'px';
            notification.classList.add('open');
        }
    });
});

const showInterestedClients = document.querySelectorAll(".show-interested-clients");
showInterestedClients.forEach((openInterested) => {
    openInterested.addEventListener("click", ()=> {
        const favoriteCard = openInterested.closest(".favorite-card");
        const interestedList = favoriteCard.querySelector(".interested-clients");

        if(interestedList.classList.contains("active")) {
            interestedList.classList.remove("active");
        } else {
            interestedList.classList.add("active");
        }
    });
});


const openNotificationTextarea = document.querySelectorAll(".write-notification-client");
openNotificationTextarea.forEach((openTextarea) => {
    openTextarea.addEventListener("click", ()=> {
        const writeArea = openTextarea.parentElement;

        if(writeArea.classList.contains("active")) {
            writeArea.classList.remove("active");
        } else {
            writeArea.classList.add("active");
        }
    });
});

const addToFavoriteButton = document.getElementById('add-to-favorite');
if (addToFavoriteButton) {
    const id_bienImmo = addToFavoriteButton.getAttribute('data-id-bien');
    addToFavoriteButton.addEventListener("click", () => {
        csrfFetch('/check-user-connected' ,{
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.isConnected === true) {

                if (addToFavoriteButton.classList.contains('as--favorite')) {
                    csrfFetch('/remove-favorite', {
                        method: 'POST',
                        body: JSON.stringify({ id_bienImmo: id_bienImmo })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.removedFavorite === true) {
                                addToFavoriteButton.classList.remove('as--favorite');
                                addToFavoriteButton.title = "Ajouter aux favoris";
                            }
                        })
                        .catch(error => {
                            console.error('Une erreur est survenue durant le retrait du bien en favoris', error);
                        })
                } else {
                    csrfFetch('/add-favorite', {
                        method: 'POST',
                        body: JSON.stringify({ id_bienImmo: id_bienImmo })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.registeredFavorite === true) {
                                addToFavoriteButton.classList.add('as--favorite');
                                addToFavoriteButton.title = "Retirer des favoris";
                            }
                        })
                        .catch(error => {
                            console.error('Une erreur est survenue durant l\'ajout du bien en favoris', error);
                        });
                }
            } else {
                displayErrorMessage(document.getElementById('error-check-user-connected'), 'Connectez-vous à votre compte pour pouvoir ajouter des biens en favoris !');
            }
        })
        .catch(error => {
            console.error('Une erreur est survenue durant la vérification de la connexion de l\'utilisateur :', error);
        });
    });
}


const propertiesPaginationButton = document.getElementById("load-more-properties");
if(propertiesPaginationButton) {
    propertiesPaginationButton.addEventListener('click', function () {
        const nextPage = propertiesPaginationButton.getAttribute('data-next-page');

        if (nextPage) {
            csrfFetch('/load-more-properties', {
                method: 'POST',
                body: JSON.stringify({ page: nextPage })
            })
                .then(response => response.json())
                .then(data => {
                    const propertyList = document.getElementById('property-list');

                    data.properties.forEach(property => {
                        const propertyCard = `
                        <a href="/detail-property/${property.id_bienImmo}" class="card-immo">
                            <div class="img-container">
                                <img src="${property.image_url}" alt="${property.titre_annonce}">
                                <span class="filter-img"></span>
                                <p class="price-property">${property.prix_formatted.toLocaleString()} €</p>
                            </div>
                            <p class="title-property">${property.titre_annonce}</p>
                            <p class="city-property"><i class="fas fa-map-marker-alt"></i>${property.ville}</p>
                            <div class="criterias-property">
                                <div>
                                    <i class="fas fa-bed"></i>
                                    <p><strong>${property.nb_chambres}</strong> chambre(s)</p>
                                </div>
                                <div>
                                    <i class="fas fa-bath"></i>
                                    <p><strong>${property.nb_sdb}</strong> salle(s) de bain</p>
                                </div>
                                <div>
                                    <i class="fas fa-ruler-combined"></i>
                                    <p><strong>${property.surface}</strong> m2</p>
                                </div>
                            </div>
                            <button class="a-button h-bg-primary h-color-white">Découvrir ce bien</button>
                        </a>
                    `;

                        propertyList.insertAdjacentHTML('beforeend', propertyCard);
                    });


                    if (data.next_page) {
                        propertiesPaginationButton.setAttribute('data-next-page', data.next_page);
                    } else {
                        propertiesPaginationButton.style.display = 'none';
                    }
                })
                .catch(error => console.error('Il y a eu une erreur durant le chargement de davantage de biens immobiliers : ', error));
        }
    });
}

const saveSearchButton = document.getElementById('save-search');
if (saveSearchButton) {
    saveSearchButton.addEventListener('click', function() {
        csrfFetch('/check-user-connected' ,{
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (data.isConnected === true) {
                    const formData = {
                        propertyStatus: document.querySelector('input[name="property-status"]:checked').value,
                        propertyType: document.getElementById('select-type').value,
                        propertyKeywords: document.getElementById('text-keywords').value,
                        propertyCity: document.getElementById('text-city').value,
                        propertyMinPrice: document.getElementById('number-min-price').value,
                        propertyMaxPrice: document.getElementById('number-max-price').value
                    };

                    csrfFetch('/save-search', {
                        method: 'POST',
                        body: JSON.stringify(formData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.searchRegistered) {
                                this.disabled = true;
                                this.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>Recherche enregistrée';
                                this.removeAttribute('id');
                                alert('Votre recherche a été enregistrée avec succès !');
                            }
                        })
                        .catch(error => {
                            console.error('Une erreur est survenue durant l\'enregistrement de la recherche : ', error);
                        });

                } else {
                    displayErrorMessage(document.getElementById('error-check-user-connected'), 'Connectez-vous à votre compte pour pouvoir ajouter des biens en favoris !');
                }
            })
            .catch(error => {
                console.error('Une erreur est survenue durant la vérification de la connexion de l\'utilisateur :', error);
            });
    });
}

const deleteSearchButton = document.querySelectorAll('.delete-search');
if (deleteSearchButton) {
    deleteSearchButton.forEach(deleteButton => {
        deleteButton.addEventListener('click', function(event) {
            event.preventDefault();

            const searchId = this.dataset.searchId;
            csrfFetch(`/delete-search/${searchId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if (data.searchDeleted === true) {
                    this.closest('.search-card').remove();
                }
            })
            .catch(error => console.error('Une erreur s\'est produite au moment de la suppression de la recherche : ', error));

        });
    });
}


const deleteContactRequestButton = document.querySelectorAll('.delete-contact-request');
if (deleteContactRequestButton) {
    deleteContactRequestButton.forEach(deleteButton => {
        deleteButton.addEventListener('click', function(event) {
            event.preventDefault();

            const contactRequestId = this.dataset.contactRequestId;
            csrfFetch(`/delete-contact-request/${contactRequestId}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.contactRequestDeleted === true) {
                        this.closest('.notification').remove();
                    }
                })
                .catch(error => console.error('Une erreur s\'est produite au moment de la suppression de la demande de contact : ', error));

        });
    });
}

const changeVisibilityButton = document.querySelectorAll('.visibility-button');
if (changeVisibilityButton) {
    changeVisibilityButton.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const propertyId = this.dataset.id;
            csrfFetch(`/change-visibility-property/${propertyId}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                const cardImmo = this.closest('.favorite-card');
                if (data.visibilityChanged === "hidden") {
                    cardImmo.querySelector('.card-immo').classList.add('hidden-to-clients');
                    cardImmo.querySelector('.visibility-button').textContent = "Rendre visible";
                } else if(data.visibilityChanged === "visible") {
                    cardImmo.querySelector('.card-immo').classList.remove('hidden-to-clients');
                    cardImmo.querySelector('.visibility-button').textContent = "Masquer";
                }
            })
            .catch(error => console.error('Une erreur s\'est produite au moment du changement de visibilité du bien immobilier : ', error));
        });
    });
}

const deletePropertyButton = document.querySelectorAll('.delete-property-button');
if (deletePropertyButton) {
    deletePropertyButton.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const propertyId = this.dataset.id;
            csrfFetch(`/delete-property/${propertyId}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                if (data.propertyDeleted === true) {
                    this.closest('.favorite-card').remove();
                }
            })
            .catch(error => console.error('Une erreur s\'est produite au moment de la suppression du bien immobilier : ', error));
        });
    });
}

document.querySelector('#register-user-form').addEventListener('submit', function(event) {

    event.preventDefault();

    document.querySelectorAll('.text-danger').forEach(function(element) {
        element.style.display = 'none';
        element.textContent = '';
    });

    let hasError = false;

    const firstname = document.getElementById('firstname').value;
    if (firstname === '') {
        displayErrorMessage(document.getElementById('error-firstname'), 'Ce champ est obligatoire.');
        hasError = true;
    }

    const lastname = document.getElementById('lastname').value;
    if (lastname === '') {
        displayErrorMessage(document.getElementById('error-lastname'), 'Ce champ est obligatoire.');
        hasError = true;
    }

    const phone = document.getElementById('phone').value;
    const onlyDigitPattern = /^[0-9]+$/;
    if (phone === '') {
        displayErrorMessage(document.getElementById('error-phone'), 'Ce champ est obligatoire.');
        hasError = true;
    }
    else if (!onlyDigitPattern.test(phone)) {
        displayErrorMessage(document.getElementById('error-phone'), 'Ce champ peut contenir uniquement des chiffres');
        hasError = true;
    }

    const mail2 = document.getElementById('mail2').value;
    if (mail2 === '') {
        displayErrorMessage(document.getElementById('error-mail2'), 'Ce champ est obligatoire.');
        hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(mail2)) {
        displayErrorMessage(document.getElementById('error-mail2'), 'Votre adresse doit posséder une @ et un . entourés d\'autres caractères pour être valide');
        hasError = true;
    }


    const password2 = document.getElementById('password2').value;
    const digitPattern = /[0-9]/;
    const letterPattern = /[a-zA-Z]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (password2.length < 8) {
        displayErrorMessage(document.getElementById('error-password2'), 'Le mot de passe doit contenir au moins 8 caractères.');
        hasError = true;
    } else if (!digitPattern.test(password2)) {
        displayErrorMessage(document.getElementById('error-password2'), 'Le mot de passe doit contenir au moins 1 chiffre.');
        hasError = true;
    } else if (!letterPattern.test(password2)) {
        displayErrorMessage(document.getElementById('error-password2'), 'Le mot de passe doit contenir au moins 1 lettre.');
        document.getElementById('error-password2').style.display = 'block';
        hasError = true;
    } else if (!specialCharPattern.test(password2)) {
        displayErrorMessage(document.getElementById('error-password2'), 'Le mot de passe doit contenir au moins 1 caractère spécial.');
        hasError = true;
    }

    const password2_confirmation = document.getElementById('password2_confirmation').value;
    if (password2 !== password2_confirmation) {
        displayErrorMessage(document.getElementById('error-password2_confirmation'), 'Vos 2 mots de passe ne correspondent pas.');
        hasError = true;
    }


    // Check if the user's mail already exists with an AJAX function
    if (!hasError) {
        csrfFetch("/check-email", {
            method: 'POST',
            body: JSON.stringify({ email: mail2 })
        })
        .then(response => response.json())
        .then(data => {
            if (data.existingEmail === true) {
                displayErrorMessage(document.getElementById('error-mail2'), 'L\'adresse mail renseignée est déja associée à un compte utilisateur.');
                hasError = true;
            } else {
                // If the mail doesn't already exists, send the form submission for a server's side validation
                event.target.submit();
            }
        })
        .catch(error => {
            console.error('Une erreur est survenue durant la vérification de l\'adresse mail :', error);
            displayErrorMessage(document.getElementById('error-mail2'), 'Une erreur est survenue lors de la vérification de l\'adresse mail.');
            hasError = true;
        });
    }
});


/***
 * Login user's form
 ***/
document.querySelector('#connect-user-form').addEventListener('submit', function(event) {

    event.preventDefault();

    document.querySelectorAll('.text-danger').forEach(function(element) {
        element.style.display = 'none';
        element.textContent = '';
    });

    let hasError = false;

    const mail = document.getElementById('mail').value;
    if (mail === '') {
        displayErrorMessage(document.getElementById('error-mail'), 'Ce champ est obligatoire.');
        hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
        displayErrorMessage(document.getElementById('error-mail'), 'Votre adresse doit posséder une @ et un . entourés d\'autres caractères pour être valide');
        hasError = true;
    }

    const password = document.getElementById('password').value;
    if (password === '') {
        displayErrorMessage(document.getElementById('error-password'), 'Ce champ est obligatoire.');
        hasError = true;
    }

    if (!hasError) {
        csrfFetch("/verify-user", {
            method: 'POST',
            body: JSON.stringify({
                email: mail,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.existingUser === false) {
                displayErrorMessage(document.getElementById('error-mail'), data.message);
                hasError = true;
            } else {
                // If the mail doesn't already exists, send the form submission for a server's side validation
                event.target.submit();
            }
        })
        .catch(error => {
            console.error('Une erreur est survenue durant la vérification de l\'utilisateur :', error);
            displayErrorMessage(document.getElementById('error-mail'), 'Une erreur est survenue lors de la vérification de l\'utilisateur.');
            hasError = true;
        });
    }
});


/***
 * Sale property's form
 ***/
if (document.querySelector('#sale-property-form')) {
    document.querySelector('#sale-property-form').addEventListener('submit', function(event) {

        event.preventDefault();

        const digitPattern = /^\d+$/;

        document.querySelectorAll('.text-danger').forEach(function(element) {
            element.style.display = 'none';
            element.textContent = '';
        });

        let hasError = false;

        const title = document.getElementById('title').value;
        if (title === '') {
            displayErrorMessage(document.getElementById('error-title'), 'Ce champ est obligatoire.');
            hasError = true;
        }


        const price = document.getElementById('price').value;
        if (price === '') {
            displayErrorMessage(document.getElementById('error-price'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (price < 0) {
            displayErrorMessage(document.getElementById('error-price'), 'Le prix de votre bien ne peut pas être négatif.');
            hasError = true;
        }


        const description = document.getElementById('description').value;
        if (description === '') {
            displayErrorMessage(document.getElementById('error-description'), 'Ce champ est obligatoire.');
            hasError = true;
        }


        const address = document.getElementById('address').value;
        if (address === '') {
            displayErrorMessage(document.getElementById('error-address'), 'Ce champ est obligatoire.');
            hasError = true;
        }


        const city = document.getElementById('city').value;
        if (city === '') {
            displayErrorMessage(document.getElementById('error-city'), 'Ce champ est obligatoire.');
            hasError = true;
        }


        const postal = document.getElementById('postal').value;
        if (postal === '') {
            displayErrorMessage(document.getElementById('error-postal'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (!digitPattern.test(postal)) {
            displayErrorMessage(document.getElementById('error-postal'), 'Ce champ ne peut contenir que des chiffres.');
            hasError = true;
        }


        const area = document.getElementById('area').value;
        if (area === '') {
            displayErrorMessage(document.getElementById('error-area'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (area < 0) {
            displayErrorMessage(document.getElementById('error-area'), 'La surface de votre bien ne peut pas être négative.');
            hasError = true;
        }


        const nb_rooms = parseInt(document.getElementById('nb_rooms').value, 10);
        if (nb_rooms == '') {
            displayErrorMessage(document.getElementById('error-nb_rooms'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (nb_rooms < 0) {
            displayErrorMessage(document.getElementById('error-nb_rooms'), 'Le nombre de pièces de votre bien ne peut pas être négatif.');
            hasError = true;
        }


        const nb_bedrooms = parseInt(document.getElementById('nb_bedrooms').value, 10);
        if (nb_bedrooms == '') {
            displayErrorMessage(document.getElementById('error-nb_bedrooms'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (nb_bedrooms < 0) {
            displayErrorMessage(document.getElementById('error-nb_bedrooms'), 'Le nombre de chambres de votre bien ne peut pas être négatif.');
            hasError = true;
        } else if (nb_bedrooms > nb_rooms) {
            displayErrorMessage(document.getElementById('error-nb_bedrooms'), 'Le nombre de chambres de votre bien ne peut pas supérieur au nombre total de pièces.');
            hasError = true;
        }


        const nb_bathrooms = parseInt(document.getElementById('nb_bathrooms').value, 10);
        if (nb_bathrooms == '') {
            displayErrorMessage(document.getElementById('error-nb_bathrooms'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (nb_bathrooms < 0) {
            displayErrorMessage(document.getElementById('error-nb_bathrooms'), 'Le nombre de salles de bain de votre bien ne peut pas être négatif.');
            hasError = true;
        } else if (nb_bathrooms > nb_rooms) {
            displayErrorMessage(document.getElementById('error-nb_bathrooms'), 'Le nombre de salles de bain de votre bien ne peut pas supérieur au nombre total de pièces.');
            hasError = true;
        }


        if (!hasError) {
            csrfFetch('/check-user-connected' ,{
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.isConnected === true) {
                    event.target.submit();
                } else {
                    displayErrorMessage(document.getElementById('error-check-user-connected'), 'Connectez-vous à votre compte pour pouvoir nous soumettre un bien à vendre ou à louer !');
                }
            })
            .catch(error => {
                console.error('Une erreur est survenue durant la vérification de la connexion de l\'utilisateur :', error);
            });
        }
    });
}


/***
 * Contact form
 ***/
if (document.querySelector('#contact-form')) {
    document.querySelector('#contact-form').addEventListener('submit', function(event) {

        event.preventDefault();

        document.querySelectorAll('.text-danger').forEach(function(element) {
            element.style.display = 'none';
            element.textContent = '';
        });

        let hasError = false;

        const contactFirstname = document.getElementById('contact-firstname').value;
        if (contactFirstname === '') {
            displayErrorMessage(document.getElementById('error-contact-firstname'), 'Ce champ est obligatoire.');
            hasError = true;
        }

        const contactLastname = document.getElementById('contact-lastname').value;
        if (contactLastname === '') {
            displayErrorMessage(document.getElementById('error-contact-lastname'), 'Ce champ est obligatoire.');
            hasError = true;
        }

        const contactMail = document.getElementById('contact-mail').value;
        if (contactMail === '') {
            displayErrorMessage(document.getElementById('error-contact-mail'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(contactMail)) {
            displayErrorMessage(document.getElementById('error-contact-mail'), 'Votre adresse doit posséder une @ et un . entourés d\'autres caractères pour être valide');
            hasError = true;
        }

        const contactPhone = document.getElementById('contact-phonenum').value;
        const onlyDigitPattern = /^[0-9]+$/;
        if (contactPhone === '') {
            displayErrorMessage(document.getElementById('error-contact-phonenum'), 'Ce champ est obligatoire.');
            hasError = true;
        }
        else if (!onlyDigitPattern.test(contactPhone)) {
            displayErrorMessage(document.getElementById('error-contact-phonenum'), 'Ce champ peut contenir uniquement des chiffres');
            hasError = true;
        }

        // Check if the user's mail already exists with an AJAX function
        if (!hasError) {
            event.target.submit();
        }
    });
}


/***
 * Update user form
 ***/
if (document.querySelector('#update-user-form')) {
    document.querySelector('#update-user-form').addEventListener('submit', function(event) {

        event.preventDefault();

        document.querySelectorAll('.text-danger').forEach(function(element) {
            element.style.display = 'none';
            element.textContent = '';
        });

        let hasError = false;

        const updateFirstname = document.getElementById('update-firstname').value;
        if (updateFirstname === '') {
            displayErrorMessage(document.getElementById('error-update-firstname'), 'Ce champ est obligatoire.');
            hasError = true;
        }

        const updateLastname = document.getElementById('update-lastname').value;
        if (updateLastname === '') {
            displayErrorMessage(document.getElementById('error-update-lastname'), 'Ce champ est obligatoire.');
            hasError = true;
        }

        const updatePhone = document.getElementById('update-phone').value;
        const onlyDigitPattern = /^[0-9]+$/;
        if (updatePhone === '') {
            displayErrorMessage(document.getElementById('error-update-phone'), 'Ce champ est obligatoire.');
            hasError = true;
        }
        else if (!onlyDigitPattern.test(updatePhone)) {
            displayErrorMessage(document.getElementById('error-update-phone'), 'Ce champ peut contenir uniquement des chiffres');
            hasError = true;
        }

        const updateMail = document.getElementById('update-mail').value;
        if (updateMail === '') {
            displayErrorMessage(document.getElementById('update-mail'), 'Ce champ est obligatoire.');
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(updateMail)) {
            displayErrorMessage(document.getElementById('error-update-mail'), 'Votre adresse doit posséder une @ et un . entourés d\'autres caractères pour être valide');
            hasError = true;
        }


        const updatePassword = document.getElementById('update-password').value;
        const digitPattern = /[0-9]/;
        const letterPattern = /[a-zA-Z]/;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        if (updatePassword.length < 8) {
            displayErrorMessage(document.getElementById('error-update-password'), 'Le mot de passe doit contenir au moins 8 caractères.');
            hasError = true;
        } else if (!digitPattern.test(updatePassword)) {
            displayErrorMessage(document.getElementById('error-update-password'), 'Le mot de passe doit contenir au moins 1 chiffre.');
            hasError = true;
        } else if (!letterPattern.test(updatePassword)) {
            displayErrorMessage(document.getElementById('error-update-password'), 'Le mot de passe doit contenir au moins 1 lettre.');
            document.getElementById('error-update-password').style.display = 'block';
            hasError = true;
        } else if (!specialCharPattern.test(updatePassword)) {
            displayErrorMessage(document.getElementById('error-update-password'), 'Le mot de passe doit contenir au moins 1 caractère spécial.');
            hasError = true;
        }

        // Check if the user's mail already exists with an AJAX function
        if (!hasError) {
            event.target.submit();
        }
    });
}

/***
 * Send notification to user form
 ***/
document.querySelectorAll('.send-notification-client').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let hasError = false;

        const clientId = form.querySelector('input[name="id_client"]').value;

        const titre_notif = form.querySelector('input[name="titre_notif"]').value;
        if (titre_notif === '') {
            displayErrorMessage(document.getElementById('error-titre_notif'), 'Ce champ est obligatoire.');
            hasError = true;
        }

        const contenu_notif = form.querySelector('textarea[name="contenu_notif"]').value;
        if (contenu_notif === '') {
            displayErrorMessage(document.getElementById('error-contenu_notif'), 'Ce champ est obligatoire.');
            hasError = true;
        }

        if (!hasError) {
            const requestData = {
                id_client: clientId,
                titre_alerte: titre_notif,
                contenu_alerte: contenu_notif
            };

            csrfFetch("/send-notification-client", {
                method: 'POST',
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.notificationSended === true) {
                    alert("La notification à bien été envoyée à l'utilisateur !");
                    this.reset();
                } else {
                    alert('Erreur lors de l\'envoi de la notification à l\'utilisateur');
                }
            })
            .catch(error => console.error('Une erreur est survenue lors de l\'envoi de la notification à l\'utilisateur : ', error));
        }
    });
});
