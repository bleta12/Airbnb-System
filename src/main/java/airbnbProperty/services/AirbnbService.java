package airbnbProperty.services;

import airbnbProperty.models.AirbnbProperty;
import airbnbProperty.repository.AirbnbRepository;
import org.apache.coyote.BadRequestException;

public class AirbnbService {
    AirbnbRepository repository = new AirbnbRepository();

    // get insert delete
    public AirbnbProperty insertOne(AirbnbProperty airbnbProperty) throws BadRequestException {
        if(airbnbProperty.getName() == null){
            throw new BadRequestException("Name must be supplied!");
        }
        return repository.insertOne(airbnbProperty);
    }
}
