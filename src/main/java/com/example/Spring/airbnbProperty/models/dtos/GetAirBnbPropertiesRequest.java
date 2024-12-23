package com.example.Spring.airbnbProperty.models.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetAirBnbPropertiesRequest {
    private Boolean GardenView;
    private Boolean Kitchen;
    private Boolean DedicatedWorkspace;
    private Boolean PetsAllowed;
    private Boolean Essentials;
    private Boolean MountainView;
    private Boolean Wifi;
    private Boolean FreeParking;
    private Boolean CentralAirConditioning;
    private Boolean FirstAidKit;

}
