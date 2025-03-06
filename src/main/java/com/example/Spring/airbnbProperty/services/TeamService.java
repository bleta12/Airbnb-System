package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.Team;
import com.example.Spring.airbnbProperty.repository.TeamRepoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService {


    private final TeamRepoInterface repo;
    @Autowired
    public TeamService(TeamRepoInterface repo) {
        this.repo = repo;
    }



    public Team createPlayer(Team team) {
        return repo.save(team);
    }

    public Iterable<Team> getTeams(){
        return repo.findAll();
    }

}
