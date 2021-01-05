/*
 * @Author: your name
 * @LastEditors: xiasong
 * @Date: 2021-01-05 13:51:15
 * @LastEditTime: 2021-01-05 17:15:52
 * @Description: description
 * @FilePath: \myreact\src\pages\Three\collection.tsx
 */

import * as React from "react";
import loadable from "@loadable/component";
import { Switch, Route, Link } from "react-router-dom";

const routesList = [
  {
    name: "demo",
    path: "/three/demo",
    component: () => {
      const BaseDemo = loadable(() => import("./baseDemo"));
      return <BaseDemo />;
    },
  },
  {
    name: "line",
    path: "/three/line",
    component: () => {
      const Line = loadable(() => import("./drawingLine"));
      return <Line />;
    },
  },
  {
    name: "baseSide",
    path: "/three/baseSide",
    component: () => {
      const Font = loadable(() => import("./baseSide"));
      return <Font />;
    },
  },
];

export interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        display: "flex",
        flexShrink: "unset",
        marginTop: 20,
      }}
    >
      <ol
        style={{
          width: 120,
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        type="1"
      >
        {Array.from(routesList, (item) => {
          return (
            <li key={item.name} style={{ width: "100%", textAlign: "center" }}>
              <Link to={item.path}>{item.name} </Link>
            </li>
          );
        })}
      </ol>

      <div style={{ flex: 1 }}>
        <Switch>
          {Array.from(routesList, (item) => {
            return (
              <Route exact={true} path={item.path} key={item.path}>
                {item.component}
              </Route>
            );
          })}
        </Switch>
      </div>
    </div>
  );
};

export default Routes;
