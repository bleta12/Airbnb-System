
import Navbar from "../NavbarFooter/Navbar";
/*import Footer from "../NavbarFooter/Footer";*/
import { useState,useRef } from "react";
import axios from 'axios';
import { imageDb } from "./Config";
import {getDownloadURL,ref, uploadBytes } from "firebase/storage";
import {v4} from "uuid";


function AddProperty () {
    
    const [name, setPropertyTitle] = useState('');
    const [imgUrl,setImgUrl] =useState([])
    const [description, setPropertyDescription] = useState('');
    const [price, setPrice] = useState('');
    const [propertyImages, setPropertyImages] = useState([]);
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
    const[erroriServer,setErroriServer]=useState('');
    const fileInputRef = useRef(null);
  

    const [validationErrorName,setValidationErrorName]=useState('');
    const [validationErrorDescription,setValidationErrorDescription]=useState('');
    const [validationErrorCheck,setValidationErrorCheck]=useState('');
    const [validationErrorPrice,setValidationErrorPrice]=useState('');
    const [fileError,setFileError]=useState('');
    
    const validation = () => {
      // Reset error states
      setValidationErrorName('');
      setValidationErrorDescription('');
      setValidationErrorCheck('');
      setValidationErrorPrice('');
      setFileError('');
  
      // Perform validation
      let hasError = false;
  
      if (name.length === 0) {
          setValidationErrorName("Property name must be supplied!");
          hasError = true;
      } else if (description.length === 0) {
          setValidationErrorDescription("Description must be supplied");
          hasError = true;
      } else if (checkboxState.every(item => !item.checked)) {
          setValidationErrorCheck("Some Property attribute must be supplied");
          hasError = true;
      } else if (isNaN(price) || price.length === 0) {
          setValidationErrorPrice("Adult price must be supplied and it should be a number");
          hasError = true;
      }
  
      if (propertyImages === null || Array.from(propertyImages).length !== 5) {
          setFileError("Images are not properly set!");
          hasError = true;
      }
  
      // Return whether there are any errors
      return hasError;
  };
  

    
const handleSubmit = async (event) => {
  event.preventDefault();
  const hasError = validation();
  console.log("erdhi ketu + " + hasError);
  if(hasError===false){
    try {      
      const filesToUpload = Array.from(propertyImages);
            const uploadPromises = filesToUpload.map(file => {
                const imgRef = ref(imageDb, `files/${v4()}`);
                return uploadBytes(imgRef, file).then(value => {
                    console.log(value);
                    return getDownloadURL(value.ref);
                });
            });

            
          const uploadedUrls = await Promise.all(uploadPromises);
          setImgUrl(uploadedUrls); 
            const response = await axios.post('http://localhost:8080/api/properties/insert', {
                "airbnbProperty": {
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
                    
                },
                "propertyImage": {"photo1": uploadedUrls[0],
                                  "photo2": uploadedUrls[1],
                                   "photo3":uploadedUrls[2],
                                   "photo4":uploadedUrls[3],
                                   "photo5":uploadedUrls[4]} 
                              
            });

            console.log("Response:", response.data);
            console.log("Submitting form data...");
            console.log("Name:", name);
            console.log("Description:", description);
            console.log("Checkbox State:", checkboxState);
            setPropertyTitle('');
            setPropertyDescription('');
            setPrice('');
            setCheckboxState(checkboxState.map((item) => ({ ...item, checked: false })));
          setImgUrl([]);
          setErroriServer('');
          setFileError('');
          if (fileInputRef.current) {
            fileInputRef.current.value = null; 
          }
} catch (error) {
    console.error(error);
    setErroriServer(error.response.data.message);
    
}
  }else{
   console.log("finished!");
  }
 
};



  const handleCheckboxChange = (label)=>{
    setCheckboxState(prevState =>
      prevState.map(item =>
        item.label === label ? { ...item, checked: !item.checked } : item
      )
    )
  }


 
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
            <div id="carouselExampleFade" class="carousel slide carousel-fade col" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="3000">
      <img src={require("./23.jpg")}  style={{height:'400px'}} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require("./home.jpg")}  style={{height:'400px'}} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require("./55.jpg")}  style={{height:'400px'}} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require("./44.jpg")}  style={{height:'400px'}}class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={require("./5.jpg")}style={{height:'400px'}}class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
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
                    <label htmlFor="PropertyTitle">Write your Property name:</label> 
                    <input type="text" id="PropertyTitle" className="form-control w-50 mt-2" name="propertyTitle" value={name}  onChange={(e) => setPropertyTitle(e.target.value)} />
                    <p className="fst-italic text-danger">{validationErrorName}</p>
                </div>
                <div class="form-floating">
                    <textarea class="form-control w-100 mt-1 me-3" placeholder="Leave a comment here" id="floatingTextarea" value={description}  onChange={(e) => setPropertyDescription(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea" className="container-fluid">What makes your property special😃?</label>
                    <p className="fst-italic text-danger">{validationErrorDescription}</p>
               </div>

               <div className="mb-5 mt-5">
                <label htmlFor="formFileMultiple" class="form-label">Add your property photo <br /> <p className="fst-italic">"You can add up to 5 photos, no less or more:"</p></label>
                <input class="form-control mt-2"ref={fileInputRef} type="file" onChange={(e)=>setPropertyImages(e.target.files)} id="formFileMultiple" multiple></input>
                <p className="fst-italic text-danger">{fileError}</p>
               </div>
  

               </div>
                <div className="col ms-5">
                <h5 className="fw-lighter mb-3">What does your place offers:</h5>
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
                <p className="fst-italic text-danger">{validationErrorCheck}</p>
                </div>
                
               


               <div className="col">
                  <label htmlFor="Price">How much does your property cost per?</label>
                  <div class="input-group" style={{width:'200px'}}>
                   <input type="text" id="Price" class="form-control float-end text-end" aria-label="Dollar amount (with dot and two decimal places)"value={price}  onChange={(e) => setPrice(e.target.value)}/>
                   <span class="input-group-text">.00</span>
                   <span class="input-group-text">€</span>
                   <p className="fst-italic text-danger">{validationErrorPrice}</p>
                </div>
                
                <br /><br />
               </div>
                 
             


               </div>
               <p className="fst-italic text-danger">{erroriServer}</p>
               <div className="me-5 mb-5 text-sm-end">
           <button className="btn-primary btn btn-lg rounded-pill" type="submit">Submit</button>
           </div>
              </form>
           </div>
         </div>
       
        
         </>
 
  );
}

export default AddProperty;
