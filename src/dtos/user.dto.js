export class UserDTO {
  constructor(user) {
    this.id = user._id ? user._id.toString() : null;   // Mongo usa _id
    this.firstName = user.first_name || null;          // Modelo usa first_name
    this.lastName = user.last_name || null;            // Modelo usa last_name
    this.email = user.email || null;
    this.role = user.role || 'user';
    this.cart = user.cart || null;
  }
}