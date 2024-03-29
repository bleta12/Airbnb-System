package airbnbProperty.resources;

import airbnbProperty.models.AirbnbProperty;
import airbnbProperty.services.AirbnbService;
import org.apache.coyote.BadRequestException;

public class AirbnbResource {
    // get delete insert 
    AirbnbService service = new AirbnbService();

    // get insert delete
    public AirbnbProperty insertOne(AirbnbProperty airbnbProperty) throws BadRequestException {
        return service.insertOne(airbnbProperty);
    }
}
