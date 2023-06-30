/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList= document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('.add'),
        checkbox = addForm.querySelector('[type="checkbox"]'),
        addInput = addForm.querySelector('.adding__input'), 
        confirmButton = addForm.querySelector('button'),
        deleteBtn = movieList.querySelectorAll('.delete');
    
    
    const deleteAdv = (arr) => {
        arr.forEach( el => el.remove());
    };

    const makeChanges = () => {
        genre.textContent = 'ДРАМА';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }

    const sortArr = arr => arr.sort(); 
 
    const renderMovieDB = (films, parent) => {
        let lowerCaseMoviesArr = films.map(movie => movie.length < 21 ? 
                                                    movie[0].toLocaleLowerCase() + movie.slice(1) :
                                                    movie[0].toLocaleLowerCase() + movie.slice(1,20) + '...');

        sortArr(lowerCaseMoviesArr);

        parent.innerHTML = "";

        lowerCaseMoviesArr.forEach( (el, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${el}
            <div class="delete"></div>
            </li>`;
        });
    };

    deleteAdv(adv);
    makeChanges();
    sortArr(movieDB.movies);
    renderMovieDB(movieDB.movies, movieList);
    
    function confirmButtonHandler(e) {
        e.preventDefault();
        if (!addInput.value.trim()) return;

        if (checkbox.checked) {
            console.log("Добавляем любимый фильм");
        }
        movieDB.movies.push(addInput.value);
        renderMovieDB(movieDB.movies, movieList);
        addInput.value = '';
    }
    
    confirmButton.addEventListener('click', confirmButtonHandler);
    
    // function deleteListItem(e){
    //     console.log("    deleteeee    ");
    // }
    
    // function testEvent(e){
    //     console.log(e.target);
    // }
    
    //deleteBtn.forEach( btn => btn.addEventListener('hover', () => console.log('click')));
    
    // for (let movie of deleteBtn){
    //     //movie.addEventListener('click', testEvent);
    //     movie.addEventListener('click', (e)=> {alert('hi!')} );
    // }
});

