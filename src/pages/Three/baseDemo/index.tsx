import * as React from "react";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export interface BaseDemoProps {}

const BaseDemo: React.FC<BaseDemoProps> = () => {
  const renderBoxRef: React.MutableRefObject<HTMLDivElement> = useRef();

  useEffect(() => {
    if (renderBoxRef.current) {
      // 创建场景
      const scence = new THREE.Scene();

      // 创建相机
      /**
       * 视觉 角度
       *
       * 视觉的 长宽比
       *
       * 近截面
       *
       * 远截面
       */
      const camera = new THREE.PerspectiveCamera(
        75,
        renderBoxRef.current.clientWidth / renderBoxRef.current.clientHeight,
        0.1,
        1000
      );

      // 渲染器
      const renderer = new THREE.WebGLRenderer();

      // 设置 渲染器 的大小
      renderer.setSize(
        renderBoxRef.current.clientWidth,
        renderBoxRef.current.clientHeight
      );

      // 将 渲染器 插入到元素中
      renderBoxRef.current.appendChild(renderer.domElement);

      // !!! 后续加的几何体是放到 渲染器 被加到页面中的

      // 增加一个立方体
      // 创建一个盒子
      const geometry = new THREE.BoxGeometry();

      // 设置材料
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      // 创建 网格
      // 网格包含 一个几何体 集合体的材料
      const cube = new THREE.Mesh(geometry, material);

      // 将 创建的几何体 加入到 场景 中
      scence.add(cube); // 物体默认是被添加到 (0,0,0) 位置

      // 设置下 camera的位置
      camera.position.z = 5;

      // 创建动画
      const animate = () => {
        requestAnimationFrame(animate);

        // 网格 的旋转位置 每次递增加 0.01
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // 这里是真正的渲染
        renderer.render(scence, camera);
      };

      animate();
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

export default BaseDemo;
