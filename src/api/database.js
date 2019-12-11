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

  async updateUser(userId, userData) {
    this.document('users', userId).update(userData);
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

  async getClubsByName(name) {
    const clubs = [];

    if (!name) return clubs;

    // we use _name, as it is the lowercase equivalent and firestore is case sensitive
    await this.collection('clubs')
      .orderBy('_name')
      .startAt(name.toLowerCase())
      .endAt(name.toLowerCase() + '\uf8ff')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const club = { ...doc.data(), uid: doc.id };

          clubs.push(club);
        });
      });

    return clubs;
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
    const club = this.document('clubs', clubData.uid);

    delete clubData.uid;

    club.set(clubData);
  },

  async addClub(club) {
    return await this.collection('clubs')
      .add(club)
      .then(doc => {
        return doc.id;
      });
  },

  async updateClub(clubId, clubData) {
    this.document('clubs', clubId).update(clubData);
  },

  // members

  async addMember(member) {
    this.collection('members').add(member);
  },

  async getMembersOfClub(clubId, status = []) {
    const members = [];

    const collectionRef =
      status.length === 0
        ? this.collection('members').where('club_id', '==', clubId)
        : this.collection('members')
            .where('club_id', '==', clubId)
            .where('status', 'in', status);

    await collectionRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        members.push({ ...doc.data(), memberId: doc.id });
      });
    });

    if (members.length === 0) return [];
    const users = [];

    for (let i = 0; i < members.length; i++) {
      const user = await this.getUser(members[i].user_id);

      users.push({
        ...user,
        memberId: members[i].memberId,
        uid: members[i].user_id,
        status: members[i].status,
      });
    }

    return users;
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

  async updateMember(memberId, memberData) {
    return await this.document('members', memberId).update(memberData);
  },

  async deleteMember(memberId) {
    return await this.document('members', memberId).delete();
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

  async updatePost(postId, postData) {
    this.document('posts', postId).update(postData);
  },
};

export default database;
