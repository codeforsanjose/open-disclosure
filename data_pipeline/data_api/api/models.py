from api import db


class Candidate(db.Model):
    __tablename__ = "candidates"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=False, unique=True, nullable=False)

    def serialize(self):
        return {"id": self.id, "name": self.name}
