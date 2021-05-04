import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';

const client = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  index = client.initIndex('foods');

  loading: boolean;
  constructor() {}
}
