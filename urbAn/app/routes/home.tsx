import { useState, useEffect } from "react";
import { getProfiles } from "../database/profiles.js";
import { getArchetypes } from "../database/archetypes.js"

import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [archetypes, setArchetypes] = useState([]);

  const loadProfiles = async () => {
    const { data, error } = await getProfiles();

    if (error) {
      console.error("Failed to load profiles:", error);
      return;
    }

    setProfiles(data);
    console.log(data);
  };
  
  const loadArchetypes = async () => {
    const { data, error } = await getArchetypes();

    if (error) {
      console.error("Failed to load archetypes:", error);
      return;
    }

    setArchetypes(data);
    console.log(data);
  };

  useEffect(() => {
    loadProfiles();
    loadArchetypes();
  }, []);

  return <Welcome />;
}
