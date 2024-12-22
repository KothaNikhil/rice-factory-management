export const CATEGORIES = [
  { id: 1, name: 'Raw Materials' },
  { id: 2, name: 'Processed Products' },
  { id: 3, name: 'By-Products' },
  { id: 4, name: 'Packaging Materials' },
  { id: 5, name: 'Machinery and Spare Parts' },
];

export const PREDEFINED_ITEMS = [
  {
    categoryId: 1,
    categoryName: 'Raw Materials',
    items: [
      { id: 1, name: 'Paddy', quantity: 0, unit: 'kg' }
    ],
  },
  {
    categoryId: 2,
    categoryName: 'Processed Products',
    items: [
      { id: 2, name: 'Rice', quantity: 0, unit: 'kg' },
    ],
  },
  {
    categoryId: 3,
    categoryName: 'By-Products',
    items: [
      { id: 3, name: 'Rice Bran', quantity: 0, unit: 'kg' },
      { id: 4, name: 'Husks', quantity: 0, unit: 'kg' },
    ],
  },
  {
    categoryId: 4,
    categoryName: 'Packaging Materials',
    items: [
      { id: 5, name: 'Gunny Bags (25 kg)', quantity: 0, unit: 'pieces' },
      { id: 6, name: 'Gunny Bags (50 kg)', quantity: 0, unit: 'pieces' },
    ],
  },
];
