import * as React from "react";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export interface DrawingLineProps {}

const DrawingLine: React.FC<DrawingLineProps> = () => {
  const renderBoxRef: React.MutableRefObject<HTMLDivElement> = useRef();

  useEffect(() => {
    if (renderBoxRef.current) {
      const Ref = renderBoxRef.current;
      const scence = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        Ref.clientWidth / Ref.clientHeight,
        1,
        500
      );

      // 设置 相机 的位置
      camera.position.set(0, 0, 100);
      // 设置 相机 从什么位置看
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(Ref.clientWidth, Ref.clientHeight);

      Ref.appendChild(renderer.domElement);

      /* 
        线条只能使用 LineBasicMatetial LineDashedMaterial
      */

      // 定义 材料
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

      // 设置一个 带顶点的 geometry 几何体

      const point = [];
      point.push(new THREE.Vector3(-10, 0, 0));
      point.push(new THREE.Vector3(0, 10, 0));
      point.push(new THREE.Vector3(10, 0, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(point);

      // 将 点 组合起来，连成一条线
      const line = new THREE.Line(geometry, material);

      scence.add(line);

      renderer.render(scence, camera);
    }
  }, []);

  return (
    <div
      id="renderBox"
      ref={renderBoxRef}
      style={{ width: 900, height: 600, margin: "0 auto" }}
    ></div>
  );
};

export default DrawingLine;
