export interface ResearchSource {
    key: string;
    authors: string;
    title: string;
    journal: string;
    year: number;
    citation: string;
    url: string;
}

export const RESEARCH_SOURCES = {
    givens2021: {
        key: 'givens',
        authors: 'Givens VB, Perkins SW',
        title: 'Preoperative Imaging and Online Photo Galleries: The #Key to Surgical Commitment',
        journal: 'The Surgery Journal',
        year: 2021,
        citation: '2021;7:e322–e326',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34926815/',
    },
    lekakis2020: {
        key: 'lekakis',
        authors: 'Lekakis G, Sykes J, Hens G, Hellings PW',
        title: 'Morphing as a Selection Tool in the Rhinoplasty Consult: A Cross-Sectional Study',
        journal: 'Facial Plastic Surgery',
        year: 2020,
        citation: '2020;36:112–119',
        url: 'https://doi.org/10.1055/s-0040-1701480',
    },
    yamamichi2025: {
        key: 'yamamichi',
        authors: 'Yamamichi K, Nakanishi Y, Chen CY',
        title: 'Three-Dimensional Simulation Accuracy and Patient Satisfaction With Rhinoplasty',
        journal: 'Aesthetic Surgery Journal Open Forum',
        year: 2025,
        citation: '2025;ojaf110',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41048375/',
    },
    punthakee2009: {
        key: 'punthakee',
        authors: 'Punthakee X, Rival R, Solomon P',
        title: 'Digital Imaging in Rhinoplasty',
        journal: 'Aesthetic Plastic Surgery',
        year: 2009,
        citation: '2009;33:635–638',
        url: 'https://doi.org/10.1007/s00266-009-9350-z',
    },
    agarwal2007: {
        key: 'agarwal',
        authors: 'Agarwal A, Gracely E, Silver WE',
        title: 'Realistic Expectations: To Morph or Not to Morph?',
        journal: 'Plastic and Reconstructive Surgery',
        year: 2007,
        citation: '2007;119:1343–1351',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17496610/',
    },
} as const satisfies Record<string, ResearchSource>;

export type ResearchSourceId = keyof typeof RESEARCH_SOURCES;

export const HOMEPAGE_EVIDENCE: readonly ResearchSourceId[] = ['givens2021', 'lekakis2020', 'yamamichi2025'];

export const RHINOPLASTY_EVIDENCE: readonly ResearchSourceId[] = [
    'punthakee2009',
    'agarwal2007',
    'lekakis2020',
    'yamamichi2025',
];
