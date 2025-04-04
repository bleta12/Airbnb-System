package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.Player;
import com.example.Spring.airbnbProperty.models.Universiteti;
import com.example.Spring.airbnbProperty.repository.UniversitetiRepoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UniversitetiService {


    private final UniversitetiRepoInterface repo;

  @Autowired
    public UniversitetiService(UniversitetiRepoInterface repo) {
        this.repo = repo;
    }

    public Universiteti createUniversiteti(Universiteti universiteti) {
      return repo.save(universiteti);
    }

    public Iterable<Universiteti> getUniversiteti() {
      return repo.findAll();
    }

  public Universiteti editUni(int id, Universiteti updatedUni) {
    Universiteti uni = repo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Player not found"));

    uni.setName(updatedUni.getName());
    uni.setCity(updatedUni.getCity());


    return    repo.save(uni);
  }


  public void deleteUni(int id) throws UserNotFoundException {
    if (repo.existsById(id)) {
      repo.deleteById(id);
    } else {
      throw new UserNotFoundException("Uni not found with id: " + id);
    }
  }


  public Universiteti getUniById(int id) {
    Universiteti uni = repo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Player not found"));
    return uni;
  }
}
