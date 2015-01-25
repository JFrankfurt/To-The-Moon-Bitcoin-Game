[1mdiff --git a/public/index.html b/public/index.html[m
[1mindex 8ef0c44..edd77e6 100644[m
[1m--- a/public/index.html[m
[1m+++ b/public/index.html[m
[36m@@ -6,13 +6,9 @@[m
     <script src="bower_components/phaser/src/Phaser.js"></script>[m
 </head>[m
 <body>[m
[31m-<div id="ToTheMoon"></div>[m
 <script src="bower_components/phaser/build/phaser.js"></script>[m
 <script src="bower_components/angular/angular.js"></script>[m
 <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>[m
 <script src="scripts/app.js"></script>[m
[31m-<script>//credit for these two functions to dnassler[m
[31m-[m
[31m-}</script>[m
 </body>[m
 </html>[m
\ No newline at end of file[m
[1mdiff --git a/public/scripts/app.js b/public/scripts/app.js[m
[1mindex 1e0f1c6..70c2f5a 100644[m
[1m--- a/public/scripts/app.js[m
[1m+++ b/public/scripts/app.js[m
[36m@@ -1,13 +1,10 @@[m
 var app = angular.module("app", []);[m
 [m
[31m-var gameW = 1200;[m
[31m-var gameH = 900;[m
[31m-[m
[31m-var game = new Phaser.Game(gameW, gameH, Phaser.CANVAS,'ToTheMoon',[m
[32m+[m[32mvar game = new Phaser.Game('95%', '95%', Phaser.CANVAS,'ToTheMoon',[m
                            { preload: preload,[m
[31m-                            create: create,[m
[31m-                            update: update,[m
[31m-                            render: render });[m
[32m+[m[32m                             create : create,[m
[32m+[m[32m                             update : update,[m
[32m+[m[32m                             render : render });[m
 [m
 function preload() {[m
     game.load.atlasJSONHash('SpriteSheet', 'assets/SpriteSheet.png','assets/SpriteSheet.json');[m
