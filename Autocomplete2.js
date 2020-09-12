console.log('Autocomplete2');

const createAutoComplete = ({ 
    root, 
    renderOption,
    inputValue,
    onOptionSelect,
    fetchData

}) => {
    root.innerHTML = `
      <label><b>Search For a Movie</b></label>
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
    const onInput = async event => {
      //const movies = await fetchData(event.target.value);
      const items = await fetchData(event.target.value);
  
      if (!items.length) {
        dropdown.classList.remove('is-active');
        return;
      }
  
      resultsWrapper.innerHTML = '';
      dropdown.classList.add('is-active');
      for (let item of items) {
        const option = document.createElement('a');
       // const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
  
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);
       /* `
        <img src="${imgSrc}" />
        ${movie.Title}
      `;*/
        option.addEventListener('click', () => {
          dropdown.classList.remove('is-active');
         // input.value = movie.Title;
         input.value = inputValue(item);
          //onMoviesSelect(movie);
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
  };
  