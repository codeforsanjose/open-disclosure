import os
from datetime import datetime
import platform

class DirManager():
    def __init__(self, input_directory):
        if "Windows" in platform.platform():
            self.folder_delimiter = '\\'
        else:
            self.folder_delimiter = '/'
        self.path = os.getcwd()
        sub_directory = self.folder_delimiter.join(input_directory).replace(' ','_')
        self.folder = os.path.join(self.path, sub_directory)

        
    def createFolder(self):
        if not os.path.exists(self.folder):
            os.makedirs(self.folder)
        
    # Not currently used, but could be useful...
    def createBackupFolder(self):
        if os.path.exists(self.folder):
            now = datetime.now()
            dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
            os.rename(self.folder[:-1], ''.join(self.folder[:-1] + dt_string))
            os.makedirs(self.folder)

    def getDirectory(self):
        if os.path.exists(self.folder):
            return self.folder