import { gql, useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import PokeType from "../../components/PokeType/PokeType";
import './DetailPage.css'

function DetailPage() {
  const [favArr, setFavArr] = useState(localStorage.getItem("fav"));
  let { pokeName } = useParams();
  pokeName = pokeName.toLowerCase();
  const GET_POKEMONS = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          height
          weight
          sprites{
            front_default
          }
          types {
            type {
              id
              name
            }
          }
        }
      }
    `;

  const gqlVariables = {
    name: pokeName,
  };
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const pokemon = data.pokemon;
  
  const favoriteBtn = () => {
    if(favArr !== null){
      let arr = JSON.parse("[" + favArr + "]");
      if(favArr.includes(pokemon.id)){
        let ind = arr.indexOf(pokemon.id);
        arr.splice(ind,1);
        localStorage.setItem("fav",arr);
        setFavArr(arr);
      }else{
        arr.push(pokemon.id);
      }
      localStorage.setItem("fav",arr);
      setFavArr(arr);
    }else{
      let arr = [];
      arr.push(pokemon.id);
      localStorage.setItem("fav",arr);
      setFavArr(arr);
    } 
  }

  var favbtn;
  if(favArr !== null && favArr.includes(pokemon.id)){
    favbtn = <span className="fav-btn" id="fav" onClick={favoriteBtn}>Remove From Favourites</span>
  }  else{
    favbtn = <span className="fav-btn" id="fav" onClick={favoriteBtn}>Add To Favourites</span>
  }

  var name = data.pokemon.name.substr(0, 1).toUpperCase() + data.pokemon.name.substr(1);
  var pokeNumber = String(data.pokemon.id).padStart(3, '0');
  return (
    <Fragment>
    <div className="pokemon-detail-container container d-flex justify-content-center">
      <div className="row m-5">
        <div className="col-lg-2 col-md-3 col-sm-6 col-xs-12 poke-image d-flex justify-content-center align-items-center p-4">
          <img src={pokemon.sprites.front_default} alt="" className="img-thumbnail w-75 h-100"/>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 poke-desc">
          <h2 className="">{name}</h2>
          <h6>Pokedex Number : #{pokeNumber}</h6>
          <h6>Weight : {pokemon.weight/10}kg</h6>
          <h6>Height : {pokemon.height*10}cm</h6>
          <h3 className="">Types:</h3>
          <div>
            {pokemon.types?.map(
                  t => {
                      return (
                          <PokeType key={t.type.name} attr={t.type.name}></PokeType>
                      );
                  }
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="d-flex justify-content-center">
      {favbtn}
    </div>  
    </Fragment>
    
  );
}

export default DetailPage;