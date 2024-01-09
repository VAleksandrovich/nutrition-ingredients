export const Nutrition = (
    {label , quantity, unit }) => {
    return ( 

        <div className="container">
            <p> <b> {label} </b> -  {quantity.toFixed(2)} <b> {unit} </b> </p>
            </div> 
        
    )
}