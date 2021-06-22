%when user presses the "photo capture" button, image is then transformed
%according to this algorithm:


A = imread('b.png');
CT = makecform('srgb2lab');
lab = applycform(A,CT);
L = lab(:,:,1);
a = lab(:,:,2);

a1 = imadjust(a,[],[],2)


NewImage = imfuse(L, a1);

imshow(NewImage)