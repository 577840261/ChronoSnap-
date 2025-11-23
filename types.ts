export interface Era {
  id: string;
  title: string;
  description: string;
  promptModifier: string;
  icon: string;
  color: string;
}

export enum AppMode {
  TIME_TRAVEL = 'TIME_TRAVEL',
  MAGIC_EDITOR = 'MAGIC_EDITOR',
  IMAGE_ANALYST = 'IMAGE_ANALYST'
}

export enum AppState {
  MENU = 'MENU',
  CAPTURE = 'CAPTURE',
  SELECT_ERA = 'SELECT_ERA',
  INPUT_PROMPT = 'INPUT_PROMPT',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface ProcessingState {
  status: 'uploading' | 'generating' | 'downloading';
  message: string;
}

declare global {
  interface Window {
    gifshot: any;
  }
}