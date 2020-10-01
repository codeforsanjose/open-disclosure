import logging
import os
from rejson import Client

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class RedisClient:
    def __init__(self):
        logger.debug(os.environ.get("REDIS_API_URL"))
        self.client = Client(host=os.environ.get(
            "REDIS_API_URL"), decode_responses=True)

    def getAnyShape(self, index):
        try:
            shape = self.client.jsonget(index)
            return shape
        except Exception as e:
            logger.warning(
                'Fail to get the {} shape from Redis {}'.format(index, e))
