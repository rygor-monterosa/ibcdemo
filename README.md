# IBC Demo Application

## Set up environment

1. Create and push new branch

    ```
    $ git checkout -b <your-branch-name>
    $ git push origin <your-branch-name>
    ```

2. Update package.json and bower.json according to your preferences. It is essential to change property "field" in package.json which is used to uniquely identify your application name and to assign public url.

3. Install Node.js http://nodejs.org/ and node modules
4. Install automated task runner Gulp and package manager Bower globally:

    ```
    $ npm install -g gulp
    $ npm install -g bower
    ```

5. Install necessary node and bower modules:

    ```
    $ npm install
    $ bower install
    ```

6. To build and expose application to the public (it is necessery to register app in LViS Studio) the only thing you need is to run:

    ```
    $ gulp
    ```

This will compile all your assets, copy them to the /dist/ folder, create tiny server and forward port to the public. The public host will be https://<package.name>.localtunnel.me/ If any file changes application will be recompiled.
