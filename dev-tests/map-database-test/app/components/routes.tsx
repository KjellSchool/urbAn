export function Routes({ routes, setSelectedRoute }) {
  return (
    <div className="sidebar__container">
      <ul>
        {routes.map((route) => (
          <li
            key={route.id}
            className="project__item"
            onClick={() => setSelectedRoute(route)}
            style={{ cursor: "pointer" }}
          >
            {route.title}
            <br />
            {route.description}
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}