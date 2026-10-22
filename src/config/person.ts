// The same code ships to two sites; VITE_PERSON (.env / .env.przemek) picks whose details they show.
const people = {
  norbert: {
    name: 'Norbert Leksa',
    nameGenitivePl: 'Norberta Leksy',
    firstNameGenitiveUpperPl: 'NORBERTA',
    firstNameUpper: 'NORBERT',
    initials: ['N', 'L'],
    emailUser: 'norbertleksa',
  },
  przemek: {
    name: 'Przemysław Leksa',
    nameGenitivePl: 'Przemysława Leksy',
    firstNameGenitiveUpperPl: 'PRZEMYSŁAWA',
    firstNameUpper: 'PRZEMYSŁAW',
    initials: ['P', 'L'],
    emailUser: 'przemyslawleksa',
  },
}

const key = (import.meta.env.VITE_PERSON ?? 'norbert') as keyof typeof people

export const person = {
  ...people[key],
  emailDomain: 'gmail.com',
  email: `${people[key].emailUser}@gmail.com`,
}
