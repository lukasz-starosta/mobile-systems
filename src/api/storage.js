const storage = {
  initialize(storage) {
    this.storageRef = storage.ref();
  },

  async upload(blob, contentType, name) {
    const ref = this.storageRef.child(name);
    var downloadURL;

    await ref.put(blob, contentType).then(async snapshot => {
      await snapshot.ref.getDownloadURL().then(url => {
        downloadURL = url;
      });
    });

    return downloadURL;
  },
};

export default storage;
