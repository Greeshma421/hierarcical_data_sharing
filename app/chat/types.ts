export interface Message {
  role: 'user' | 'assistant';
  content: string;
  tabular_data?: any[];
}