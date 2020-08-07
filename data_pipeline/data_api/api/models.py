from api import db


class Candidate(db.Model):
    __tablename__ = "candidates"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=False, unique=True, nullable=False)
    elections = db.relationship(
        "Elections"
    )  # query Elections table, probably need to do a join to get the stuff i want
    committees = db.relationship("Committees")  # query Committees table
    # elections
    # committees

    def serialize(self):
        return {"id": self.id, "name": self.name}


class Committees(db.Model):
    pass


# class Committees
# Candidate owned
# Referendum owned
# Other


class Elections(db.Model):
    pass


# class Elections
# election cycles
# office elections
# Referendums


class Referendums(db.Model):
    pass


# class Referendums
