
/*const fetchData = async(searchTerm) => {
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

console.log('project5');

/*const createAutoComplete = ({
   fetchData = async(searchTerm) => {
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
  }
})

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete')

});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete')

});*/



/*createAutoComplete({
  root:document.querySelector('.autocomplete-two')
});

createAutoComplete({
  root:document.querySelector('.autocomplete-three')
});

createAutoComplete({
  root:document.querySelector('.autocomplete'),
});

*/
/*const onMoviesSelect = async movie => {
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
      };*/

      /*const createAutoComplete = ({
        root,
        renderOption,
        onOptionSelect,
        inputValue,
        fetchData
      }) => {
        root.innerHTML = `
          <label><b>Search</b></label>
          <input class="input" />
          <div class="dropdown">
            <div class="dropdown-menu">
              <div class="dropdown-content results"></div>
            </div>
          </div>
        `;
      
        const input = root.querySelector('input');
        const dropdown = root.querySelector('.dropdown');
        const resultsWrapper = root.querySelector('.results');
      
        const onInput = async event => {
          const items = await fetchData(event.target.value);
      
          if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
          }
      
          resultsWrapper.innerHTML = '';
          dropdown.classList.add('is-active');
          for (let item of items) {
            const option = document.createElement('a');
      
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
              dropdown.classList.remove('is-active');
              input.value = inputValue(item);
              onOptionSelect(item);
            });
      
            resultsWrapper.appendChild(option);
          }
        };
        input.addEventListener('input', debounce(onInput, 500));
      
        document.addEventListener('click', event => {
          if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
          }
        });
      };*/
    console.log('projrct5');

      const autoCompleteConfig = {
        renderOption(movie) {
          const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
          return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
          `;
        },
       /* onOptionSelect(movie) {
          document.querySelector('.tutorial').classList.add('is-hidden');
          onMovieSelect(movie);
        },*/
        inputValue(movie) {
          return movie.Title;
        },
        async fetchData(searchTerm) {
          const response = await axios.get('http://www.omdbapi.com/', {
            params: {
              apikey: 'd9835cc5',
              s: searchTerm
            }
          });
      
          if (response.data.Error) {
            return [];
          }
      
          return response.data.Search;
        }
      };
      
      createAutoComplete({
        ...autoCompleteConfig,
        root: document.querySelector('#left-autocomplete'),
        onOptionSelect(movie) {
          document.querySelector('.tutorial').classList.add('is-hidden');
          onMovieSelect(movie,document.querySelector('#left-summary'));
        },
      });
      createAutoComplete({
        ...autoCompleteConfig,
        root: document.querySelector('#right-autocomplete'),
        onOptionSelect(movie) {
          document.querySelector('.tutorial').classList.add('is-hidden');
          onMovieSelect(movie,document.querySelector("#right-summary"));
        },
      });

      let leftMovie;
      let rightMovie;
      
      const onMovieSelect = async(movie,summaryElement,side)  => {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            apikey: 'd9835cc5',
            i: movie.imdbID
          }
        });
      
        //document.querySelector('#summary').innerHTML = movieTemplate(response.data);
        summaryElement.innerHTML = movieTemplate(response.data);

        if(side === 'left')
        {
          leftMovie = response.data;

        }
        else
        {
          rightMovie = response.data;
        }

        if(leftMovie && rightMovie)
        {
          runComparison();
        }
      };

      const runComparison = () =>
      {
        //console.log('Time for Comparison');
        const leftSideStats = document.querySelectorAll('#left-summary.notification');
        const RightSideStats = document.querySelectorAll('#right-summary.notification');

        leftSideStats.forEach((leftStat,index) => {
          const rightstat = RightSideStats[index];
         // console.log(leftStat,rightstat);
         const leftSideValue = leftStat.dataset.value;
         const rightSideValue = rightstat.dataset.value;

         if(rightSideValue > leftSideValue) {
           leftStat.classList.remove('is-primary');
           leftStat.classList.add('is-warning');
         }
         else{
          rightstat.classList.remove('is-primary');
          rightstat.classList.add('is-warning');
         }

        });

      };
      
      const movieTemplate = movieDetail => {
      const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
   //console.log(dollars);
   const Metascore = parseInt(movieDetail.Metascore);
   const imdbRating = parseFloat(movieDetail.imdbRating);
   const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

   let count = 0;
   //const Awards = movieDetail.Awards.split('').forEach((word) =>
   const Awards = movieDetail.Awards.split('').reduce((prev,word) => {
     const value = parseInt(word);
     
     
   

     if(isNaN(value)) {
       return prev;
     } else{
       return prev + value;
     }
   }
  ,0);
  

   console.log(count);

   console.log(Metascore,imdbRating,imdbVotes);
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
          <article data-value=${Awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
          </article>
          <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
          </article>
          <article data-value=${Metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
          </article>
          <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
          </article>
          <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
          </article>
        `;
      };
      