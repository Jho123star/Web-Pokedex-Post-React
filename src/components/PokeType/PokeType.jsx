function PokeType(props){
    const type = props.attr.substr(0, 1).toUpperCase() +props.attr.substr(1);
    return (
        <div className="poke-type">
            {type}
        </div>
    );
}

export default PokeType;