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
    return filesChanged

def changeName(file):
    if file.endswith('.png'):
        newFile = ""
        for character in file:
            newCharacter = character
            if newCharacter == ' ':
                newCharacter = '_'
            newFile += newCharacter
        if os.path.isfile(newFile) and file != newFile:
            os.remove(newFile)
            os.rename(file, newFile)
            print("Renamed " + file + " to " + newFile)

filesChanged = goThroughFiles('img')
print(filesChanged)
