package com.example.michel.rest_api;

import com.example.michel.rest_api.models.Item;
import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.models.auxiliary_models.response_body.ItemWithPlaces;
import com.example.michel.rest_api.repositories.ItemRepository;
import com.example.michel.rest_api.services.ItemService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
public class ItemServiceTest {

    @TestConfiguration
    static class EmployeeServiceImplTestContextConfiguration {

        @Bean
        public ItemService itemService() {
            return new ItemService();
        }
    }

    @Autowired
    private ItemService itemService;

    @MockBean
    private ItemRepository itemRepository;

    private boolean itemWithPlacesComparisonWithItem(Item item, ItemWithPlaces itemWithPlaces) {
        return itemWithPlaces.getItem().getItemName().equals(item.getItemName()) &&
                itemWithPlaces.getPlaces().length == 3 &&
                itemWithPlaces.getPlaces()[2].getPlaceName().equals(item.getPlace().getPlaceName());
    }

    @Test
    public void createItemWithPlacesTest() {
        Place place1 = new Place();
        place1.setPlaceName("place1");
        place1.setIdPlaceType(3);
        Place place2 = new Place();
        place2.setPlaceName("place2");
        place2.setIdPlaceType(2);
        Place place3 = new Place();
        place3.setPlaceName("place3");
        place3.setIdPlaceType(1);

        place1.setOuterPlace(place2);
        place2.setOuterPlace(place3);

        Item item = new Item();
        item.setItemName("item");
        item.setPlace(place1);

        ItemWithPlaces itemWithPlaces = itemService.createItemWithPlaces(item);

        assertThat(itemWithPlacesComparisonWithItem(item, itemWithPlaces));
    }

}
