package com.example.Spring.airbnbProperty.resources;


import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.Universiteti;
import com.example.Spring.airbnbProperty.services.UniversitetiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/uni")
public class UniversitetiResource {

    private final UniversitetiService service;

   @Autowired
    public UniversitetiResource(UniversitetiService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public Universiteti create(@RequestBody Universiteti universiteti){
        return service.createUniversiteti(universiteti);

    }

    @GetMapping("/get")
    public Iterable<Universiteti> get(){
        return service.getUniversiteti();

    }

    @PutMapping("/edit/{id}")
    public Universiteti updateUni(@PathVariable int id, @RequestBody Universiteti updatedUni) {
        return service.editUni(id,updatedUni);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteUni(@PathVariable int id) throws UserNotFoundException {
        service.deleteUni(id);
    }

    @GetMapping("/getById/{id}")
    public Universiteti getUni(@PathVariable int id) {
        return service.getUniById(id);
    }
}
