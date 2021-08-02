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
                wineName
                wineType
                wineText
                createdAt
            }
        }  
    }
   
`;

export const QUERY_WINES = gql`
    query getWInes {
        wines {
            _id
            wineName
            wineType
            wineText
            createdAt
        }
    }
`;

export const QUERY_SINGLE_WINE = gql`
    query getSingleWine($wineID: ID!) {
        wine(wineId: $wineId) {
            _id
            wineName
            wineType
            wineText
            createdAt
        }
    }
`;

