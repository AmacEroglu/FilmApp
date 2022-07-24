const form = document.getElementById('film-form');
const titleElement = document.querySelector('#title');
const urlElement = document.querySelector('#url');
const directorElement = document.querySelector('#director');
const cardBody = document.querySelectorAll('.card-body')[1];
const clear = document.getElementById('clear-films');

var degistirindex;
document.getElementById('guncelle').style.background = 'gray'
document.getElementById('guncelle').disabled = true

//UI objectten bir instance (örnek) oluşturduk
const ui = new UI();
//Storage objectten bir instance (örnek) oluşturduk
const storage = new Storage();

eventListener();
function eventListener() {
    //Formun submit olayı için event listener ekledik
    form.addEventListener('submit', addFilm);
    document.addEventListener('DOMContentLoaded', function () {
        //storageden filmleri yükle
        let films = storage.getFilmsFromStorage();
        //UI da tüm filmleri göster
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener('click', updatedFilm);
    cardBody.addEventListener('click', deleteFilm);
    clear.addEventListener('click', clearAllFilms);
}




function addFilm(e) {
    e.preventDefault();

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || url === "" || director === "") {
        //hata mesajı göster
        ui.displayMessage('Tüm alanları doldurduğunuzdan emin olun!', "danger");
    } else {
        //yeni bir film oluştur
        const newFilm = new Film(title, director, url);
        //Yeni filmi arayüze ekle
        ui.addFilmToUI(newFilm);
        //Yeni filmi storage ekle
        storage.addFilmToStorage(newFilm);
        //mesaj göster
        ui.displayMessage('Film başarı ile eklendi!', "success");


    }
    //inputları temizle
    ui.clearInputs(titleElement, directorElement, urlElement);
}





function deleteFilm(e) {
    e.preventDefault();

    //console.log('tıklandı --> ' + e.target);
    if (e.target.className === 'btn btn-danger') {
        // console.log("Filmi sil butonuna tıkladın");
        console.log(e.target.parentElement.parentElement);
        //UI da filmi sil
        ui.deleteFilmFromUI(e.target.parentElement.parentElement);
        //storageden filmi sil
        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    }

}
function updateFilmDisplay() {
    document.getElementById('guncelle').style.background = 'gray'
    document.getElementById('guncelle').disabled = true
    document.getElementById('filmEkle').style.background = 'red'
    document.getElementById('filmEkle').disabled = false

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    if (title === '' || director === '' || url === '') {
        alert('Güncellenecek filmi seçin.');
    } else {
        degistir(degistirindex);
        alert('Film Güncellendi');
    }
}

function updatedFilm(e) {
    e.preventDefault();
    document.getElementById('guncelle').style.background = 'green'
    document.getElementById('guncelle').disabled = false

    document.getElementById('filmEkle').style.background = 'gray'
    document.getElementById('filmEkle').disabled = true
    if (e.target.className === 'btn btn-success') {
        let baslik = e.target.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling.innerText;
        let films = storage.getFilmsFromStorage();

        for (let i = 0; i < films.length; i++) {
            if (films[i].title == baslik) {
                degistirindex = i;
                titleElement.value = films[i].title;
                directorElement.value = films[i].director;
                urlElement.value = films[i].url;
            }
        }
    }

}
function degistir(index) {
    let films = storage.getFilmsFromStorage();

    films[degistirindex].title = titleElement.value;
    films[degistirindex].director = directorElement.value;
    films[degistirindex].url = urlElement.value;
    storage.setFilms(films);
    document.getElementById('films').innerHTML = "";
    ui.loadAllFilms(films);
}


function clearAllFilms(e) {
    e.preventDefault();
    if (confirm('Emin misiniz?')) {
        //ui dan temizle
        ui.clearAllFilmsFromUI();
        //storageden temizle
        storage.clearAllFilmsFromStorage();
    }
}