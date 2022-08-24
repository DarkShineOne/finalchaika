import * as THREE from "./THREE/build/three.module.js"
import {GLTFLoader} from "./THREE/examples/jsm/loaders/GLTFLoader.js"
import { GUI } from './THREE/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './THREE/examples/jsm/controls/OrbitControls.js';

window.onload = function(){
		/*
		var width = window.innerWidth;
		var height = window.innerHeight; */
		var width = 825;
		var height = 1014;
		var canvas = document.getElementById('canvas');
		
		var isLoad = false;

		//Структура с "настройками в gui" вопследствие для кнопок
		let options = {
			tshirt: 0,
			collar: 0,
			sleeves: 0,
			bottom: 0,
			brb: 0,
			size:0,
			application: 0,
			apcolor:0
			//color: [255,255,255]
		};
		
		//Настройки канваса
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		
		//Рендерер
		var renderer = new THREE.WebGLRenderer({canvas: canvas});
		renderer.setClearColor(0xf0f0f0);
		
		//Главная сцена
		var scene = new THREE.Scene();
		
		//Камера
		var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 600);
		camera.position.set(0,0,300);
		
		//Свет
		var light = new THREE.DirectionalLight(0xFFFFFF,1);
		light.position.set(2,2,5);
		scene.add(light);

		//Загрузчик gltf модели
		const loader = new GLTFLoader()

		const Texloader = new THREE.TextureLoader();



		 var root; //Вся gltf сцена
		 	var Tshirt; //Основная модель
			var Tshirt_f //Модель полуприлягающая
		 	var Sleeves; //Руков короткий
			var Sleeves_l //Рукав длинный
		 	var Collar; //Воротник V
			var Collar_c; //Воротник C
			var Bottom; //Низ прямой
			var Bottom_f; //низ фигурный
			var Shoulders; //Плечи с ровной развёрткой
			var Shoulders_f //Плечи с повернутой развёрткой
			var Print // Часть модели, у которой принты
			var mat //Материал

			var clr_black = Texloader.load('assets/Black_Stripe.png')
			var clr_blue = Texloader.load('assets/Color_Stripe.png')
			var clr_red = Texloader.load('assets/Red_Stripe.png')

			var tiger_normal = Texloader.load('assets/tiger_normal.png')
			var tiger_3 = Texloader.load('assets/app_red-tiger_alpha.png')
			var tiger_2 = Texloader.load('assets/app_blue-tiger_alpha.png')
			var tiger_1 = Texloader.load('assets/app_dark-tiger_alpha.png')

			var seagle_normal = Texloader.load('assets/seagle_normal.png')
			var seagle_3 = Texloader.load('assets/seagle_red.png')
			var seagle_2 = Texloader.load('assets/seagle_blue.png')
			var seagle_1 = Texloader.load('assets/seagle_dark.png')

			var marine_normal = Texloader.load('assets/marine_normal.png')
			var marine_3 = Texloader.load('assets/marine_green.png')
			var marine_2 = Texloader.load('assets/marine_blue.png')
			var marine_1 = Texloader.load('assets/marine_dark.png')

		//Материал, у которого будет меняться color.
		var newMat = new THREE.MeshLambertMaterial();
		//var newMatAl = new THREE.MeshLambertMaterial();

		//Загружаю модель
		loader.load('assets/telnajka.gltf', function(gltf) {	
			root = gltf.scene; //Загружаю модель
			root.scale.set(40,40,40); //Увеличиваю в размерах
			root.position.y -= 60; //Меняю позицию по высоте
			root.rotation.y = -Math.PI/2;
			scene.add(root); // Добавляю модель на основную сцену
			isLoad = true; //Изменяю вспомогательную переменную
			
			Tshirt = root.getObjectByName('tshirt_s'); //Нахожу на gltf сцене Рубашку
			Tshirt_f = root.getObjectByName('tshirt_f'); //Нахожу на gltf сцене Рубашку

			
			Sleeves = root.getObjectByName('short'); //Нахожу на gltf сцене Рукова
			Sleeves_l = root.getObjectByName('Long'); //Нахожу на gltf сцене Рукова

			

			Collar = root.getObjectByName('v'); //Нахожу на gltf сцене Воротник
			Collar_c = root.getObjectByName('c'); //Нахожу на gltf сцене Воротник

			

			Bottom  = root.getObjectByName('d_s'); //Нахожу на gltf сцене Низ
			Bottom_f  = root.getObjectByName('d_f'); //Нахожу на gltf сцене Низ

			Shoulders  = root.getObjectByName('shoulders_0'); //Нахожу на gltf сцене Низ
			Shoulders_f  = root.getObjectByName('shoulders_1'); //Нахожу на gltf сцене Низ

			Print =  root.getObjectByName('Print');
			//var mat = Tshirt.getObjectByName('Mesh002_1').material; //Достаю на gltf сцене Рукова
			
			mat = Tshirt.material;
			//mat.color.set(0xFFFFFF)// 

			//var mat2 = Tshirt.getObjectByName('Mesh002').material; //Достаю на gltf сцене Рукова

			console.log(dumpObject(root).join('\n')); //Log информация для отладки
			console.log(dumpObject(Tshirt).join('\n')); //Log информация для отладки
			console.log(Tshirt) //Log информация для отладки


			//Преобразую MeshStandartMaterial в MeshLambertMaterial
			//console.log(mat);
			//console.log(mat2);

			/*
			newMatAl.color = mat.color;
			newMatAl.map = mat.map;
			newMatAl.transparent = true
			newMatAl.side =  THREE.DoubleSide;
			//newMatAl.needsUpdate = true

			newMat.color = mat2.color;
			newMat.map = mat2.map;
			newMat.side =  THREE.DoubleSide;








			//newMatAl.alphaMap = Texloader.load('assets/p	alms_a.png');
			console.log(newMatAl);
			Tshirt.getObjectByName('Mesh002_1').material = newMatAl; 	
			Tshirt.getObjectByName('Mesh002').material = newMat; 	
			
			//console.log(Collar)

			Sleeves.getObjectByName('Mesh003_1').material = newMatAl; 	
			Sleeves.getObjectByName('Mesh003').material = newMat; 		

			Collar.getObjectByName('Mesh008_1').material = newMatAl; 	
			Collar.getObjectByName('Mesh008').material = newMat; 		

			*/


			//Конечная настройка, стандартный цвет и начальные эллементы

			console.log(Print.material);

			
			Print.material.map = seagle_1;
			Print.material.normalMap = seagle_normal;

			mat.map = clr_blue;
			Sleeves.material.map  = clr_blue;

			Tshirt_f.visible = false;
			Collar.visible = false;
			Sleeves.visible = false;
			Bottom_f.visible = false;
			Shoulders.visible = false;
			

		})

		

		//Настройки движения камеры(не вращение объекта)
		const controls = new OrbitControls( camera, renderer.domElement );
				
				controls.enableZoom = false;
				//controls.minDistance = 1000; //Минимальная дистанция(приближение)
				//controls.maxDistance = 1500; //Максимальная дистанция(отдаление)
				controls.target.set( 0, 0, 0 ); //Координаты точки вращения
				controls.minPolarAngle = Math.PI/2; //Минимальный угол вращения камеры по вертикали
				controls.maxPolarAngle = Math.PI/2; //Максимальный угол вращения камеры по вертикали //Они одинаковые чтобы камера не вращалась вверх-вниз

				controls.minAzimuthAngle = -Math.PI/5;
				controls.maxAzimuthAngle = Math.PI/5;
				controls.enablePan = false; //Отключить движение камеры по оси(в бок, при нажатии ПКМ)
				controls.update();



		//Основная рекурсивная функция, в которой обновляются кадры
		function loop(){
			if(isLoad){
				if(options.rotatable){
					root.rotation.y += Math.PI/500
				}
				//changeModel()		
			}	
			
			//Перестройка размеров окна, возможно ненужная функция, потому что центр сцены всё-равно не сбрасывается
			/*
			if(width != window.innerWidth || height != window.innerHeight){
				width = window.innerWidth;
				height = window.innerHeight;
				canvas.setAttribute('width', width);
				canvas.setAttribute('height', height);
				camera.aspect = width/height;
				//controls.target.set( 0, 0, 0 );
			}*/

			//Выставляю мсвет в позицию камеры
			//light.position.x = camera.position.x
			//light.position.z = camera.position.z
			
			//Рендерю сцену
			renderer.render(scene, camera);
			requestAnimationFrame(function() {loop();});
		}
		loop();



		//Неиспользуемая функция для выставления задержки
		function sleep(milliseconds) {
			const date = Date.now();
			let currentDate = null;
			do {
			  currentDate = Date.now();
			} while (currentDate - date < milliseconds);
		  }

		//Функция для отладки, показывает всю иерархию gltf файла
		function dumpObject(obj, lines = [], isLast = true, prefix = '') {
			const localPrefix = isLast ? '└─' : '├─';
			lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
			const newPrefix = prefix + (isLast ? '  ' : '│ ');
			const lastNdx = obj.children.length - 1;
			obj.children.forEach((child, ndx) => {
			  const isLast = ndx === lastNdx;
			  dumpObject(child, lines, isLast, newPrefix);
			});
			return lines;
		  }	


		  //Обработка кнопок на сайте
		  //COLLAR
		  var b_collar0 = document.getElementById("collar_0");
		  b_collar0.classList.toggle('is-active');
		  b_collar0.onclick = function(){
				Collar_c.visible = true;
				Collar.visible = false;
				setBColl(0);
		  }
		  var b_collar1 = document.getElementById("collar_1");
		  b_collar1.onclick = function(){
				Collar_c.visible = false;
				Collar.visible = true;
				setBColl(1);
		  }
		  function setBColl(i){
			if(i != options.collar){
				b_collar0.classList.toggle('is-active')
				b_collar1.classList.toggle('is-active')
				options.collar = i;
			}
			send_const();
		  }


		  //SLEEVES
		  var b_sleeves0 = document.getElementById("sleeves_0");
		  b_sleeves0 .classList.toggle('is-active');
		  b_sleeves0 .onclick = function(){
				Sleeves.visible = false;
				Sleeves_l.visible = true;	
				Shoulders.visible = false;
				Shoulders_f.visible = true;
				if(options.sleeves != 0){
					b_sleeves0 .classList.toggle('is-active');
					setBSlee(0);
				}
		  }
		  var b_sleeves1  = document.getElementById("sleeves_1");
		  b_sleeves1 .onclick = function(){
				Sleeves.visible = true;
				Sleeves_l.visible = false;
				Shoulders.visible = true;
				Shoulders_f.visible = false;
				if(options.sleeves != 1){
					b_sleeves1 .classList.toggle('is-active');	
					setBSlee(1);
				}
		  }
		  var b_sleeves2  = document.getElementById("sleeves_2");
		  b_sleeves2 .onclick = function(){
				Sleeves.visible = false;
				Sleeves_l.visible = true;
				Shoulders.visible = true;
				Shoulders_f.visible = false;
				if(options.sleeves != 2){
					b_sleeves2 .classList.toggle('is-active');
					setBSlee(2);
		  	}
		  }
		  var b_sleeves3  = document.getElementById("sleeves_3");
		  b_sleeves3 .onclick = function(){
				Sleeves.visible = true;
				Sleeves_l.visible = false;
				Shoulders.visible = false;
				Shoulders_f.visible = true;
				if(options.sleeves != 3){
					b_sleeves3 .classList.toggle('is-active');
					setBSlee(3);
				}
		  }
		  function setBSlee(i){
			if(options.sleeves == 0){
				b_sleeves0.classList.toggle('is-active');
				options.sleeves = i;
			}
			else if(options.sleeves == 1){
				b_sleeves1.classList.toggle('is-active');
				options.sleeves = i;
			}
			else if(options.sleeves == 2){
				b_sleeves2.classList.toggle('is-active');
				options.sleeves = i;
			}
			else if(options.sleeves == 3){
				b_sleeves3.classList.toggle('is-active');
				options.sleeves = i;
			}
			send_const();
		  }

		  //TSHIRT
		  var b_tshirt0 = document.getElementById("tshirt_0");
		  b_tshirt0.classList.toggle('is-active');
		  b_tshirt0.onclick = function(){
				Tshirt.visible = true;
				Tshirt_f.visible = false;
				setBTs(0);
		  }
		  var b_tshirt1 = document.getElementById("tshirt_1");
		  b_tshirt1.onclick = function(){
				Tshirt.visible = false;
				Tshirt_f.visible = true;
				setBTs(1);
		  }
		  function setBTs(i){
			if(i != options.tshirt){
				b_tshirt0.classList.toggle('is-active');
				b_tshirt1.classList.toggle('is-active');
				options.tshirt = i;
			}
			send_const();
		  }


		    //BOTTOM
			var b_bottom0 = document.getElementById("bottom_0");
			b_bottom0.classList.toggle('is-active');
			b_bottom0.onclick = function(){
				  Bottom.visible = true;
				  Bottom_f.visible = false;
				  setBBot(0);
			}
			var b_bottom1 = document.getElementById("bottom_1");
			b_bottom1.onclick = function(){
				  Bottom.visible = false;
				  Bottom_f.visible = true;
				  setBBot(1);
			}
			function setBBot(i){
			  if(i != options.bottom){
				  b_bottom0.classList.toggle('is-active');
				  b_bottom1.classList.toggle('is-active');
				  options.bottom = i;
			  }
			  send_const();
			}
			
			//COLLOR PICKER
			var color_picker = document.getElementById("color_picker");
			
			color_picker.onchange = function(){
				switch(color_picker.value){
					case "0":
						mat.map = clr_blue;
						Sleeves.material.map  = clr_blue;
						break;
					case "1":
						mat.map = clr_red;
						Sleeves.material.map  = clr_red;
						break;
					case "2":
						mat.map = clr_black;
						Sleeves.material.map  = clr_black;
						break;	
				}
				send_const();
			}

			//SIZE
			var b_size0  = document.getElementById("size_0");
			b_size0 .classList.toggle('is-active');
			b_size0.onclick = function(){
				if(options.size != 0){
					b_size0 .classList.toggle('is-active');
					root.scale.set(40,40,40);
					setBSize(0);
				}
			}

			var b_size1  = document.getElementById("size_1");
			b_size1.onclick = function(){
				if(options.size != 1){
					b_size1 .classList.toggle('is-active');
					root.scale.set(45,45,45);
					setBSize(1);
				}
			}

			var b_size2  = document.getElementById("size_2");
			b_size2.onclick = function(){
				if(options.size != 2){
					b_size2 .classList.toggle('is-active');
					root.scale.set(50,50,50);
					setBSize(2);
				}
			}

			function setBSize(i){
				if(options.size == 0){
					b_size0.classList.toggle('is-active');
					options.size = i;
				}
				else if(options.size == 1){
					b_size1.classList.toggle('is-active');
					options.size = i;
				}
				else if(options.size == 2){
					b_size2.classList.toggle('is-active');
					options.size = i;
				}
				send_const();
			}



			function send_const(){
				console.log(options);
			}

			//PRINT PICKER
			var print_picker = document.getElementById("print_picker");
			
			print_picker.onchange = function(){
				switch(print_picker.value){
					case "0":
						if(options.apcolor == 0)
							Print.material.map = seagle_1;
						else if(options.apcolor == 1)
							Print.material.map = seagle_2;
						else
							Print.material.map = seagle_3;
						print3_image.src = "./assets/app_red.png"	
						Print.material.normalMap = seagle_normal;
						options.application = 0;
						break;
					case "1":
						if(options.apcolor == 0)
							Print.material.map = tiger_1;
						else if(options.apcolor == 1)
							Print.material.map = tiger_2;
						else
							Print.material.map = tiger_3;
						print3_image.src = "./assets/app_red.png"
						Print.material.normalMap = tiger_normal;
						options.application = 1;
						break;
					case "2":
						if(options.apcolor == 0)
							Print.material.map = marine_1;
						else if(options.apcolor == 1)
							Print.material.map = marine_2;
						else
							Print.material.map = marine_3;
						print3_image.src = "./assets/app_green.png"
						Print.material.normalMap = marine_normal;
						options.application = 2;
						break;	
				}
				send_const();
			}

			//PRINT COLOR PICKER
			var print3_image  = document.getElementById("thrbutton");
			//print3_image.src = "./assets/app_green.png"


			var b_print0  = document.getElementById("print_color0");
			b_print0.onclick = function(){
					setMat(0);
			}
			var b_print1  = document.getElementById("print_color1");
			b_print1.onclick = function(){
					setMat(1);
			}
			var b_print2  = document.getElementById("print_color2");
			b_print2.onclick = function(){
					setMat(2);
			}

			function setMat(i){
				options.apcolor = i
				if(i == 0){
					if(options.application == 0) Print.material.map = seagle_1;
					if(options.application == 1) Print.material.map = tiger_1;
					if(options.application == 2) Print.material.map = marine_1;
				}
				else if(i == 1){
					if(options.application == 0) Print.material.map = seagle_2;
					if(options.application == 1) Print.material.map = tiger_2;
					if(options.application == 2) Print.material.map = marine_2;	
				}
				else if(i == 2){
					if(options.application == 0) Print.material.map = seagle_3;
					if(options.application == 1) Print.material.map = tiger_3;
					if(options.application == 2) Print.material.map = marine_3;
					
				}
				send_const();
			}
			

	
			




}	
