const container = document.getElementById('container');

import * as THREE from 'three';
import { Camera } from 'three';

//La scéne
const scene = new THREE.Scene();

// background scene
const bg_loader = new THREE.TextureLoader();
bg_loader.load('./assets/bg-farcry.jpg', function(texture){
	scene.background = texture;
})

// Caméra 
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1.5;
camera.position.y = 4;
camera.rotation.set(-0.2, 0, 0);

// Rendu
const renderer = new THREE.WebGLRenderer();
// on lui donne la taille de l'écran
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// -------------------- Perso -------------------- //
const geometry = new THREE.BoxGeometry(0.5, 4, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// on l'ajoute à la scéne
scene.add(cube);

// on change la position du cube sur la scéne 
cube.position.z = -5.5;  
cube.position.x = 0;  
cube.position.y = 0;  

// -------------------- Parcel -------------------- //
const ParcelGeometry = new THREE.BoxGeometry(10, 2, 1000);
const ParcelMaterial = new THREE.MeshBasicMaterial({ color: 0xAFDEF6 });
const parcel = new THREE.Mesh(ParcelGeometry, ParcelMaterial);

// on change la position de la parcel sur la scéne
parcel.position.set(0,0,-8)

//on l'ajoute à la scéne
scene.add(parcel);

// -------------------- Pique -------------------- //
const piqueGeometry = new THREE.ConeGeometry(0.4,0.5,10);
const piqueMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});

// tab pour les pics
const tabPic = [];

// crée des piques 
function creatPic(){

	let NbPic = Math.floor((Math.random()*4) + 1);

	for(let p = 0; p < NbPic; p++){
		let Px = Math.floor((Math.random()*3 - 1));
		console.log(Px);
		const pique = new THREE.Mesh(piqueGeometry, piqueMaterial);
		// change sa postion sur l'axe x
		pique.position.x = Px;
		pique.position.z = -20;
		pique.position.y = 3;
		// je l'ajoute à la scéne
		scene.add(pique);
		console.log("moi");
		tabPic.push(pique);	
	}
}

// spawn des piques
setInterval(creatPic,1500);

// function pour bouger le cube(joueurs)
function MovePlayer(){
	document.addEventListener('keydown', (event)=>{
		if ((event.key ==='ArrowLeft') || (event.key==='ArrowRight') || (event.key==='ArrowDown') || (event.key==='ArrowUp')){
			switch(event.key){
			   
				case 'ArrowUp':
					cube.position.y +=0.001;
					console.log(cube.position.y)
					break;
				
				case 'ArrowDown':
					cube.position.y -= 0.0001;
					console.log(cube.position.y)
					break;
				
				case 'ArrowLeft':
					cube.position.x -= 0.002;
					console.log(cube.position.x)
					break;
				
				case 'ArrowRight':
					cube.position.x += 0.002;
					console.log(cube.position.x);
					break;    
				
			}
		}
		

	});
}

// pour ne pas sortir des limites
function limitWall(){

	// left 
	if(cube.position.x < -3){
		cube.position.x =-3;
	}; 

	// right
	if(cube.position.x > 3){
		cube.position.x = 3;
	};

	// bottom
	if(cube.position.y < 0){
		cube.position.y = 0;
	};
}

console.log(camera);
console.log(scene);
console.log(cube);
console.log(container);
console.log(camera.position);
console.log(ParcelMaterial);

function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene,camera);

	// test
	cube.rotation.y += 0.01;

	for(let i =0; i<tabPic.length; i++){
		// défilement des piques
		tabPic[i].position.z += 0.1;
		// suppresion des pics
		if(tabPic[i].position.z > camera.position.z){
			console.log(tabPic);
			tabPic.shift();
		}
	};

	// move player
	MovePlayer();

	// regarde les limites
	limitWall()
}
animate();
