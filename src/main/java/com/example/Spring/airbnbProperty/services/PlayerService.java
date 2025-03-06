package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.Player;
import com.example.Spring.airbnbProperty.models.Team;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.repository.PlayerRepoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PlayerService {



    private final PlayerRepoInterface repo;
    @Autowired
    public PlayerService(PlayerRepoInterface repo) {
        this.repo = repo;
    }

    public Player createPlayer(Player player) {
      return repo.save(player);
    }


    public Player editPlayer(int id,Player p){

        Player player = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player not found"));

          player.setName(p.getName());
          player.setNumber(p.getNumber());
          player.setBirthYear(p.getBirthYear());
          player.getTeam().setName(p.getTeam().getName());

       return    repo.save(player);
    }



    public Player getById(int id){

        return repo.findById(id)
               .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Iterable<Player> getPlayers(){
        return repo.findAll();
    }
}
