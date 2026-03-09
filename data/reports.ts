/**
 * 2025 Kawa Namu Ne Foundation - Full Report Data
 * Used for homepage overview and report sections
 */

export interface YearReport {
  year: number;
  title: string;
  tagline: string;
  motto: string;
  location: string;
  leaderQuote: string;
  leaderName: string;
  overviewTitle: string;
  overviewContent: string;
  philosophyTitle: string;
  philosophyDescription: string;
  philosophyPillars: string[];
  foundationAreas: string[];
}

export const report2025: YearReport = {
  year: 2025,
  title: 'KAWA 2025 – A Year of Impact',
  tagline: 'Leadership • Service • Empowerment • Community',
  motto: 'Kowa Namu Ne...',
  location: 'January – December 2025 | Kaduna State',
  leaderQuote:
    'My duty is to bridge the gap between government and the people, turning hope into tangible reality for every constituent in Kaduna North.',
  leaderName: 'Hon. Abdulazeez A. Kaka',
  overviewTitle: 'A Year Marked by Action, Inclusion, and Purpose',
  overviewContent: `2025 was a defining year in the journey of Hon. Abdulazeez Abubakar Kaka — a year marked by action, inclusion, and purposeful leadership. Across Kaduna North and beyond, Hon. Kaka consistently demonstrated that leadership is not defined by position, but by service to the people.

From grassroots political engagements to large-scale empowerment programs, education support, healthcare interventions, women and youth inclusion, and strategic infrastructure projects, the year reflected a clear commitment to sustainable development and human capital growth.

"Kaka in 2025" documents these efforts, not merely as a record of activities, but as evidence of a people-first philosophy built on trust, accessibility, and long-term vision. The initiatives captured in this publication cut across political, social, economic, and humanitarian sectors, reinforcing the belief that progress is achieved when leadership listens, acts, and remains accountable to the people.

Together, we will continue to build a Kaduna, and a Nigeria that works for all.`,
  philosophyTitle: 'The Kowa Namu Ne Philosophy',
  philosophyDescription:
    'Kowa Namu Ne is more than a slogan; it is a philosophy of inclusive leadership. It emphasizes shared ownership of governance, collective responsibility, and equal opportunity for all, regardless of background, gender, or social status. Under this philosophy, leadership is participatory, empowerment is deliberate, and development is sustainable.',
  philosophyPillars: [
    'Grassroots inclusion and consultation',
    'Youth and women empowerment',
    'Education and human capital development',
    'Healthcare access and social welfare',
    'Long-term leadership grooming',
  ],
  foundationAreas: [
    'Education for orphans and less privileged children',
    'Skills acquisition and entrepreneurship support',
    'Medical outreach and health interventions',
    'Women and youth development initiatives',
    'Community-based infrastructure projects',
  ],
};

export const yearReports: YearReport[] = [report2025];
