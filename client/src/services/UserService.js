import Api from '@/services/Api';

export default {
  // signs up new user
  signup(credentials) {
    return Api().post('users/sign-up', credentials);
  },
  // signs in user
  signin(credentials) {
    return Api().post('users/sign-in', credentials);
  },
  // gets a user by id
  getone(userId) {
    return Api().get(`users/${userId}`);
  },
  // updates a user by id
  update(user) {
    return Api().put(`users/${user.id}`, user);
  },
  // deletes a user by id
  delete(userId) {
    return Api().delete(`users/${userId}`);
  }
};
