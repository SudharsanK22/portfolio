from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
hashed_password = "$2b$12$L.CMFXs3TUXw8JrPvtlQ3uS5KeJILiA4EKHgktrMt.VKqS9D/qVnO"

common_passwords = ["admin", "admin123", "password", "123456", "admin@123", "admin#123"]

for password in common_passwords:
    if pwd_context.verify(password, hashed_password):
        print(f"Match found! Password is: {password}")
        break
else:
    print("No match found in common passwords.")
