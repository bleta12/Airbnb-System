
import Navbar from "../NavbarFooter/Navbar";
/*import Footer from "../NavbarFooter/Footer";*/
import { useState } from "react";
import axios from 'axios';



function AddProperty () {
    
    const [name, setPropertyTitle] = useState('');
    const [description, setPropertyDescription] = useState('');
    const [propertyImages, setPropertyImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const[checkboxState,setCheckboxState]=useState([
        {label:'Garden View',checked:false},
        {label:'Kitchen',checked:false},
        {label:'Dedicated Workspace',checked:false},
        {label:'Pets Allowed',checked:false},
        {label:'Essentials',checked:false},
        {label:'Mountain View',checked:false},
        {label:'Wifi',checked:false},
        {label:'Free Parking',checked:false},
        {label:'Central Air Conditioning',checked:false},
        {label:'First AidKit',checked:false}
    ])

    function HandleFile(element){
        const files=Array.from(element.target.files);
        setPropertyImages(prevImages=>[...prevImages,...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
    }
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/api/properties/insert', {
              name: name,
              description: description,
              ...checkboxState.reduce((acc, checkbox) => {
                  if (checkbox.checked) {
                    const word = checkbox.label.replace(/\s+/g, '');
                    const formattedWord = word.charAt(0).toLowerCase() + word.slice(1); 
                    acc[formattedWord] = checkbox.checked;
                  }
                  return acc;
              }, {})
          });
          console.log("Response:", response.data);
          console.log("Submitting form data...");
          console.log("Name:", name);
          console.log("Description:", description);
          console.log("Checkbox State:", checkboxState);
      
      } catch (error) {
          console.error(error);
      }
  };


  const handleCheckboxChange = (label)=>{
    setCheckboxState(prevState =>
      prevState.map(item =>
        item.label === label ? { ...item, checked: !item.checked } : item
      )
    )
  }
 /* console.log("Updated checkbox state:", checkboxState); */


  

   
 
  return (
          <>
          <Navbar/>
    
         <div className="container-xl">
           
           <div className="container-xl">
            <div className="row mt-5">
               <div className="col">
            <h2 className="display-3 mt-5">Hi User!</h2>
            <h5 className="fw-lighter bg-light">Here you can start adding a property by providing details such as the title, description, and uploading images of your property etc... Once you're ready, click the "Submit" button below. </h5>
            </div>
            
         <div id="carouselExampleInterval" class="carousel slide col "style={{height:'400px'}} data-bs-ride="carousel">
  <div class="carousel-inner ">
    <div class="carousel-item active" data-bs-interval="3000">
      <img src={require("./23.jpg")}  style={{height:'400px'}} class="d-block w-100 rounded" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require("./home.jpg")}  style={{height:'400px'}}class="d-block w-100 rounded" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require("./55.jpg")}  style={{height:'400px'}}class="d-block w-100 rounded" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require("./44.jpg")}  style={{height:'400px'}}class="d-block w-100 rounded" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={require("./5.jpg")}  style={{height:'400px'}} class="d-block w-100 rounded" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>





          
            
           </div>
           <div className="container-xl mt-5">
              <form action="" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                <div className="mb-5">
                    <label htmlFor="PropertyTitle">Write youre Property name:</label> 
                    <input type="text" id="PropertyTitle" className="form-control w-50 mt-2" name="propertyTitle" value={name}  onChange={(e) => setPropertyTitle(e.target.value)} />
                </div>
                <div class="form-floating">
                    <textarea class="form-control w-100 mt-1 me-3" placeholder="Leave a comment here" id="floatingTextarea" value={description}  onChange={(e) => setPropertyDescription(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea" className="container-fluid">What makes youre property special😃?</label>
               </div>

               <div className="mb-5 mt-5">
                <label htmlFor="formFileMultiple">Add youre property photos:</label>
                <input class="form-control mt-2" type="file" onChange={HandleFile} id="formFileMultiple" multiple value={""}></input>
               </div>
               <div className="form-group">
                   <strong>Uploaded photos:</strong>
                   <ul>
                    {propertyImages.map((file,index)=>(<img src={URL.createObjectURL(file)} alt="Property Image" className="img-fluid rounded m-1 w-25 img-thumbnail" />))}
                   </ul>
               </div>

               </div>
                <div className="col ms-5">
                <h5 className="fw-lighter mb-3">What does youre place offers:</h5>
                  <div className="form-check">
                     {checkboxState.map(({ checked, label }) => (
                   <div key={label} className="form-check">
                     <input
                       className="form-check-input"
                       type="checkbox"
                       checked={checked}
                       value={label}
                       id={label}
                       onChange={() => handleCheckboxChange(label)}
                     />
                     <label className="form-check-label" htmlFor={label}>
                       {label}                   
                     </label>
                   </div>
                 ))}
                </div>
                </div>
                
               


               <div className="col">
                  <label htmlFor="Price">How much does youre property cost per night?</label>
                  <div class="input-group" style={{width:'200px'}}>
                   <input type="text" id="Price" class="form-control float-end text-end" aria-label="Dollar amount (with dot and two decimal places)"/>
                   <span class="input-group-text">.00</span>
                   <span class="input-group-text">€</span>
                </div>
               </div>
                 
             


               </div>
               <button type="submit">Submit</button>
              </form>
           </div>
         </div>
        
         </>
 
  );
}

export default AddProperty;
/*<li key={index}>{file.name}</li>*/ 