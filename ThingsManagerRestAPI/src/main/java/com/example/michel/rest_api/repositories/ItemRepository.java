package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.Item;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Integer> {

    List<Item> findAllByIdUser(Integer userId);

    Item getByIdItemAndIdUser(Integer itemId, Integer userId);

}
