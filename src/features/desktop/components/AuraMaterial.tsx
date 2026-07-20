import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main(){

    vUv = uv;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position,1.0);

}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

float hash(vec2 p){
    return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);
}

float noise(vec2 p){

    vec2 i=floor(p);
    vec2 f=fract(p);

    float a=hash(i);
    float b=hash(i+vec2(1.,0.));
    float c=hash(i+vec2(0.,1.));
    float d=hash(i+vec2(1.));

    vec2 u=f*f*(3.-2.*f);

    return mix(a,b,u.x)+
           (c-a)*u.y*(1.-u.x)+
           (d-b)*u.x*u.y;
}

void main(){

    vec2 uv=vUv;

    uv.x+=sin(uv.y*4.+uTime*.08)*.08;
    uv.y+=sin(uv.x*2.+uTime*.05)*.05;

    float n=noise(uv*6.+uTime*.03);

    vec3 blue=vec3(.30,.55,1.);
    vec3 purple=vec3(.55,.40,1.);
    vec3 cyan=vec3(.30,.90,1.);

    vec3 color=mix(blue,purple,n);
    color=mix(color,cyan,n*.4);

    float alpha=smoothstep(.15,.8,n)*.12;
    alpha*=smoothstep(.9,.2,distance(vUv,vec2(.5)));

    gl_FragColor=vec4(color,alpha);

}
`;

const AuroraMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
  },

  vertexShader,

  fragmentShader,
);

extend({ AuroraMaterial });

export function Aurora() {
  const ref = useRef<any>();

  useFrame(({ clock, size }) => {
    ref.current.uTime = clock.elapsedTime;
    ref.current.uResolution.set(size.width, size.height);
  });

  return (
    <mesh scale={[8, 8, 1]}>
      <planeGeometry args={[2, 2]} />

      {/* @ts-ignore */}

      <auroraMaterial ref={ref} transparent />
    </mesh>
  );
}
