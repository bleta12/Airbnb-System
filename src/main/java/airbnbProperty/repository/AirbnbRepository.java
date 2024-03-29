package airbnbProperty.repository;

import airbnbProperty.models.AirbnbProperty;

import java.util.ArrayList;
import java.util.List;

public class AirbnbRepository {
    //zavendso me databaze kur te konfigurojsh databazen
    List<AirbnbProperty> airbnbPropertyList = new ArrayList<>();
    //insert
    //get
    //delete
    //updates
    public AirbnbProperty insertOne(AirbnbProperty airbnbProperty){
        airbnbPropertyList.add(airbnbProperty);
        return airbnbProperty;
    }


}
