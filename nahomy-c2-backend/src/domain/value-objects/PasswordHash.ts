export class PasswordHash {
  constructor(private readonly value: string) {
    if (!value || value.length < 8) {
      throw new Error('Password hash must be at least 8 characters')
    }
  }

  getValue(): string {
    return this.value
  }
}
