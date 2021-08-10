import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            _id
            firstName
            lastName
            email
        }  
    }
   
`;

export const QUERY_WINES = gql`
    query getWines($filters: WineFilters) {
        wines(filters: $filters) {
            _id
            wineryName
            wineType
            description
            image
            rating
            region
            year
            createdAt
        }
        
    }
`;

export const QUERY_SINGLE_WINE = gql`
    query getSingleWine($wineId: ID!) {
        wine(wineId: $wineId) {
            _id
            wineryName
            wineType
            description
            image
            rating
            region
            year
            createdAt
        }
    }
`;
