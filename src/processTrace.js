export function extractCANData(log) {
  const lines = log.split("\n");
  const canData = {};
  const regex = /^(\d{2}:\d{2}:\d{2}:\d{3})\s+(Rx|Tx)\s+\S+\s+([\w]{1,8})\s+\[\d\]\s*(([\w]{2}\s*){0,8})$/;

  lines.forEach(line => {
    const match = line.match(regex);

    if (match) {
      const timeValue = match[1];
      const canId = match[3];
      const dataValue = match[4].trim().split(/\s+/).join(" ");

      if (!canData[canId]) {
        canData[canId] = {
          timeValues: [],
          dataValues: []
        };
      }
      canData[canId].timeValues.push(timeValue);
      canData[canId].dataValues.push(dataValue);
    }
  });

  return canData;
}
