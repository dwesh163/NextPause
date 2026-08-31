import time from '../assets/time.json';
import { TimeObject, School } from '../types/types';

const schools = time as TimeObject;

/** GET /api/schools */
export function getSchools(): { id: string; name: string }[] {
	return Object.keys(schools).map((id) => ({ id, name: schools[id].name }));
}

/** GET /api/time/:schoolName */
export function getTime(schoolName: string): School | undefined {
	return schools[schoolName];
}
