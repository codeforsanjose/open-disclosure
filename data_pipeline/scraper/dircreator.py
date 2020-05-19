import os
import sys

class DirCreator():
    def __init__(self,folder_name="data"):
        self.path = os.getcwd()
        self.folder = os.path.join(self.path,folder_name)

    def createFolder(self):
        if not os.path.exists(self.folder):
            os.makedirs(self.folder)

    def changeDirectory(self):

        folders = os.listdir(os.getcwd())

        for folder in folders:
            if os.path.join(self.path,folder) == self.folder:
                abs_file_path = os.path.join(self.path,folder)
                os.chdir(abs_file_path)

        return abs_file_path
