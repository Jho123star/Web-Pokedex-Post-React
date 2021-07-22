import { gql, useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../../components/PokeCard/PokeCard";
import './FavoritePage.css'

function FavoritePage() {
    const [favArr, setFavArr] = useState([localStorage.getItem("fav")]);
    const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
            url
            id
            name
            image
        }
        }
    }
    `;

    const gqlVariables = {
        limit: 151,
        offset: 0,
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

    let arr = JSON.parse("[" + favArr + "]");
    const pokemons = data.pokemons.results.filter(pokemon => arr.includes(pokemon.id));

    const favoriteBtn = (e) => {
        if (favArr !== null) {
            if (arr.includes(e)) {
                console.log(e);
                let ind = arr.indexOf(e);
                arr.splice(ind, 1);
                localStorage.setItem("fav", arr);
                setFavArr(arr);
            }
        }
    }

    var elem;

    elem = pokemons?.map(
        pokemon => {
            return (
                <div className="d-flex flex-column m-3 align-items-center" key={pokemon.id}>
                    <PokeCard pokemon={pokemon}></PokeCard>
                    <div className="rem-fav-btn" id="fav" onClick={() => favoriteBtn(pokemon.id)}>Remove From Favourites</div>
                </div>
            );
        }
    );

    if(pokemons.length === 0){
        elem = <h3 className="text-center text-justify m-5">Find your favourites pokemon <Link to="/">here</Link></h3>      
    }

    return (
        <div className="pokemon-list-container">
            {elem}
        </div>
    );
}
export default FavoritePage;