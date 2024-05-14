export default function Card({name, image, id,species,gender}:any){
    return (
    <li>
        <a href="" className="card">
        <img src={image}  className="card__image" alt="" />
        <div className="card__overlay">
            <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
            <img className="card__thumb" src={image} alt="" />
            <div className="card__header-text">
                <h3 className="card__title">{name}</h3>         
            </div>
            </div>
            <p className="card__description">
                Gender: {gender}<br />
                Species: {species}
            </p>
        </div>
        </a>      
    </li>
    )
}