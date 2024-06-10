import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import "./MainContent.css";

const MainContent = () => {
	const containerRef = useRef(null);
	const mouseX = useRef(0);
	const mouseY = useRef(0);
	const isDragging = useRef(false);
	const raycaster = useRef(new THREE.Raycaster());
	const mouse = useRef(new THREE.Vector2());
	const backgroundOffset = useRef(0.0);
	const composer = useRef(null);

	// Inicialización del contenido
	useEffect(() => {
		// Creación de la escena, cámara y renderizador
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true });

		const canvasWidth = window.innerWidth * 0.98;
		const canvasHeight = window.innerHeight * 0.98;
		renderer.setSize(canvasWidth, canvasHeight);

		const gradientTexture = new THREE.CanvasTexture(generateGradientCanvas());
		scene.background = gradientTexture;

		// Estilos del renderizador
		renderer.domElement.style.position = "fixed";
		renderer.domElement.style.top = "0";
		renderer.domElement.style.left = "0";
		renderer.domElement.style.width = "100vw";
		renderer.domElement.style.height = "100vh";
		renderer.domElement.style.margin = "0";
		renderer.domElement.style.boxSizing = "border-box";
		renderer.domElement.style.cursor = "auto";

		containerRef.current.appendChild(renderer.domElement);

		// Creación de la figura
		const geometry = new THREE.BoxGeometry(400, 400, 400);
		const materials = [
			new THREE.MeshBasicMaterial({
				map: createGradientTexture("#FF0000", "#00FFFF"),
			}),
			new THREE.MeshBasicMaterial({
				map: createGradientTexture("#FF0000", "#00FFFF"),
			}),
			new THREE.MeshBasicMaterial({
				map: createGradientTexture("#FF0000", "#00FFFF"),
			}),
			new THREE.MeshBasicMaterial({
				map: createGradientTexture("#FF0000", "#00FFFF"),
			}),
			new THREE.MeshBasicMaterial({
				map: createGradientTexture("#FF0000", "#00FFFF"),
			}),
			new THREE.MeshBasicMaterial({
				map: createGradientTexture("#FF0000", "#00FFFF"),
			}),
		];
		const cube = new THREE.Mesh(geometry, materials);
		scene.add(cube);

		// Tamaño de la figura en dispositivos móviles
		if (window.innerWidth < 768) {
			cube.scale.set(0.6, 0.6, 0.6);
		}

		camera.position.z = 800;

		const handleMouseDown = (event) => {
			isDragging.current = true;
			renderer.domElement.style.cursor = "grabbing";
			mouseX.current = event.clientX || event.touches[0].clientX;
			mouseY.current = event.clientY || event.touches[0].clientY;
		};

		const handleMouseUp = () => {
			isDragging.current = false;
			renderer.domElement.style.cursor = "grab";
		};

		const handleMouseMove = (event) => {
			if (isDragging.current) {
				const clientX = event.clientX || event.touches[0].clientX;
				const clientY = event.clientY || event.touches[0].clientY;
				const deltaX = clientX - mouseX.current;
				const deltaY = clientY - mouseY.current;
				mouseX.current = clientX;
				mouseY.current = clientY;

				cube.rotation.x += deltaY * 0.01;
				cube.rotation.y += deltaX * 0.01;

				gradientTexture.offset.x -= deltaX * 0.0005;
				gradientTexture.offset.y -= deltaY * 0.0005;
			}
		};

		// Animación
		const animate = () => {
			if (!isDragging.current) {
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				gradientTexture.offset.x += 0.001 * Math.sin(backgroundOffset.current);
				backgroundOffset.current += 0.01;

				if (gradientTexture.offset.x <= -1) {
					gradientTexture.offset.x = 0;
				}
			}
			renderer.render(scene, camera);
			if (composer.current) {
				composer.current.render();
			}
			requestAnimationFrame(animate);
		};

		animate();

		// Eventos para interacción con el mouse o el dedo en dispositivos táctiles
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("touchstart", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("touchend", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleMouseMove);

		// Manejo del redimensionamiento de la ventana
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			const newCanvasWidth = window.innerWidth * 0.98;
			const newCanvasHeight = window.innerHeight * 0.98;
			renderer.setSize(newCanvasWidth, newCanvasHeight);
		};

		window.addEventListener("resize", handleResize);

		// Función para detectar la interacción con la figura
		const handleRaycast = (event) => {
			event.preventDefault();

			const clientX = event.clientX || event.touches[0].clientX;
			const clientY = event.clientY || event.touches[0].clientY;
			mouse.current.x = (clientX / renderer.domElement.clientWidth) * 2 - 1;
			mouse.current.y = -(clientY / renderer.domElement.clientHeight) * 2 + 1;

			raycaster.current.setFromCamera(mouse.current, camera);

			const intersects = raycaster.current.intersectObjects([cube]);

			if (intersects.length > 0) {
				renderer.domElement.style.cursor = "grab";
			} else {
				renderer.domElement.style.cursor = "auto";
			}
		};

		window.addEventListener("mousemove", handleRaycast);
		window.addEventListener("touchmove", handleRaycast);

		// Inicialización del procesamiento
		composer.current = new EffectComposer(renderer);
		composer.current.addPass(new RenderPass(scene, camera));

		const afterimagePass = new AfterimagePass();
		composer.current.addPass(afterimagePass);

		// Desmonto el componente
		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("touchstart", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchend", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleMouseMove);
			window.removeEventListener("mousemove", handleRaycast);
			window.removeEventListener("touchmove", handleRaycast);
		};
	}, []);

	// Generación de gradiente
	const generateGradientCanvas = () => {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const gradient = context.createLinearGradient(
			0,
			0,
			canvas.width,
			canvas.height
		);

		gradient.addColorStop(0, "#FF0000");
		gradient.addColorStop(1, "#00FFFF");

		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		return canvas;
	};

	// Creo la textura con gradiente
	const createGradientTexture = (color1, color2) => {
		const canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		const context = canvas.getContext("2d");

		// Creo el gradiente
		const gradient = context.createLinearGradient(0, 0, 256, 0);
		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);

		context.fillStyle = gradient;
		context.fillRect(0, 0, 256, 256);

		const texture = new THREE.CanvasTexture(canvas);

		// Configuración de repetición del gradiente para que se muestre en la pantalla completa
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;

		return texture;
	};

	// Renderizado de MainContent
	return <div className="background-container" ref={containerRef}></div>;
};

export default MainContent;
