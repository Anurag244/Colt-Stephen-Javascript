//console.log('Hi there!');

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params : {
        apikey:'d9835cc5',
        s: searchTerm
          //i = id
        //i:"tt0848228",
         //search
          // s:'avengers'
        // s:"tt0848228"
          
        }
    });

    if(response.data.Error)
    {
        return [];
    }
    console.log(response.data);
    return response.data.Search;
};
/*const root = document.querySelector('.autocomplete');
root.innerHTML = `<label><b>Search for a Movie </b></label>
                 <input class = "input"/>
                 <div class = "dropdown">
                 <div class= "dropdown-menu">
                 <div class = "dropdown-content results"></div>
                 </div>
                 </div>`;
//fetchData();
*/

const input = document.querySelector('input');
input.addEventListener('input',(event) => {
    fetchData(event.target.value);
});
}

// Another way
/*const input = document.querySelector('input');

let timeoutId;
const onInput = event => {
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setInterval(() =>{
        fetchData(event.target.value);
    },1000)
};

input.addEventListener('input',onInput);
*/

/*const debounce = (func) => {
  let timeoutId;
    return (...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null,args);
        },1000);
    };
};

const onInput = debounce(event => {
   fetchData(event.target.value);

//const input = document.querySelector('input')
//input.addEventListener('input',onInput);
*/

//another way


/*const input = document.querySelector('input');
const resultsWrapper = document.querySelector('.results');
const dropdown = document.querySelector('.dropdown');


const onInput = async event => {
    const movies = await fetchData(event.target.value)
}*/
/*const debounce = (func,delay = 1000) => {
    let timeoutId;
    return(...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null,args);
        },delay);
    };

};*/

/*const onInput = debounce(event => {
    fetchData(event.target.value);
});
*/
//input.addEventListener('input',onInput);

//if we use await then use async too
//const onInput = async event => {
  //const movies = await fetchData(event.target.value);
 
  /*dropdown.classList.add('is-active');
  for(let movie of movies){
  //const div = document.createElement('div');
   const option = document.createElement('a');
  //div.innerHTML = `<img src = "${movie.Poster}"/>
  option.classList.add('dropdown-item');
  option.innerHTML = `<img src = "${movie.Poster}"/>
  <hi>${movie.Title}</h1>`;
  
  //document.querySelector('#target').appendChild(div);

  //resultsWrapper.appendChild(div);
  resultsWrapper.appendChild(option);

  }
  */



  

//input.addEventListener('input',debounce(onInput,500));


