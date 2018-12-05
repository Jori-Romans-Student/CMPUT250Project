import os

def goThroughFiles(dir):
    filesChanged = []
    os.chdir(dir)
    directories = os.listdir()

    for directory in directories:
        if os.path.isdir(directory):
            goThroughFiles(directory)
        else:
            changeName(directory)
    os.chdir('..')

def changeName(file):
    if file.endswith('.png'):
        newFile = ""
        for character in file:
            newCharacter = character
            if newCharacter == ' ':
                newCharacter = '_'
            newFile += newCharacter
        if file != newFile:
            if os.path.isfile(newFile):
                os.remove(newFile)
            os.rename(file, newFile)
            print("Renamed " + file + " to " + newFile)

goThroughFiles('img')
