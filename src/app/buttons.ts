export const buttons: Button[] = [
  {
    label: '+',
    function: 'operation',
    operation: (a: string, b: string) => {
      return parseFloat(a) + parseFloat(b);
    },
  },
  {
    label: '-',
    function: 'operation',
    operation: (a: string, b: string) => {
      return parseFloat(a) - parseFloat(b);
    },
  },

  {
    label: '*',
    function: 'operation',
    operation: (a, b) => {
      return parseFloat(a) * parseFloat(b);
    },
  },
  {
    label: '/',
    function: 'operation',
    operation: (a: string, b: string) => {
      return parseFloat(a) / parseFloat(b);
    },
  },
  {
    label: '9',
    function: 'number',
  },
  {
    label: '8',
    function: 'number',
  },
  {
    label: '7',
    function: 'number',
  },
  {
    label: 'C',
    function: 'clear',
  },

  {
    label: '6',
    function: 'number',
  },

  {
    label: '5',
    function: 'number',
  },

  {
    label: '4',
    function: 'number',
  },

  {
    label: '=',
    function: 'equal',
  },
  {
    label: '3',
    function: 'number',
  },

  {
    label: '2',
    function: 'number',
  },

  {
    label: '1',
    function: 'number',
  },

  {
    label: '0',
    function: 'number',
  },

  { label: '.', function: 'decimal' },
  { label: 'Delete', function: 'delete' },
];

export type Button = {
  label: string;
  function: 'number' | 'operation' | 'clear' | 'equal' | 'decimal' | 'delete';
  operation?: (a: string, b: string) => number;
};
