import os

def getPicturesThatWereChanged():
    file = open('changedImages.txt', "r")
    images = []
    for line in file:
        image = line.substring(0, 8)
        print(image)

getPicturesThatWereChanged()
