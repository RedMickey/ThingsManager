package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer> {
}
