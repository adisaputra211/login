/**
 * @jest-environment node
 */
import { hashPassword, verifyPassword } from '../lib/auth';

jest.mock('jose', () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue('mocked_token'),
  })),
  jwtVerify: jest.fn().mockResolvedValue({ payload: { id: 1 } }),
}));

describe('Auth Library', () => {
  const password = 'mySecretPassword123';

  test('should hash password and verify successfully', async () => {
    const hash = await hashPassword(password);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);

    const isValid = await verifyPassword(password, hash);
    expect(isValid).toBe(true);
  });

  test('should fail verification with wrong password', async () => {
    const hash = await hashPassword(password);
    const isValid = await verifyPassword('wrongPassword', hash);
    expect(isValid).toBe(false);
  });
});
