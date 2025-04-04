package com.example.Spring.airbnbProperty.resources;


import com.example.Spring.airbnbProperty.models.Drejtimi;
import com.example.Spring.airbnbProperty.models.Player;
import com.example.Spring.airbnbProperty.models.Universiteti;
import com.example.Spring.airbnbProperty.services.DrejtimiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/drejtimi")
public class DrejtimiResource {

    private final DrejtimiService service;

    @Autowired
    public DrejtimiResource(DrejtimiService service) {
        this.service = service;
    }


    @PostMapping("/create")
    public Drejtimi create(@RequestBody Drejtimi drejtimi){
        return service.createDrejtimi(drejtimi);

    }

    @GetMapping("/get")
    public Iterable<Drejtimi> get(){
        return service.getDrejtimi();

    }


}
