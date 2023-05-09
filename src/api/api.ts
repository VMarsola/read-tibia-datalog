const url = "./Server_Log.txt";

const creatureRegExp =
  /You (?:lose|gain) \d+ hitpoint(?:s)?(?: due to an attack by a (\w+))?/;
const experienceRegExp = /You gained (\d+) experience points\./;
const lootRegExp = /Loot of a .*?: (.*)/;
let hitpointsHealed = 0;
let totalDamageTaken = 0;
let byCreatureKind: { [key: string]: number } = {};
let experienceGained = 0;
let loot: { [key: string]: number } = {};

export const fetchServerLog = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch log file");
    }
    const data = await response.text();
    const lines = data.trim().split("\n");
    lines.forEach((line) => {
      const creatureMatch = creatureRegExp.exec(line);
      const itemsMatch = lootRegExp.exec(line);
      const experienceMatch = experienceRegExp.exec(line);

      if (itemsMatch) {
        const items = itemsMatch[1].split(", ");
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const quantity = parseInt(item);
          let name = isNaN(quantity)
            ? item.replace(".", "").replace(/s$/, "")
            : item
                .replace(quantity.toString(), "")
                .replace(".", "")
                .replace(/s$/, "")
                .trim();
          if (name === "nothing") {
            continue;
          }
          if (name[0] === "a") {
            name = name.slice(1).trim();
          }
          if (loot[name]) {
            loot[name] += quantity || 1;
          } else {
            loot[name] = quantity || 1;
          }
        }
      }

      if (line.includes("healed")) {
        hitpointsHealed += parseInt(line.match(/\d+/)[0]);
      }

      if (creatureMatch) {
        const creatureKind = creatureMatch[1] || "unknown";
        const damageTaken = parseInt(line.match(/\d+/)[0]);
        totalDamageTaken += damageTaken;
        byCreatureKind[creatureKind] =
          (byCreatureKind[creatureKind] || 0) + damageTaken;
      }

      if (experienceMatch) {
        experienceGained += parseInt(experienceMatch[1]);
      }
    });
    const result = {
      hitpointsHealed,
      damageTaken: {
        total: totalDamageTaken,
        byCreatureKind,
      },
      experienceGained,
      loot,
    };

    return result;
  } catch (error) {
    console.error(error);
  }
};
