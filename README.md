# Classic Raid Tools Front
Role : 
  - Admin (Gestion des utilisateurs)
  - Officier (Création et édition des raids + Création d'annonces)
  - Membre (Inscription aux raids)

ENV: 
NODE_ENV
BACKEND_URL
DISCORD_REDIRECT_URI
DISCORD_CLIENT_ID
GITHUB_CLIENT_ID


## Loots 
/loots

### Première version :
Les admins peuvent rajouter des items (instance + wid + boss)

Les mdc peuvent tag les items pour leurs classes uniquement en : 
- +1 (ca veut dire que ca peut intéresser certains mais c'est pas obligatoire)
- BIS P4 
- BIS P5 
- BIS P6 

Du coup dans l'interface on peut filtrer par : 
- Slot (Head / Neck ...)
- Classe (Armor / Weapon )
- SubClasse (Baton / Tissu)
- Classe Multiples (pour identifier les soucis de multiattrib)
- Spec (Heal / CaC / dd )
- Class (druid / ...)

Sur chaque ligne en plus des infos utiles (Nom de l'objet / slot etc )
- Il y a un champ texte modifiable par le staff qui permet de définir à qui doit revenir le loot ou d'organiser une rota entre les classes (bref c'est libre vu que c'est du texte.)
- Il y a un champ texte modifiable par les MDCs qui se sont tag sur un item qui indique qui doit loot ou ce que faire (Rand ), comme le champ précédent c'est libre. 


#### Seconde version 
Ajout pour tous les membres la possibilité de tag tous les items, spec à définir


