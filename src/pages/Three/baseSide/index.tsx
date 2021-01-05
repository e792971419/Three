import * as React from "react";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";
export interface BaseSideProps {}

const BaseSide: React.FC<BaseSideProps> = () => {
  const renderBoxRef: React.MutableRefObject<HTMLDivElement> = useRef();
  useEffect(() => {
    if (renderBoxRef.current) {
      const Ref = renderBoxRef.current;
      //   console.log(renderBoxRef);
      let camera, scene, renderer;
      let scene2, renderer2;

      const frustumSize = 700;

      init();

      animate();

      // 启动器
      function init() {
        const aspect = Ref.clientWidth / Ref.clientHeight;

        /*
              left     — 摄像机视锥体左侧面。
              right    — 摄像机视锥体右侧面。
              top      — 摄像机视锥体上侧面。
              bottom   — 摄像机视锥体下侧面。
              near     — 摄像机视锥体近端面。
              far      — 摄像机视锥体远端面。
          */
        // 正交摄像机
        camera = new THREE.OrthographicCamera(
          (frustumSize * aspect) / -3,
          (frustumSize * aspect) / 3,
          (frustumSize * aspect) / 3,
          (frustumSize * aspect) / -3,
          1,
          1000
        );

        camera.position.set(-200, 200, 200);

        scene = new THREE.Scene();
        //设置场景的background
        scene.background = new THREE.Color(0xf0f0f0);

        scene2 = new THREE.Scene();

        const material = new THREE.MeshBasicMaterial({
          color: 0x00000,
          wireframe: true, // 将几何体渲染为线框
          wireframeLinewidth: 1, // 控制线框宽度
          side: THREE.DoubleSide, // 暂时为找到，语义为双边
        });

        /*
              Euler
                  x - (optional) 用弧度表示x轴旋转量。 默认值是 0。
                  y - (optional) 用弧度表示y轴旋转量。 默认值是 0。
                  z - (optional) 用弧度表示z轴旋转量。 默认值是 0。
          */

        // left
        createPlane(
          100,
          100,
          "chocolate",
          new THREE.Vector3(-50, 0, 0),
          new THREE.Euler(0, -90 * THREE.MathUtils.DEG2RAD, 0)
        );
        // right
        createPlane(
          100,
          100,
          "saddlebrown",
          new THREE.Vector3(0, 0, 50),
          new THREE.Euler(0, 0, 0)
        );
        // top
        createPlane(
          100,
          100,
          "yellowgreen",
          new THREE.Vector3(0, 50, 0),
          new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0)
        );
        // bottom
        createPlane(
          300,
          300,
          "seagreen",
          new THREE.Vector3(0, -50, 0),
          new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0)
        );

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
        renderer.setSize(Ref.clientWidth, Ref.clientHeight);
        Ref.appendChild(renderer.domElement);

        // 创建一个 3D 的渲染器
        renderer2 = new CSS3DRenderer();
        renderer2.setSize(Ref.clientWidth, Ref.clientHeight);
        renderer2.domElement.style.position = "absolute";
        renderer2.domElement.style.top = 0;
        Ref.appendChild(renderer2.domElement);

        // 创建一个 轨道控制器
        /*
              object: （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。

              domElement: 用于事件监听的HTML元素。
          */
        const controls = new OrbitControls(camera, renderer2.domElement);

        // 控制器的缩放
        controls.minZoom = 0.5;
        controls.maxZoom = 2;

        window.addEventListener("resize", onWindowResize, false);

        // 创建面 并加入到 scene2 中
        function createPlane(width, height, cssColor, pos, rot) {
          const element = document.createElement("div");
          element.style.width = width + "px";
          element.style.height = height + "px";
          element.style.opacity = "0.75";
          element.style.background = cssColor;

          // 创建 3D 对象
          const object = new CSS3DObject(element);
          object.position.copy(pos);
          object.rotation.copy(rot);
          // 场景2 加入 当前面
          scene2.add(object);

          // 平面缓冲几何体 这是PlaneGeometry中的BufferGeometry接口
          /* 
            width           — 平面沿着X轴的宽度。默认值是1。
            height          — 平面沿着Y轴的高度。默认值是1。
            widthSegments   — （可选）平面的宽度分段数，默认值是1。
            heightSegments  — （可选）平面的高度分段数，默认值是1。
          */
          //   const geometry = new THREE.PlaneBufferGeometry(width, height);
          //   const mesh = new THREE.Mesh(geometry, material);
          //   mesh.position.copy(pos);
          //   mesh.rotation.copy(rot);

          //   // 将网格加入到 scene 中
          //   scene.add(mesh);
        }
      }

      // 监控 图像尺寸的变化 并改变相机位置 渲染器的size
      function onWindowResize() {
        const aspect = Ref.clientWidth / Ref.clientHeight;

        // 设置 摄像机视锥体 四个面
        camera.left = (frustumSize * aspect) / 3;
        camera.right = (frustumSize * aspect) / 3;
        camera.top = frustumSize / 3;
        camera.bottom = frustumSize / 3;

        camera.updateProjectionMatrix(); // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。

        renderer.setSize(Ref.clientWidth, Ref.clientHeight);

        renderer2.setSize(Ref.clientWidth, Ref.clientHeight);
      }

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        renderer2.render(scene2, camera);
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

export default BaseSide;
