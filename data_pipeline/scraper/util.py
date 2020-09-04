import os
from os import path
import logging
import time
from random import randint

logger = logging.getLogger(__name__)


def renameDownloadedFile(absolutefname: str):
    '''
    Rename a <file.ext> to <file_timestamp_randomint.ext>
    Selenium leaves the operation system to decide the download file name if a file with the same name exists.
    It causes transactionExportGrid.xls to be overwritten on Linux.
    This util provide a way to force rename transactionExportGrid.xls regardless of the operation system.
    Ref: https://stackoverflow.com/questions/34548041/selenium-give-file-name-when-downloading
    Args:
        absolutefname: str Absolute downloaded excel file name to be renamed
    Returns:
        None
    '''
    if not path.exists(absolutefname):
        logger.warning("{} does not exist".format(absolutefname))
        return
    if not path.isfile(absolutefname):
        logger.warning("{} is not a valid file".format(absolutefname))
        return
    dirname = path.dirname(absolutefname)
    basename = path.basename(absolutefname)
    f, ext = path.splitext(basename)
    newfilename = "{}_{}_{}{}".format(f, int(round(time.time())), randint(0, 10), ext)
    os.replace(absolutefname, path.join(dirname, newfilename))
