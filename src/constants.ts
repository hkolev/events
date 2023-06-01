import { pageLinks } from "./types/Routes";

export const CLIENT_ID = 'MzM5NjY1Nzh8MTY4NTI4Nzk5MS41Njg5Mjcz';
export const CLIENT_SECRET = '57da45570cb82826ab28f55e47d5f25b18166bd797cd150c50557b5b15b84857'

export const DOMAIN = 'https://api.seatgeek.com/2';

export const NAVIGATION = [
    {
        id: 1,
        name: 'Home',
        url: pageLinks.home
    },
    {
        id: 2,
        name: 'Create Event',
        url: pageLinks.create
    },
    {
        id: 3,
        name: 'Wishlist',
        url: pageLinks.wishlist,
        withMeta: true
    }
]
