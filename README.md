# robot-likePost
Like automation on instagram posts

## Uso
Install dependencies
```
$ yarn
```
Change username and password in the index.js file
```
$ await ig.login('username','password');
```
Change the content hashtags for searching posts in the index.js file
```
 await ig.hashtags(['coversbrasil','musicacover','covers']);
```
You can change the runtime by changing the "time" value in the insta.js file </br>
There is one with "1000" and another with "6000", referring to a like in the post and another in exchange for hashtag
```
await instagram.page.waitFor(time);
```
