package com.example.michel.rest_api;

import com.example.michel.rest_api.models.Item;
import com.example.michel.rest_api.models.Place;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class ItemTest {

    @Test
    public void cloneWithoutPlacesTest() {
        Place place = new Place();
        Item item = new Item();
        item.setPlace(place);

        Assert.assertNull(item.cloneWithoutPlaces().getPlace());
    }
}
