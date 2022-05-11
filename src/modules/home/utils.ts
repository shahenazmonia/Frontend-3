import { Payment } from "./types";

/**
 *
 * @param data array of payment data
 * @returns data grouped by projectId
 */
export const getDataByGroup = (data: Payment[]) => {
  return data.reduce((group, data) => {
    const { projectId } = data;
    //@ts-ignore
    group[projectId] = group[projectId] ?? [];
    //@ts-ignore
    group[projectId].push(data);
    return group;
  }, {});
};

/**
 *
 * @param value the number that should be rounded
 * @param round the number of round digits
 * @returns the rounded number for 4 digits after comma
 */
export const getRoundUp = (value: number, round: number) => {
  return value.toFixed(round);
};
