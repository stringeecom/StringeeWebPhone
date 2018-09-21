



Stringee Web Phone được xây dựng 100% dựa trên [Stringee JavaScript SDK](https://developer.stringee.com/download#contentSdkWebsite) với đầy đủ giao diện để bạn có thể nhúng nhanh chóng vào Web của mình:

![Stringee Web Phone](https://static.stringee.com/docs/images/pcc/Stringee_web_phone.png "Stringee Web SoftPhone")

Demo: [https://v1.stringee.com/demo/web_phone.html](https://v1.stringee.com/demo/web_phone.html)



### 1. Hướng dẫn sử dụng xem [tại đây](https://stringee.com/vi/blog/post/stringee-web-softphone)


### 2. Hướng dẫn build

#### a. Yêu cầu

+ PHP
+ Nodejs
+ terminal app và môi trường MAC hoặc Linux

#### b. Cấu hình



###### Bước 1: Mở file config.php, cấu hình các tham số như sau:

**BASE_URL**: Đường dẫn đến thư mục 'public_html', có dấu / ở cuối, VD: http://127.0.0.1/stringee/StringeeWebPhone/public_html/
(Nếu đưa lên server thì đường dẫn đến thư mục 'public_html' trên server)


**VERSION**: phiên bản 

**BASE_URL_LOCAL**: giống với BASE_URL nhưng bắt buộc là đường dẫn ở local 



###### Bước 2: Mở trình duyệt, chạy đến file 'run_debug.php' trên local

http://127.0.0.1/stringee/StringeeWebPhone/run_debug.php

###### Bước 3: Chạy lệnh ./build.sh từ terminal 

###### Bước 4: Upload toàn bộ file trong thư mục dist vừa sinh ra lên Server ở đường dẫn bước 1 đã cấu hình

