class PasswordHash:
    def __init__(self, value: str):
        if not value or len(value) < 8:
            raise ValueError("Password hash must be at least 8 characters")
        self._value = value

    @property
    def value(self) -> str:
        return self._value

    def __str__(self) -> str:
        return self._value
