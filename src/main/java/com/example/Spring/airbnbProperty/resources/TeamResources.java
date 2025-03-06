package com.example.Spring.airbnbProperty.resources;


import com.example.Spring.airbnbProperty.models.Team;
import com.example.Spring.airbnbProperty.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/team")
public class TeamResources {

    private final TeamService service;
    @Autowired
    public TeamResources(TeamService service) {
        this.service = service;
    }


    @PostMapping("/create")
    public Team create(@RequestBody Team team){
        return service.createPlayer(team);

    }

    @GetMapping("/get")
    public Iterable<Team> get(){
        return service.getTeams();

    }


}
