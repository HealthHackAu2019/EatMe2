# tries to find plates using OpenCV Circular Object Detection (Hough Circles)
# work in progress ... still getting some false hits...

import numpy as np
import cv2
import sys

# load the image, clone it for output, and then convert it to grayscale
# image = cv2.imread("../data/img/0.png")
image = cv2.imread("../data/img/hh_4comp_011_ud.jpg")

output = image.copy()
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Enhance image
gray = cv2.equalizeHist(gray)

# It converts the BGR color space of image to HSV color space
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
# Threshold of blue in HSV space
sensitivity = 105
lower_white = np.array([0, 0, 255 - sensitivity])
upper_white = np.array([255, sensitivity, 255])
# preparing the mask to overlay
mask = cv2.inRange(hsv, lower_white, upper_white)
# The black region in the mask has the value of 0,
# so when multiplied with original image removes all non-blue regions
res = cv2.bitwise_and(image, image, mask=mask)
cv2.imshow('result', res)
# cv2.waitKey(0)
# sys.exit(0)

houghInput = cv2.cvtColor(res, cv2.COLOR_BGR2GRAY)

maxR = 130
minR = 90
# detect circles in the image
circles = cv2.HoughCircles(houghInput, cv2.HOUGH_GRADIENT, 1.57, minR)

# minR = 10
# maxR = 1000
# edges = cv2.Canny(image, 150, 130)
# circles = cv2.HoughCircles(edges, cv2.HOUGH_GRADIENT, 1.2, 30)
# param1=80,
# param2=30,
# minRadius=minR,
# maxRadius=maxR)

# ensure at least some circles were found
if circles is not None:
    # convert the (x, y) coordinates and radius of the circles to integers
    circles = np.round(circles[0, :]).astype("int")

    # loop over the (x, y) coordinates and radius of the circles
    for (x, y, r) in circles:
        print("x:" + str(x) + ", y:" + str(y) + ", r:" + str(r))
        if r < minR or r > maxR:
            continue
        # draw the circle in the output image, then draw a rectangle
        # corresponding to the center of the circle
        cv2.circle(output, (x, y), r, (0, 255, 0), 4)
        cv2.rectangle(output, (x - 5, y - 5), (x + 5, y + 5), (0, 128, 255), -1)

    # show the output image
    newSize = (800, 600)
    cv2.imshow("output", np.hstack([cv2.resize(image, newSize), cv2.resize(output, newSize)]))
    cv2.waitKey(0)
