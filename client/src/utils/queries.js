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
                wineImage
                createdAt
            }
        }  
    }
   
`;

export const QUERY_CATEGORIES = gql `
    {
        categories {
        _id
        name
    }
`

export const QUERY_WINES = gql`
    query getWines($category: ID) {
        wines(category: $category) {
            _id
            wineName
            wineType
            wineText
            wineImage
            createdAt
            category {
                _id
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

export const QUERY_ALL_WINES = gql`
    {
        wines {
            _id
            wineName
            wineType
            wineText
            wineImage
            createdAt
            category {
                name
        }
    }
`

