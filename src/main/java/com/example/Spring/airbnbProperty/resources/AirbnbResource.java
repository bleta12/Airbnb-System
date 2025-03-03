package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.CreateProperty;
import com.example.Spring.airbnbProperty.models.dtos.GetAirBnbPropertiesRequest;
import com.example.Spring.airbnbProperty.services.AirbnbService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/properties")
public class AirbnbResource {
    // get delete insert
    private final AirbnbService service;

    @Autowired
    public AirbnbResource(AirbnbService service) {
        this.service = service;
    }

    @PostMapping(value="/insert",consumes ="application/json")
    public AirbnbProperty insertOne(@RequestBody CreateProperty airbnbProperty) throws BadRequestException {
        return service.insertOne(airbnbProperty);
    }

    @GetMapping("/get")
    public Iterable<AirbnbProperty> getAll() {
        return service.getOne();
    }

    @GetMapping("/getByFilters")
    public Iterable<AirbnbProperty> getAirbnbPropertyWithFilters( GetAirBnbPropertiesRequest request) throws BadRequestException {
        if(request == null){
        return  getAll();
        }else {
        return service.getAirbnbPropertyWithFilters(request);
    }}

    @GetMapping("/search")
    public List<AirbnbProperty> search(@RequestParam String keyword){
      return  service.search(keyword);
    }

    @GetMapping("/getById")
    public AirbnbProperty getById(@RequestParam int id){
        return  service.getById(id);
    }


    @GetMapping("/getByUserId")
    public List<AirbnbProperty> getByUserId(@RequestParam long id){
        return  service.getByUserId(id);
    }


    @PutMapping(value = "/editProperty",consumes ="application/json")
    public AirbnbProperty editProperty(@RequestBody AirbnbProperty property)  {
        return service.editProperty(property);
    }

    @DeleteMapping("/deleteProperty")
    public void deleteProperty(@RequestParam int id){
         service.delete(id);
    }


    @GetMapping("/paged")
    public Iterable<AirbnbProperty> getAllProductsPaged(@RequestParam int page, @RequestParam int size) {
        return service.findAllProductsPagedAndSorted(page, size);
    }

}


