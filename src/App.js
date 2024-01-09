import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { LoaderPage } from './LoaderPage';
import { Nutrition } from './Nutrition';
import video from './food.mp4';
import Swal from 'sweetalert2';




function App() {

const [mySearch, setMySearch] = useState ();
const [wordSubmit, setWordSubmit] = useState ("");
const [myNutrition, setMyNutrition] = useState ();
const [stateLoader, setStateLoader]=useState (false);


const API_ID = "824e08bc";
const API_KEY = "63ae6ad23d10fb956e8b2d6ab42420a0";
const API_URL = "https://api.edamam.com/api/nutrition-details";

const fetchData = async (ingr) => {
  setStateLoader(true);

  const response = await fetch(`${API_URL}?app_id=${API_ID}&app_key=${API_KEY}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingr: ingr })
  })

  if(response.ok) {
    setStateLoader(false);
    const data = await response.json();
    console.log (data);
    setMyNutrition(data);
  } else {
    setStateLoader(false);
    Swal.fire("Ingredients entered not correctly!");;
  }
}
useEffect(() => {
  if (wordSubmit !== '') {
    let ingr = wordSubmit.split(/[,,;,\n,\r]/);
    fetchData(ingr);
  }
}, [wordSubmit])

const finalSearch= e => {
e.preventDefault();
setWordSubmit(mySearch);
}

const myRecipeSearch = e => {
  setMySearch (e.target.value);
}


return (
  <div className='App'>

<div className='container'>
    <video autoPlay muted loop>
      < source src={video} type='video/mp4'/>
    </video>
    <h1>Nutrition Analysis</h1>
    </div>

  
    <div className='container'>
    <form onSubmit={finalSearch}>
      <input className='search'
        placeholder="Enter..."
        onChange={myRecipeSearch}
      />
    </form>
    </div>

    <div className='container'>
       <button onClick={finalSearch} className="button-53"  type="submit" >Search</button>
    </div>
    
  <div className='container'>
      {
        myNutrition && <p> Total calories: {myNutrition.calories} kcal</p>
      }
</div>
      
      {
        myNutrition && Object.values(myNutrition.totalNutrients)
          .map(({label, quantity, unit }) =>
            <Nutrition
              label= {label}
              quantity= {quantity}
              unit = {unit}
            />
          )
      }

<div className="container">
{stateLoader && <LoaderPage />}
</div>
    </div>
 
 
);
}

export default App;