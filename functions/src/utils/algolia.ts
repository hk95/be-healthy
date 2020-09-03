import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

const config = functions.config();
const client = algoliasearch(config.algolia.app_id, config.algolia.secret_key);

export class Algolia {
  async saveRecord(
    indexName: string,
    data: any,
    id: string,
    isUpdate?: boolean
  ) {
    const index = client.initIndex(indexName);
    const item = data;

    if (isUpdate) {
      await this.removeRecord(indexName, id);
    }
    item.objectID = id;
    return index.saveObject(item);
  }

  removeRecord(indexName: string, id: string) {
    const index = client.initIndex(indexName);
    return index.deleteObject(id);
  }
}
