import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;

  ngOnInit() {
    // camera
    this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 30;

    // object
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);

    // scene
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);

    // renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }
}
