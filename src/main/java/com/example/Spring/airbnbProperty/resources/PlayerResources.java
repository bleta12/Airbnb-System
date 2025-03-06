package com.example.Spring.airbnbProperty.resources;


import com.example.Spring.airbnbProperty.models.Player;
import com.example.Spring.airbnbProperty.models.ReviewProperty;
import com.example.Spring.airbnbProperty.models.Team;
import com.example.Spring.airbnbProperty.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/player")
public class PlayerResources {

    private final PlayerService service;

    @Autowired
    public PlayerResources(PlayerService service) {
        this.service = service;
    }


    @PostMapping("/create")
    public Player create(@RequestBody Player player){
        return service.createPlayer(player);

    }

    @PutMapping("/edit/{id}")
    public Player updatePlayer(@PathVariable int id, @RequestBody Player updatedPlayer) {
        return service.editPlayer(id,updatedPlayer);
    }

    @GetMapping("/{id}")
    public Player getById(@PathVariable int id) {
        return service.getById(id);
    }


    @GetMapping("/get")
    public Iterable<Player> get(){
        return service.getPlayers();

    }
}
