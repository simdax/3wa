#gros site

Une fois que vous avez téléchargé ce repo, vous pouvez le faire tourner "en local" chez vous. 

1. Pour cela, il faut d'abord télécharger tous les packages que j'utilise dedans ==>

npm install

2. Après, on lance cette simple commande qui va lancer un serveur local (une sorte de xampp du pauvre), puis un onglet dans votre navigateur qui sera synchronisé avec les changements que vous ferez sur les fichiers ==>

npm run watch

(pour les curieux, "npm run watch" n'est pas un programme en soi. C'est une ligne de commande que l'on trouve dans la partie "scripts" que l'on voit dans package.json)

1. Tous les changements que vous appliquerez sur les fichiers dans le folder "public" (sass,js) et dans le folder "views" (c'est du pug, une sorte de html en mieux, c'est de toute façon assez transparent) seront tout de suite répercutés sur votre browser

-------

Si vous avez des idées de design de ouf que vous réussissez à implémenter dans votre serveur local, vous me faites une "pull request". Je pourrai récupérer votre dossier de travail, celui dans lequel vous avez fait toutes vos modifications, et après je pourrai les appliquer sur le serveur californien qui actuellement "sert" le site sur l'URL ===> [//troiswa.herokuapp.com]