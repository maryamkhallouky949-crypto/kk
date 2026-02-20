
const doubleBloc = (x) => {
  return x * 2;
};

console.log(doubleBloc(5));
///
const salut = () => "Hello";
const somme = (a, b) => a + b;

console.log(salut());
console.log(somme(2, 3));
///
const creerPoint = (x, y) => ({ x, y });

console.log(creerPoint(2, 3)); 
///
const compteur = {
  valeur: 0,
  start() {
    this.timer = setInterval(() => {
      this.valeur++;
      if (this.valeur % 2 === 0) console.log("tick:", this.valeur);
      if (this.valeur >= 4) clearInterval(this.timer);
    }, 100);
  }
};

compteur.start();
////
const nums = [1, 2, 3, 4, 5, 6];
const carres = nums.map(n => n * n);
const pairs = nums.filter(n => n % 2 === 0); 
const som = nums.reduce((acc, n) => acc + n, 0);
console.log({ carres, pairs, som });
///
const premierPair = nums.find(n => n % 2 === 0);
const aGrand = nums.some(n => n > 5);
const tousPositifs = nums.every(n => n > 0);
console.log({ premierPair, aGrand, tousPositifs });
//
const mots = ["zèbre", "Arbre", "avion", "Banane"];
const triCI = [...mots].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
console.log(triCI);
///
const multiplierPar = facteur => x => x * facteur;
const fois3 = multiplierPar(3);
console.log(fois3(10)); 
////
const inc = x => x + 1;
const double = x => x * 2;
const compose = (f, g) => x => f(g(x));
const incPuisDouble = compose(double, inc);
console.log(incPuisDouble(5));
////
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const trim = s => s.trim();
const upper = s => s.toUpperCase();
const exclam = s => s + "!";
const nettoyer = pipe(trim, upper, exclam);
console.log(nettoyer("  hello  "));
////
const produits = [
  { id: 1, nom: "Stylo", cat: "Bureau", prix: 1.2, stock: 50 },
  { id: 2, nom: "Cahier", cat: "Bureau", prix: 2.5, stock: 0 },
  { id: 3, nom: "Clavier", cat: "Informatique", prix: 29.9, stock: 10 },
  { id: 4, nom: "Souris", cat: "Informatique", prix: 19.9, stock: 5 },
];
const dispoTries = produits
  .filter(p => p.stock > 0)
  .sort((a, b) => a.cat.localeCompare(b.cat) || a.nom.localeCompare(b.nom));
console.log(dispoTries);
///
const rechercher = (items, q) => {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return items.filter(p => p.nom.toLowerCase().includes(s) || p.cat.toLowerCase().includes(s));
};
console.log(rechercher(produits, "info"));
//
const valeurStock = produits.reduce((acc, p) => acc + p.prix * p.stock, 0);
const parCategorie = produits.reduce((acc, p) => {
  (acc[p.cat] ||= []).push(p);
  return acc;
}, {});
console.log({ valeurStock, parCategorie });
///
const getJSON = async url => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
};
///
const genererId = items => (items.length ? Math.max(...items.map(i => i.id ?? 0)) + 1 : 1);

const ajouter = (items, item) => {
  const id = item.id ?? genererId(items);
  return [...items, { ...item, id }];
};

const maj = (items, id, patch) => items.map(i => (i.id === id ? { ...i, ...patch } : i));

const supprimer = (items, id) => items.filter(i => i.id !== id);

const lister = items => [...items].sort((a, b) => a.nom.localeCompare(b.nom));
let etat = [...produits];
etat = ajouter(etat, { nom: "Tapis", cat: "Bureau", prix: 9.9, stock: 3 });
etat = maj(etat, 3, { stock: 12 });
etat = supprimer(etat, 2);
console.log(lister(etat));
////
const unique = arr => [...new Set(arr)];

console.log(unique([1, 2, 2, 3, 4, 4, 5]));
