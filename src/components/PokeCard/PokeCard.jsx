import { Link } from 'react-router-dom';
import './PokeCard.css'

function PokeCard(props){
    var name = props.pokemon.name.substr(0,1).toUpperCase() + props.pokemon.name.substr(1);
    var pokeNumber = String(props.pokemon.id).padStart(3, '0');
    return(
        <Link to={`/detail/${props.pokemon.name}`} className="card poke-card border-light mb-3">
            <img className="card-img-top poke-card-img" src={props.pokemon.image} alt="" />
            <div className="card-body poke-body">
                <h3 className="card-title text-center">{name}</h3>
                <p className="card-text text-center">#{pokeNumber}</p>
            </div>
        </Link>
    )
}

export default PokeCard;