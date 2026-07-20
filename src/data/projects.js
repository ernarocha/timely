export const projects = [
  { name: 'Website Redesign', color: '#bdf44a', text: '#243400' },
  { name: 'Mobile App', color: '#c9c3f3', text: '#38335c' },
  { name: 'Client Portal', color: '#ffd9c5', text: '#673c28' },
  { name: 'Internal', color: '#bce9ed', text: '#17474c' },
]

export const projectStyle = (name) =>
  projects.find((project) => project.name === name) || projects[3]
