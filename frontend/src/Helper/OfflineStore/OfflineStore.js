import React from "react";
import { IndexedDB } from 'react-indexed-db';
function OfflineStoreProvider(props) {
  return (
    <IndexedDB
      name="offlineDB"
      version={1}
      objectStoresMeta={[
        {
          store: 'workOrderLog',
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'dbId', keypath: 'dbId', options: { unique: false } },
            { name: 'workOrderConfigId', keypath: 'workOrderConfigId', options: { unique: false } },
            { name: 'creationDate', keypath: 'creationDate', options: { unique: false } },
            { name: 'updateDate', keypath: 'updateDate', options: { unique: false } },
            { name: 'status', keypath: 'status', options: { unique: false } }
          ]
        }
      ]}>
      {props.children}
    </IndexedDB>
  );
}

export { OfflineStoreProvider };

export const DBConfig = {
  name: 'offlineDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'workOrderLog',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'dbId', keypath: 'dbId', options: { unique: false } },
        { name: 'workOrderConfigId', keypath: 'workOrderConfigId', options: { unique: false } },
        { name: 'creationDate', keypath: 'creationDate', options: { unique: false } },
        { name: 'updateDate', keypath: 'updateDate', options: { unique: false } },
        { name: 'status', keypath: 'status', options: { unique: false } }
      ]
    }
  ]
};