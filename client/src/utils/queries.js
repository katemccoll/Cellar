import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            _id
            firstName
            lastName
            email
            wines {
                _id
                wineryName
                wineType
                description
                image
                rating
                createdAt
            }
        }  
    }
   
`;

export const QUERY_WINES = gql`
    query getWines {
        wines {
            _id
            wineryName
            wineType
            description
            image
            rating
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
            createdAt
        }
    }
`;
