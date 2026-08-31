import { TimeObject, School } from '../types/types';

let schoolsPromise: Promise<TimeObject> | null = null;

function loadSchools(): Promise<TimeObject> {
	if (!schoolsPromise) {
		schoolsPromise = fetch(`${import.meta.env.BASE_URL}time.json`).then((res) => res.json());
	}
	return schoolsPromise;
}

/** GET /api/schools */
export async function getSchools(): Promise<{ id: string; name: string }[]> {
	const schools = await loadSchools();
	return Object.keys(schools).map((id) => ({ id, name: schools[id].name }));
}

/** GET /api/time/:schoolName */
export async function getTime(schoolName: string): Promise<School | undefined> {
	const schools = await loadSchools();
	return schools[schoolName];
}
