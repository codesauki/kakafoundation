/**
 * Impact Stories Data - 2025 Kawa Namu Ne Foundation Impact Reports
 * Features three core impact areas with curated gallery images
 */

export interface ImpactStory {
  id: number;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  stats: Array<{ number: string | number; label: string }>;
  image: string;
  color: 'teal' | 'gold';
  badge: string;
}

export const impactStories: ImpactStory[] = [
  {
    id: 1,
    title: 'Economic Empowerment & Livelihoods',
    category: 'Livelihoods',
    summary:
      'Sustainable communities are built on economic dignity. In 2025, the Kowa Namu Ne Foundation delivered one of the most comprehensive grassroots economic empowerment drives Kaduna North has ever seen — touching over 4,000 small businesses, entrepreneurs, and households.',
    highlights: [
      'Over 1,300 beneficiaries in first empowerment drive with cash grants and tools',
      'Empowerment 2.0 reached 1,300+ additional beneficiaries for livelihoods expansion',
      '1,000+ residents in Kabala & Unguwan Shekara communities empowered',
      '300+ vocational trainees graduated with market-ready skills',
      '150+ solar fans & equipment distributed to micro-enterprises',
      '50 Team Kaka members received startup capital',
    ],
    stats: [
      { number: '4,000+', label: 'Businesses Supported' },
      { number: '2,600+', label: 'Direct Empowerment' },
      { number: '300+', label: 'Skills Graduates' },
      { number: '20M+', label: 'Naira Donated' },
    ],
    image: '/images/gallery/img-024.png',
    color: 'gold',
    badge: 'Economic',
  },
  {
    id: 2,
    title: 'Health & Social Welfare',
    category: 'Healthcare',
    summary:
      'Access to healthcare is a right, not a privilege. In 2025, the Kowa Namu Ne Foundation made quality healthcare accessible to hundreds across Kaduna North who would otherwise go without treatment. Through free medical outreaches, eye screenings, and health insurance sponsorships.',
    highlights: [
      '800+ beneficiaries received comprehensive medical care across multiple outreaches',
      '300 free eyeglasses distributed to vision-impaired residents',
      '100+ residents enrolled into one-year state health insurance (KADCHMA)',
      '60+ patient hospital bills settled at primary health centres',
      '500+ vulnerable households received food support',
      'Specialized eye screening clinics brought vision care to remote communities',
    ],
    stats: [
      { number: '800+', label: 'Medical Beneficiaries' },
      { number: '300', label: 'Eyeglasses' },
      { number: '100+', label: 'Insured' },
      { number: '500+', label: 'Families Fed' },
    ],
    image: '/images/gallery/img-040.png',
    color: 'teal',
    badge: 'Healthcare',
  },
  {
    id: 3,
    title: 'Education, Youth & Community',
    category: 'Development',
    summary:
      'A community\'s greatest investment is in its people — especially children and youth. In 2025, the Foundation made bold, lasting investments in education, youth leadership, and community infrastructure across Kaduna North. From commissioning a full school to installing solar street lights.',
    highlights: [
      'Kowa Namu Ne Foundation School commissioned for orphans & underprivileged children',
      '300+ trainees graduated from vocational skills programs',
      '10,000+ school materials distributed (books, bags, uniforms)',
      '200 out-of-school children returned to active learning',
      'Solar street lights installed across 40+ community locations',
      'Youth engagement forums and startup capital for young entrepreneurs',
    ],
    stats: [
      { number: '1', label: 'Foundation School' },
      { number: '300+', label: 'Skills Graduates' },
      { number: '10,000+', label: 'Materials' },
      { number: '40+', label: 'Solar Lights' },
    ],
    image: '/images/gallery/img-055.png',
    color: 'gold',
    badge: 'Education',
  },
];

export const featuredStories = impactStories.slice(0, 3);
