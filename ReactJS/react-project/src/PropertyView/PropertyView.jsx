const PropertyView = () => {
    return ( 
        <>
        <p className="display-5 text-success ps-5 ms-5 mt-3">Hi from propertyview</p>
         

         <div className="container-xl my-5">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Reprehenderit eum, veritatis hic expedita repellendus 
            sapiente? Expedita, id facilis obcaecati non aspernatur repellat,
             excepturi eum eligendi ut tenetur, fuga adipisci deserunt?</p>
         </div>

         <div className="container my-5">
            <div className="row">
                <div className="col-5 bg-success me-2 ms-2">Div 1</div>
                <div className="col-2 bg-primary me-2">Div 2</div>
                <div className="col-2 bg-danger me-2">Div 3</div>
                <div className="col-2 bg-secondary me-2">Div 4</div>
            </div>
         </div>
        
        </>
     );
}
 
export default PropertyView;