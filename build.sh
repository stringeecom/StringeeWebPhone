

## 1. Sua BASE_URL = tren Server trong file 'config.php'

## 2. Chay tren trinh duyet: http://.../run_debug.php
## ==> luc do trinh duyet se bao loi ==> bo qua cac loi not found nay

## 3. sua VERSION trong file './TOOL/minifier.js' trung voi trong file: 'config.php'

## 4. chay lenh: ./build.sh

## 5. upload thu muc: ./dist len Server trung voi BASE_URL da cau hinh o buoc 1

## 6. upload len server that xong vao thu muc fonts doi ten abc.htaccess => .htaccess




rm -rf ./dist
mkdir ./dist

mkdir ./dist/css
mkdir ./dist/fonts
mkdir ./dist/images
mkdir ./dist/js


VERSION=1.0.0

cp -R ./public_html/css/all-style-$VERSION.css ./dist/css

cp -R ./public_html/fonts/* ./dist/fonts

cp -R ./public_html/images/* ./dist/images


cp -R ./public_html/js/all-js-$VERSION.js   ./dist/js


cp ./public_html/js/jquery-3.1.0.min.js ./dist/js



cp -R ./public_html/StringeeSoftPhone-$VERSION.js ./dist/js


cp ./public_html/Antique-Phone5.mp3 ./dist



node ./TOOL/minifier.js

rm -rf ./dist/js/all-js-$VERSION.js

mv ./dist/js/all-js-$VERSION.min.js ./dist/js/all-js-$VERSION.js



## tao lastest
cp ./dist/js/StringeeSoftPhone-$VERSION.js ./dist/js/StringeeSoftPhone-lastest.js 


