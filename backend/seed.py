import os
from app import create_app, db
from app.models import User, Role, Message
from sqlalchemy.sql import text

from datetime import datetime

import random

app = create_app(os.environ.get('FLASK_CONFIG', 'default'))
app.app_context().push()

def reset_sequence(session, table_name):
    session.execute(text(f"ALTER SEQUENCE {table_name}_id_seq RESTART WITH 1"))
    session.commit()

def seed_roles():
    roles = [
        {"id": 1, "name": "Patient"},
        {"id": 2, "name": "Admin"},
        {"id": 3, "name": "Staff"},
    ]
    for role in roles:
        existing_role = db.session.get(Role, role["id"])
        if existing_role is None:
            new_role = Role(id=role["id"], name=role["name"])
            db.session.add(new_role)
        else:
            existing_role.name = role["name"]  
    db.session.commit()
    print("Roles added to database")

def seed_users():
    users = [
        {"first_name": "Admin", "last_name": "User", "email": "admin@primecare.com", "password": "admin123", "dob": "1990-01-01", "role_id": 2},
        {"first_name": "Michael", "last_name": "Lee", "email": "michael.lee@primecare.com", "password": "michaellee", "dob": "1990-01-01", "role_id": 3},
        {"first_name": "Emily", "last_name": "Johnson", "email": "emily.johnson@primecare.com", "password": "emilyjohnson", "dob": "1990-01-01", "role_id": 3},
        {"first_name": "Tom", "last_name": "Rivera", "email": "tom.rivera@primecare.com", "password": "tomrivera", "dob": "1990-01-01", "role_id": 3},
        {"first_name": "Natalie", "last_name": "Wang", "email": "natalie.wang@primecare.com", "password": "nataliewang", "dob": "1990-01-01", "role_id": 3},
        {"first_name": "Samia", "last_name": "Wilson", "email": "samia.wilson@primecare.com", "password": "samiawilson", "dob": "1990-01-01", "role_id": 2},
    ]

    reset_sequence(db.session, 'users')

    for user_data in users:
        existing_user = User.query.filter_by(email=user_data["email"]).first()
        if not existing_user:
            new_user = User(**user_data)
            new_user.save()
        else:
            for key, value in user_data.items():
                setattr(existing_user, key, value)
            existing_user.save()

    print("Users added to  database.")
    

# messages won't work as doesn't include subject 
def seed_messages():
    messages = [
        {"sender_id": 1, "content": "Hello from John."},
        {"sender_id": 2, "content": "Hello from Jane."},
        {"sender_id": 3, "content": "Hello from Admin.", "parent_message_id": None},
        {"sender_id": 4, "content": "Hello from Staff.", "parent_message_id": None},
        {"sender_id": 1, "content": "Reply from John.", "parent_message_id": 1},
    ]
    reset_sequence(db.session, 'messages')

    for message_data in messages:
        existing_message = Message.query.filter_by(content=message_data["content"]).first()
        if not existing_message:
            new_message = Message(**message_data)
            db.session.add(new_message)

    db.session.commit()
    print("Messages added to  database.")

def clear_messages():
    Message.query.delete()
    db.session.commit()
    print("Data in Message table deleted.")

def clear_users():
    User.query.delete()
    db.session.commit()
    print("Data in User table deleted.")

def clear_role():
    Role.query.delete()
    db.session.commit()
    print("Data in Role table deleted.")


if __name__ == "__main__":
    # clear_messages()
    clear_users()
    clear_role()

    seed_roles()
    seed_users()
