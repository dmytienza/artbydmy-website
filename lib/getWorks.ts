import worksData from "@/data/works-extended.json";

export enum WorkCategory {
  ORIGINALS = "ORIGINALS",
  PRINTS = "PRINTS",
  STUDY = "STUDY",
  OTHERS = "OTHERS",
}

export interface Work {
  id: number;
  title: string;
  medium: string;
  category: WorkCategory;
  image: string;
  year: number;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getWorks(): Work[] {
  const base = shuffle(worksData as Work[]);
  const columns: Work[][] = [[], [], [], []];
  const firstOrientationByColumn = shuffle(["landscape", "portrait", "landscape", "portrait"] as const);

  const pickImage = (orientation: "landscape" | "portrait") =>
    orientation === "landscape"
      ? "/placeholder-landscape-" + (Math.random() > 0.5 ? "a" : "b") + ".svg"
      : "/placeholder-portrait-" + (Math.random() > 0.5 ? "a" : "b") + ".svg";

  base.forEach((work, index) => {
    const columnIndex = index % 4;
    const columnItems = columns[columnIndex];
    const firstOrientation = firstOrientationByColumn[columnIndex];
    const orientation: "landscape" | "portrait" = columnItems.length === 0
      ? firstOrientation
      : columnItems[columnItems.length - 1].image.includes("landscape")
        ? "portrait"
        : "landscape";

    columns[columnIndex].push({
      ...work,
      image: pickImage(orientation),
    });
  });

  return columns.flat();
}
