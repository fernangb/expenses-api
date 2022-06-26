import { User } from './user.entity';

describe('User Entity Unit Tests', () => {
  it('should throw error when name is empty', () => {
    expect(() => {
      new User({
        name: undefined,
        email: 'user@email.com',
        password: '123',
      });
    }).toThrowError('Name is required');
    expect(() => {
      new User({
        name: null,
        email: 'user@email.com',
        password: '123',
      });
    }).toThrowError('Name is required');
    expect(() => {
      new User({
        name: '',
        email: 'user@email.com',
        password: '123',
      });
    }).toThrowError('Name is required');
  });

  it('should throw error when email is empty', () => {
    expect(() => {
      new User({
        email: undefined,
        name: 'User 1',
        password: '123',
      });
    }).toThrowError('Email is required');
    expect(() => {
      new User({
        email: null,
        name: 'User 1',
        password: '123',
      });
    }).toThrowError('Email is required');
    expect(() => {
      new User({
        email: '',
        name: 'User 1',
        password: '123',
      });
    }).toThrowError('Email is required');
  });

  it('should throw error when password is empty', () => {
    expect(() => {
      new User({
        password: undefined,
        name: 'User 1',
        email: 'user@user.com',
      });
    }).toThrowError('Password is required');
    expect(() => {
      new User({
        password: null,
        name: 'User 1',
        email: 'user@user.com',
      });
    }).toThrowError('Password is required');
    expect(() => {
      new User({
        password: '',
        name: 'User 1',
        email: 'user@user.com',
      });
    }).toThrowError('Password is required');
  });

  it('should create a user', () => {
    const user = new User({
      name: 'User 1',
      email: 'user@email.com',
      password: '123',
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe('User 1');
    expect(user.email).toBe('user@email.com');
    expect(user.password).toBe('123');
  });
});
