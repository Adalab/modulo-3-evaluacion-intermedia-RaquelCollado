import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [countrySearch, setCountrySearch] = useState('');
  const [continentSelect, setContinentSelect] = useState('');
   useEffect(()=> {
    fetch ('https://restcountries.com/v3.1/all')
    .then((response) => (response.json()))
    .then((dataApi)=>{
      setCountriesList(dataApi)
    })
   }, []);


   const renderCountries = () => {
    return countriesList
    .filter((eachCountry)=>
    eachCountry.name.common.toLowerCase().includes(countrySearch.toLowerCase()))
    .map((eachCountry ,i)=> 
    <li className='contact__item' key={i}>
      <p>{eachCountry.flag} </p>
      <p className='contact__name'>{eachCountry.name.common}{eachCountry.name.official}</p>
      <p className='contact__phone'>{eachCountry.capital}</p>
      <p className='contact__mail'>{eachCountry.continents}</p>
    </li>)
   }

   const handleInputSearch = (ev)=>{
    setCountrySearch(ev.target.value)
   }

   const handleForm = (ev) =>{
    ev.preventDefault();
   }

   const handleSelect = (ev) =>{
    setContinentSelect(ev.target.value)
   }

  return (
    <div className='page'>
      <header className='header'>
        <h1 className='header__title'>Country Info App</h1>
        <form onSubmit={handleForm}>
          <label htmlFor='searchCountry'>Search for country:  
            <input
              className='header__search'
              autoComplete='off'
              type='search'
              name='searchCountry'
              placeholder='Spain'
              value = {countrySearch}
              onChange= {handleInputSearch}
            />
          </label>
          <label htmlFor='continent'>
            <select 
              className='header__search'
              type='select'
              name='continents'
              id='continents'
              placeholder='For continent'
              value= {continentSelect}
              onChange={handleSelect}>
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="NorthAmerica">North America</option>
            <option value="SouthAmerica">South America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>

            </select>
          </label>
        </form>
      </header>

      <main>
        <ul className='contact__list'>
         {renderCountries()}
        
        </ul>
        
      </main>
    </div>
  );
}

export default App;
