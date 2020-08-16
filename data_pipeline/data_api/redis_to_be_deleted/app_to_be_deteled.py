from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)


@app.route('/open-disclosure/api/v1.0/redis_to_be_deleted_a')
def rget():
    redis.incr('hits')
    return 'This Compose/Flask demo has been viewed %s time(s).' % redis.get('hits')


@app.route('/open-disclosure/api/v1.0/redis_to_be_deleted_b')
def rset():
    redis.set('1381896', 'Neighbors for Sylvia Arenas for D8 City Council 2016')
    return 'Data: {} '.format(redis.get('1381896'))


@app.route('/open-disclosure/api/v1.0/redis_to_be_deleted_c')
def rpipeline():
    pipe = redis.pipeline()
    pipe.set('1381897', 'Neighbors for Amy Arenas for D8 City Council 2017')
    pipe.get('1381896')
    pipe.get('1381897')
    return 'Data: {} '.format(pipe.execute())


@app.route('/open-disclosure/api/v1.0/redis_to_be_deleted_d')
def rpubsub():
    r = redis.publish('first-channel', '1381898 - Neighbor Bill')
    r = redis.publish('first-channel', '1381899 - Neighbor Carol')
    pub = redis.pubsub()
    pub.subscribe('first-channel')
    return 'Data: {} '.format(pub.get_message())


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
