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

  // members

  async addMember(member) {
    this.collection('members').add(member);
  },

  async getMembersOfClub(clubId, status = []) {
    const memberIds = [];

    const collectionRef =
      status.length === 0
        ? this.collection('members').where('club_id', '==', clubId)
        : this.collection('members')
            .where('club_id', '==', clubId)
            .where('status', 'in', status);

    await collectionRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        memberIds.push(doc.data().user_id);
      });
    });

    const members = [];

    for (let i = 0; i < memberIds.length; i++) {
      const user = await this.getUser(memberIds[i]);

      members.push(user);
    }

    return members;
  },

  async getClubsOfUser(userId, status = []) {
    const clubIds = [];

    const collectionRef =
      status.length === 0
        ? this.collection('members').where('user_id', '==', userId)
        : this.collection('members')
            .where('user_id', '==', userId)
            .where('status', 'in', status);

    await collectionRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        clubIds.push(doc.data().club_id);
      });
    });

    const clubs = [];

    for (let i = 0; i < clubIds.length; i++) {
      const club = await this.getClub(clubIds[i]);

      clubs.push(club);
    }

    return clubs;
  },

  // posts

  async getAllPosts() {
    const posts = [];

    await this.getAllFromCollection('posts').then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const post = { ...doc.data(), uid: doc.id };

        posts.push(post);
      });
    });

    return posts;
  },

  async getPost(postId) {
    const document = await this.document('posts', postId).get();

    const post = document.exists
      ? { ...document.data(), uid: document.id }
      : null;

    return post;
  },

  async getPostsWhere(field, comparison, value) {
    const posts = [];

    await this.collection('posts')
      .where(field, comparison, value)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const post = { ...doc.data(), uid: doc.id };

          posts.push(post);
        });
      });

    return posts;
  },

  async addPost(post) {
    this.collection('posts').add(post);
  },
};

export default database;
