import os
import sys
import platform

class DirCreator():
    def __init__(self,download_dir):
        if "Windows" in platform.platform():
            folder_delimiter = '\\'
        else:
            folder_delimiter = '/'
        self.folder_delimiter = folder_delimiter
        self.path = os.getcwd()
        self.download_dir = folder_delimiter.join(download_dir).replace(' ','_')
        self.folder = os.path.join(self.path, self.download_dir) + self.folder_delimiter
        
    def createFolder(self):
        if not os.path.exists(self.folder):
            os.makedirs(self.folder)

    def getDirectory(self):
        if os.path.exists(self.folder):
            return self.folder
