import * as React from "react";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export interface FontProps {}

const Font: React.FC<FontProps> = () => {
  const renderBoxRef: React.MutableRefObject<HTMLDivElement> = useRef();
  useEffect(() => {
    if (renderBoxRef.current) {
      const Ref = renderBoxRef.current;
      THREE.Cache.enabled = true; // 是否启用缓存，默认为false.

      let container, stats, permalink, hex;

      let camera, cameraTarget, scene, renderer;

      let group, textMesh1, textMesh2, textGeo, materials;

      let firstLetter = true;

      let text = "demo",
        bevelEndabled = true,
        font = undefined,
        fontName = "optimer",
        fontWeight = "bold";
      const height = 20,
        size = 70,
        hover = 30,
        curveSegments = 4,
        bevelThickness = 2,
        bevelSize = 1.5;

      const mirror = true;
      const fontMap = {
        helvetiker: 0,
        optimer: 1,
        gentilis: 2,
        droid_droid_sans: 3,
        droid_droid_serif: 4,
      };

      const weightMap = {
        regular: 0,
        bold: 1,
      };

      const reverseFontMap = [];
      const reverseWeightMap = [];

      for (const i in fontMap) reverseFontMap[fontMap[i]] = i;
      for (const i in weightMap) reverseWeightMap[weightMap[i]] = i;

      let targetRotation = 0;
      let targetRotationOnPointerDown = 0;

      let pointerX = 0;
      let pointerXOnPointerDown = 0;

      let windowHalfX = Ref.clientWidth / 2;

      let fontIndex = 1;

      // 提供 16 进制的 string
      function decimalToHex(d) {
        let hex = Number(d).toString(16);
        hex = "000000".substr(0, 6 - hex.length) + hex;

        return hex.toUpperCase();
      }

      function init() {
        container = document.createElement("div");
        Ref.appendChild(container);

        permalink = document.querySelector("#permalink");

        // 新建 相机
        camera = new THREE.PerspectiveCamera(
          30,
          Ref.clientWidth / Ref.clientHeight,
          1,
          1500
        );
        camera.position.set(0, 400, 700);

        //  新建一个 三维向量
        cameraTarget = new THREE.Vector3(0, 150, 0);

        // 新建 场景
        /* 
            Fog( color : Integer, near : Float, far : Float )
            color : Color   雾的颜色
            near  : Float   开始应用雾的最小距离
            far   : Float   结束计算、应用雾的最大距离，距离大于活动摄像机“far”个单位的物体将不会被雾所影响。
        */
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.Fog(0x000000, 250, 1400); //  定义 线性雾

        // 设置 灯光
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(0, 0, 1).normalize();
        scene.add(dirLight); // 将 灯光加入到场景中

        const hash = document.location.hash.substr(1);

        if (hash.length !== 0) {
          const colorhash = hash.substring(0, 6);
          const fonthash = hash.substring(6, 7);
          const weighthash = hash.substring(7, 8);
          const bevelhash = hash.substring(8, 9);
          const texthash = hash.substring(10);
        }
      }
    }
  }, []);

  return (
    <div
      id="renderBox"
      ref={renderBoxRef}
      style={{ width: 600, height: 600, margin: "0 auto" }}
    ></div>
  );
};

export default Font;
