
Stringee Web Phone is built 100% on top of the [Stringee JavaScript SDK](https://developer.stringee.com/download#contentSdkWebsite) with a full interface for you to quickly embed in your Web:

![Stringee Web Phone](https://static.stringee.com/docs/images/pcc/Stringee_web_phone.png "Stringee Web SoftPhone")

Demo: [https://v1.stringee.com/demo/web_phone.html](https://v1.stringee.com/demo/web_phone.html)



### 1. For user manual see [here].(https://stringee.com/en/blog/post/stringee-web-softphone)


### 2. Build instructions:

#### a. Requirements

+ PHP
+ Nodejs
+ terminal app and a Mac or Linux environment

#### b. Configuration



###### Step 1: Open the config.php file, configure the parameters as follows:

**BASE_URL**: Path to the 'public_html' directory, with a / at the end, For example: http://127.0.0.1/stringee/StringeeWebPhone/public_html/
(If uploaded to the server, the path points to the 'public_html' directory on the server)


**VERSION**: version

**BASE_URL_LOCAL**: same as BASE_URL but must be local path



###### Step 2: Open browser, run the file 'run_debug.php' on local

http://127.0.0.1/stringee/StringeeWebPhone/run_debug.php

###### Step 3: Run command ./build.sh from terminal

###### Step 4: Upload all files in the generated dist folder to the Server at the configured path at step 1 
