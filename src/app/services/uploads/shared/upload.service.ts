import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Upload } from './upload';
import * as firebase from 'firebase';
import { NotificationService } from '../../notification.service';

@Injectable()
export class UploadService {
  constructor(
    private db: AngularFireDatabase,
    private notificationService: NotificationService) { }

  uploads: FirebaseListObservable<Upload[]>;

  uploadFile(storagePath: string, path: string, upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${storagePath}/${upload.file.name}`)
      .put(upload.file);

    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        },
        (error) => {
          this.notificationService.popToast('error', 'Ooops!', error.message);
        },
        () => {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          resolve(this.saveFileData(path, upload));
        });
    });
  }

  private saveFileData(path: string, upload: Upload) {
    return this.db.object(path).set(upload);
  }

  deleteFileStorage(storagePath: string, name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${storagePath}/${name}`).delete();
  }

  /**
   getProfileImageUrl(userId: string) {
     const userStorageRef = firebase.storage().ref().child('images/users/' + userId + '_image.jpg');
     userStorageRef.getDownloadURL().then(url => {
     });
   }

   deleteUpload(path: string, upload: Upload) {
     this.deleteFileData(path, upload.$key)
       .then(() => {
         this.deleteFileStorage(upload.name);
       })
       .catch(error => console.log(error));
   }

   private deleteFileData(path: string, key: string) {
     return this.db.list(`${this.basePath}/`).remove(key);
   }
   */

}
