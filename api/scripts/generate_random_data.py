import random
import sqlite3
import time
import uuid

import lorem
import names

NUM_PATIENTS = 100
NUM_MESSAGES = 100


def random_phone_number():
    return f"555-{random.randint(100, 999)}-{random.randint(1000, 9999)}"


con = sqlite3.connect("../prisma/dev.db")
cur = con.cursor()

cur.execute("DELETE FROM Message")
cur.execute("DELETE FROM Patient")

ids = []

sql = """
INSERT INTO Patient (id, firstName, lastName, phoneNumber, createdAt)
VALUES ('{}', '{}', '{}', '{}', '{}')
"""

for _ in range(NUM_PATIENTS):
    id_ = uuid.uuid4()
    ids.append(id_)
    cur.execute(
        sql.format(
            id_,
            names.get_first_name(),
            names.get_last_name(),
            random_phone_number(),
            int(time.time() * 1000),
        )
    )

sql = """
INSERT INTO Message (body, createdAt, patientId)
VALUES ('{}', '{}', '{}')
"""

for _ in range(NUM_MESSAGES):
    id_ = random.choice(ids)
    cur.execute(sql.format(lorem.sentence(), int(time.time() * 1000), id_))

con.commit()

cur.close()
con.close()
