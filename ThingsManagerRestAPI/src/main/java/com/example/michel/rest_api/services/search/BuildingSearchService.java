package com.example.michel.rest_api.services.search;

import com.example.michel.rest_api.models.FullPlace;
import com.example.michel.rest_api.models.Place;
import org.apache.lucene.search.Query;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.search.engine.ProjectionConstants;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuildingSearchService {

    private final EntityManager centityManager;

    @Autowired
    public BuildingSearchService(final EntityManagerFactory entityManagerFactory) {
        super();
        this.centityManager = entityManagerFactory.createEntityManager();
    }

    @PostConstruct
    public void initializeBuildingSearchService() {
        try {
            FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(centityManager);
            fullTextEntityManager.createIndexer().startAndWait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public List<FullPlace> fuzzySearch(String searchTerm, int userId, int placeTypeId) {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(centityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(FullPlace.class).get();
        Query luceneQuery = qb.keyword().fuzzy().withEditDistanceUpTo(2).withPrefixLength(0).onFields("placeName")
                .matching(searchTerm).createQuery();

        CriteriaBuilder criteriaBuilder = fullTextEntityManager.getCriteriaBuilder();

        javax.persistence.Query jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, FullPlace.class);

        // execute search

        List<FullPlace> placeList = null;
        try {
            placeList = jpaQuery.getResultList();
        } catch (NoResultException nre) {
            nre.printStackTrace();
        }

        return placeList.stream().filter(place -> place.getIdPlaceType() == placeTypeId && place.getIdUser() == userId).collect(Collectors.toList());
    }
}
