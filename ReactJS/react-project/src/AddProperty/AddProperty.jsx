import { Link } from "react-router-dom";
import Navbar from "../NavbarFooter/Navbar";
/*import Footer from "../NavbarFooter/Footer";*/
import { useState } from "react";



function AddProperty () {
    const [propertyTitle, setPropertyTitle] = useState('');
    const [propertyDescription, setPropertyDescription] = useState('');
    const [propertyImages, setPropertyImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const[checkboxState,setCheckboxState]=useState([
        {label:'GardenView',checked:false},
        {label:'Kitchen',checked:false},
        {label:'DedicatedWorkspace',checked:false},
        {label:'PetsAllowed',checked:false},
        {label:'Essentials',checked:false},
        {label:'MountainView',checked:false},
        {label:'Wifi',checked:false},
        {label:'CentralAirConditioning',checked:false},
        {label:'FirstAidKit',checked:false}
    ])

    function HandleFile(element){
        const files=Array.from(element.target.files);
        setPropertyImages(prevImages=>[...prevImages,...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
    }
 
  return (
          <>
          <Navbar/>
    
         <div className="container-xl">
           
           <div className="container-xl">
            <h2 className="display-3 mt-5">Hi User!</h2>
            <h5 className="fw-lighter bg-light">Here you can start adding a property by providing details such as the title, description, and uploading images of your property etc... Once you're ready, click the "Submit" button below. </h5>
           </div>
           <div className="container-xl mt-5">
              <form action="">
                <div className="row">
                    <div className="col">
                <div className="mb-5">
                    <label htmlFor="PropertyTitle">Write youre Property name:</label>
                    <input type="text" className="form-control w-50 mt-2" value={propertyTitle} />
                </div>
                <div class="form-floating">
                    <textarea class="form-control w-100 mt-1 me-3" placeholder="Leave a comment here" id="floatingTextarea" value={propertyDescription}></textarea>
                    <label for="floatingTextarea">What makes youre property special😃?</label>
               </div>

               <div className="mb-5 mt-5">
                <label htmlFor="PropertyImages">Add youre property photos:</label>
                <input class="form-control mt-2" type="file" onChange={HandleFile} id="formFileMultiple" multiple value={""}></input>
               </div>
               <div className="form-group">
                   <strong>Uploaded photos:</strong>
                   <ul>
                    {propertyImages.map((file,index)=>(<img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="img-fluid rounded m-1 w-25 img-thumbnail" />))}
                   </ul>
               </div>

               </div>
                <div className="col ms-5">
                <h5 className="fw-lighter mb-3">What does youre place offers:</h5>
                    <div className="row">
                        <div className="col">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="GardenView"/>
                      <label class="form-check-label mb-1" for="GardenView">
                      Garden view
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="Kitchen"/>
                      <label class="form-check-label mb-1" for="Kitchen">
                      Kitchen
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="DedicatedWorkspace"/>
                      <label class="form-check-label mb-1" for="DedicatedWorkspace">
                      Dedicated workspace
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="PetsAllowed"/>
                      <label class="form-check-label mb-1" for="PetsAllowed">
                      Pets allowed
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="Essentials"/>
                      <label class="form-check-label mb-1" for="Essentials">
                      Essentials
                      </label>
                   </div>
                   </div>
                   <div className="col">
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="MountainView"/>
                      <label class="form-check-label mb-1" for="MountainView">
                      Mountain view
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="Wifi"/>
                      <label class="form-check-label mb-1" for="Wifi">
                      Wifi
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="FreeParking"/>
                      <label class="form-check-label mb-1" for="FreeParking">
                      Free parking
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="CentralAirConditioning"/>
                      <label class="form-check-label mb-1" for="CentralAirConditioning">
                      Central air conditioning
                      </label>
                   </div>
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={checkboxState} id="FirstAidKit"/>
                      <label class="form-check-label mb-1" for="FirstAidKit">
                      First aid kit
                      </label>
                   </div>
                   </div>
                </div>
                </div>
               </div>
              </form>
           </div>
         </div>
        
         </>
 
  );
}

export default AddProperty;
/*<li key={index}>{file.name}</li>*/ 