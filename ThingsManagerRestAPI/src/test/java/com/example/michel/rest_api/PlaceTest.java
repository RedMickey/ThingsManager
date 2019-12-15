package com.example.michel.rest_api;

import com.example.michel.rest_api.models.Item;
import com.example.michel.rest_api.models.Place;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class PlaceTest {

    @Test
    public void cloneWithoutOuterPlacesTest() {
        Place place1 = new Place();
        Place place2 = new Place();

        place1.setOuterPlace(place2);

        Assert.assertNull(place1.cloneWithoutOuterPlaces().getOuterPlace());
    }
}
