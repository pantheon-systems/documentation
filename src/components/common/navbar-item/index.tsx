import React from "react";
import Link from "next/link";
import "./style.css";

// REVIEW: types might be incorrect @aniketbiprojit
export const NavbarItem = ({
  item,
  activePage,
}: {
  item: any;
  activePage: string;
}) => {
  let children;
  if (item.items) {
    children = (
      <li key={`${item.id}-li-child`} id={`${item.id}-li-child`}>
        <ul id="manual-guide-toc-child" className="manual-guide-toc child">
          {item.items.map((item: any) => {
            return (
              <li key={`${item.id}-li-key`} id={`${item.id}-li`}>
                <Link
                  href={item.link}
                  className={activePage === item.link ? "active-trail" : ""}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  return (
    <>
      <li
        key={`${item.id}-li-key`}
        id={`${item.id}-li`}
        className="toc__menu-item"
      >
        <Link
          href={item.link}
          className={activePage === item.link ? "active-trail" : ""}
        >
          {item.title}
        </Link>
      </li>
      {children}
    </>
  );
};
