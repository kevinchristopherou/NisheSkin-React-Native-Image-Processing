import base64
import sys

import cv2

import numpy as np

from skimage import io, feature


def algo2(image_name):
    rgb = cv2.imread(image_name)
    grayimage = cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY)

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    im = clahe.apply(grayimage)

    Grauwertmatrix = feature.greycomatrix(im, distances=[1], angles=[0])

    coprops = feature.greycoprops(Grauwertmatrix, 'energy')

    print(coprops[0][0])


def adjust_gamma(image, gamma=1.0):
    # build a lookup table mapping the pixel values [0, 255] to
    # their adjusted gamma values
    invGamma = 1.0 / gamma
    table = np.array([((i / 255.0) ** invGamma) * 255
                      for i in np.arange(0, 256)]).astype("uint8")
    # apply gamma correction using the lookup table
    return cv2.LUT(image, table)


def algo1(image_name):
    # cap = cv2.VideoCapture(0)
    # retval, image = cap.read()
    image = cv2.imread(image_name)

    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)

    l, a, b = cv2.split(lab)

    # clahe = cv2.createCLAHE(clipLimit=1.0, tileGridSize=(1, 1))
    # a1 = clahe.apply(a)

    # a1 = np.power(a, 2)

    a1 = adjust_gamma(a, 0.5)

    # cv2.imshow("Result", l)
    # cv2.waitKey()

    # cv2.imshow("Result", a)
    # cv2.waitKey()

    # cv2.imshow("Result", a1)
    # cv2.waitKey()

    a1 = cv2.normalize(a1, None, 0, 255, cv2.NORM_MINMAX)

    l = cv2.normalize(l, None, 0, 255, cv2.NORM_MINMAX)

    NewImage = np.dstack((a1, l, a1))

    # cv2.imshow("Result", NewImage)
    # cv2.waitKey()

    retval, buffer = cv2.imencode('.jpg', NewImage)

    jpg_as_text = base64.b64encode(buffer)
    print(jpg_as_text.decode("utf-8"))
    # cap.release()


if __name__ == '__main__':
    if len(sys.argv) < 3:
        # algo2("face.png")
        algo1("sample.jpg")
        # print("Invalid Param")
    else:
        if sys.argv[1] == "1":
            algo1(sys.argv[2])
        elif sys.argv[1] == "2":
            algo2(sys.argv[2])
        else:
            print("Invalid Param")
