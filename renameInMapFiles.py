import os
import string
import fileinput

def getPicturesThatWereChanged():
    file = open('changedImages.txt', "r")
    images = []
    newImages = []
    for line in file:
        images += [line[8:line.find(".png")]]

        newImage = line[line.find(".png") + 8:]
        newImages += [newImage[:newImage.find(".png")]]
    return (images, newImages)

def renamePhotosInFile(pictureNames):
    os.chdir('data')
    files = os.listdir()

    oldNames = pictureNames[0]
    newNames = pictureNames[1]

    numOfPics = len(oldNames)

    for i in range(0, numOfPics):
        os.system("sed -i -- 's/" + oldNames[i] + "/" + newNames[i] + "/g' *")
        print("Replaced " + oldNames[i])



renamePhotosInFile(getPicturesThatWereChanged())
