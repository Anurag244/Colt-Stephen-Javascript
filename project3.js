//console.log("Hello world");

//just give limited information and get whole object of data

const fetchData = async(searchTerm) => {
    const response= await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '7fd86be8',
            i: "tt4154756",
            s:searchTerm
        }
    });
  //  console.log(response.data);
  if(response.data.Error)
  {
      return [];
  }
      return response.data.Search;
};

//fetchData();
/*const input = document.querySelector('input');
 input.addEventListener('input',(event) =>{
   fetchData(event.target.value);
 });*/

 //Another way 2

 /*const input = document.querySelector('input');
 
 let timeoutId;

 const onInput = event => {
     if(timeoutId){
         clearTimeout(timeoutId);
     }
     timeoutId = setTimeout(() => {
         fetchData(event.target.value);
     },1000);
 };
 input.addEventListener('input',onInput);
 */

 //Another way 3

 const input = document.querySelector('input');

 const debounce = (func,delay = 1000) => {
     let timeoutId;
     return (...args) => {
         if(timeoutId) {
             clearTimeout(timeoutId);
         }
         timeoutId = setTimeout(() => {
             //func(args);
             func.apply(null,args);
         },delay)
     };
 };

 /*const onInput =  debounce(event => {
   const movies = fetchData(event.target.value);
 });

 input.addEventListener('input',onInput);*/

 //Another way of above 2 lines of code
 const onInput = async event =>{
     const movies = await fetchData(event.target.value);
    // console.log(movies);
    for(let movie of movies)
    {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src = ${movie.Poster}/>
        <h1>${movie.Title}</h1>
        `
        document.querySelector('#target').appendChild(div);
    }
    
 };
 input.addEventListener('input',debounce(onInput,500));