export interface IMenuOption {
  category: string;
  options: string[];
}

export const menuOptions: IMenuOption[] = [
  {
    category: 'languages',
    options: ['javascript', 'reactjs', 'csharp', 'node', 'bash', 'nginx'],
  },
  {
    category: 'browsers',
    options: ['chrome', 'firefox', 'browsers'],
  },
  {
    category: 'platforms',
    options: ['dotnet', 'docker', 'shell', 'AZURE'],
  },
  {
    category: 'misc',
    options: ['webdev'],
  },
];
