
%when user presses the "photo capture" button, camera takes 5 photos and
%algorithm should calculate the average 'energy' value of all 5 captured
%photos

rgb = imread('capturedimage.jpg');
grayimage = rgb2gray(rgb);
Iblur =adapthisteq(grayimage);
glcm1 = graycomatrix(Iblur);
stats = graycoprops(glcm1,{'energy'});
disp(stats)
