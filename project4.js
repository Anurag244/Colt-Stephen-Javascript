const fetchData = async(searchTerm) => {
    const response= await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '7fd86be8',
            i: "tt4154756",
            s:searchTerm
        }
    });
  //  console.log(response.data);
      //return response.data.Search;
      if(response.data.Error)
      {
      return [];
      }
      return response.data.Search;
};

const root = document.querySelector('.autocomplete');

root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;




const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultWrapper = document.querySelector('.results');



const debounce = (func,delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()  => {
            //func(args);
            func.apply(null,args);
        },delay)
    };
};

const onInput = async event =>{
const movies = await fetchData(event.target.value);

if(!movies.length) 
{
    dropdown.classList.remove('is-active');
    return;
}
    //console.log(movies);
    resultWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for(let movie of movies)
    {
    const option = document.createElement('a');

    const imgSrc = movie.Poster === 'N/A' ? '' :movie.Poster;
    
    option.classList.add('dropdown-item');
    option.innerHTML = `
    <img src = "${movie.Poster}"/>
    ${movie.Title}
    `;

    option.addEventListener('click',() => {
        dropdown.classList.remove('is-active');
        input.value = movie.Title;
        onMoviesSelect(movie)
    });
    //document.querySelector('#target').appendChild(div);
    resultWrapper.appendChild(option);
    
}
};
input.addEventListener('input',debounce(onInput,500));

document.addEventListener('click',event=> {
    if(!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
    }
});


const onMoviesSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '7fd86be8',
            //i: "tt4154756",
            //s:searchTerm
             i: movie.imdbID
        }
    });
   //console.log(response.data);
   
   //document.querySelector('#summary'.innerHTML = movieTemplate(response.data));

   document.querySelector('#summary').innerHTML = movieTemplate(response.data);
      //return response.data.Search;
     /* if(response.data.Error)
      {
      return [];
      }
      return response.data.Search;
    
      */
    };
   

    const movieTemplate = movieDetail => {
        return `
          <article class="media">
            <figure class="media-left">
              <p class="image">
                <img src="${movieDetail.Poster}" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
              </div>
            </div>
          </article>
          <article class="notification is Primary">
          <p class = "title">${movieDetail.Awards}</p>
          <p class = "subtitle">Awards</P>
          </article>

          <article class="notification is Primary">
          <p class = "title">${movieDetail.BoxOffice}</p>
          <p class = "subtitle">Box Office</P>
          </article>

          <article class="notification is Primary">
          <p class = "title">${movieDetail.imdbRating}</p>
          <p class = "subtitle">IMDB Rating</P>
          </article>

          <article class="notification is Primary">
          <p class = "title">${movieDetail.imdbVotes}</p>
          <p class = "subtitle">IMDB Votes</P>
          </article>

          
        `;
      };