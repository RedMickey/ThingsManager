package com.example.michel.rest_api.models.auxiliary_models.request_body;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequestBody {
    private String searchTmp;
    private int userId;
    private int placeTypeId;
}
