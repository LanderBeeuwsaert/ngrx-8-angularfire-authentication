import {Injectable} from '@angular/core';
import {Action} from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import DocumentSnapshot = firestore.DocumentSnapshot;

@Injectable()
export class Helpers {

  fsTransDoc(dca: Action<DocumentSnapshot>) {
    // console.log(item);
    // let item2 = {$key: dca.payload.id, $path: dca.payload.ref.path, ...dca.payload.data()};

    let item2: any = null;
    if (dca.payload.exists) item2 = dca.payload.data();
    else item2 = {};

    item2['$key'] = dca.payload.id;
    item2['$path'] = dca.payload.ref.path;

    // console.log(item2);
    // let item2 = null;
    return item2;
  }
}
