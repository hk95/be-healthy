import { Injectable } from '@angular/core';
const algoliasearch = require('algoliasearch');
import { environment } from 'src/environments/environment';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  config = {
    indexName: 'foods',
    searchClient,
  };
  constructor() {}
}
