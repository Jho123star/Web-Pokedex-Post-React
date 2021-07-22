import { gql, useQuery } from "@apollo/client";
import PokeCard from "../../components/PokeCard/PokeCard";

function ListPage() {
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

    const pokemons = data.pokemons.results;

    return (
        <div className="pokemon-list-container">
            {pokemons?.map(
                pokemon => {
                    return (
                        <PokeCard pokemon={pokemon} key={pokemon.id}></PokeCard>
                    );
                }
            )}
        </div>
    );
}

export default ListPage;