import firebase from 'firebase';

const database = {
  initialize(db) {
    this.db = db;
  },

  get instance() {
    return this.db;
  },

  collection(collectionName) {
    return this.db.collection(collectionName);
  },

  document(collectionName, documentId) {
    return this.collection(collectionName).doc(documentId);
  },

  getAllFromCollection(collectionName) {
    return this.collection(collectionName).get();
  },

  // users

  async getAllUsers() {
    const users = [];

    await this.getAllFromCollection('users').then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const user = { ...doc.data(), email: doc.id };

        users.push(user);
      });
    });

    return users;
  },

  async getUser(userId) {
    const document = await this.document('users', userId).get();

    const user = document.exists
      ? { ...document.data(), email: document.id }
      : null;

    return user;
  },

  async getUsersWhere(field, comparison, value) {
    const users = [];

    await this.collection('users')
      .where(field, comparison, value)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const user = { ...doc.data(), email: doc.id };

          users.push(user);
        });
      });

    return users;
  },

  async setUser(userData) {
    const user = this.document('users', userData.email);

    delete userData.email;

    user.set(userData);
  },

  // clubs

  async getAllClubs() {
    const clubs = [];

    await this.getAllFromCollection('clubs').then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const club = { ...doc.data(), uid: doc.id };

        clubs.push(club);
      });
    });

    return clubs;
  },

  async getClub(clubId) {
    const document = await this.document('clubs', clubId).get();

    const club = document.exists
      ? { ...document.data(), uid: document.id }
      : null;

    return club;
  },

  async getClubsWhere(field, comparison, value) {
    const clubs = [];

    await this.collection('clubs')
      .where(field, comparison, value)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const club = { ...doc.data(), uid: doc.id };

          clubs.push(club);
        });
      });

    return clubs;
  },

  async setClub(clubData) {
    const club = this.document('club', clubData.uid);

    delete clubData.uid;

    user.set(club);
  },

  async addClub(club) {
    this.collection('clubs').add(club);
  },
};

export default database;
